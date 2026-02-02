import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { OrderStatus } from './entities/order.entity';

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) { }

    async create(createOrderInput: CreateOrderInput) {
        const { items, ...orderData } = createOrderInput;

        // Generate a simple order number
        const orderNumber = `ORD-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;

        // Process items to fetch additional details (images, dimensions) from DB
        const processedItems = await Promise.all(items.map(async (item) => {
            const product = await this.prisma.product.findUnique({
                where: { id: item.productId },
                include: {
                    colors: true,
                    sizes: true,
                    accessories: true
                }
            });

            if (!product) {
                throw new Error(`Product not found: ${item.productId}`);
            }

            // Find selected color image
            let colorImage = null;
            if (item.colorName) {
                const color = product.colors.find(c => c.name === item.colorName);
                if (color) colorImage = color.image;
            }

            // Find selected size dimensions
            let sizeDimensions = null;
            if (item.sizeName) {
                const size = product.sizes.find(s => s.name === item.sizeName);
                if (size) sizeDimensions = size.dimensions;
            }

            // Process accessories
            const processedAccessories = item.accessories ? item.accessories.map(acc => {
                const accessory = product.accessories.find(a => a.name === acc.name);
                return {
                    name: acc.name,
                    price: acc.price,
                    image: accessory ? accessory.image : null
                };
            }) : undefined;

            return {
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
                colorName: item.colorName,
                colorImage: colorImage,
                sizeName: item.sizeName,
                sizeDimensions: sizeDimensions,
                accessories: processedAccessories ? {
                    create: processedAccessories
                } : undefined
            };
        }));

        return this.prisma.order.create({
            data: {
                ...orderData,
                orderNumber,
                status: OrderStatus.PENDING,
                items: {
                    create: processedItems
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                        accessories: true,
                    },
                },
            },
        });
    }

    async findAll(status?: OrderStatus, search?: string, skip?: number, take?: number) {
        const where: any = {};
        if (status) {
            where.status = status;
        }
        if (search) {
            where.OR = [
                { orderNumber: { contains: search, mode: 'insensitive' } },
                { customerName: { contains: search, mode: 'insensitive' } },
                { customerPhone: { contains: search, mode: 'insensitive' } },
            ];
        }

        const [items, total] = await Promise.all([
            this.prisma.order.findMany({
                where,
                skip,
                take,
                orderBy: { createdAt: 'desc' },
                include: {
                    items: {
                        include: {
                            product: true,
                            accessories: true,
                        },
                    },
                },
            }),
            this.prisma.order.count({ where }),
        ]);

        return { items, total };
    }

    findOne(id: string) {
        return this.prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                        accessories: true,
                    },
                },
            },
        });
    }

    async updateStatus(updateOrderStatusInput: UpdateOrderStatusInput) {
        return this.prisma.order.update({
            where: { id: updateOrderStatusInput.id },
            data: { status: updateOrderStatusInput.status },
        });
    }

    async remove(id: string) {
        await this.prisma.order.delete({
            where: { id },
        });
        return true;
    }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order, PaginatedOrders } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderStatusInput } from './dto/update-order-status.input';
import { OrderStatus } from './entities/order.entity';

@Resolver(() => Order)
export class OrderResolver {
    constructor(private readonly orderService: OrderService) { }

    @Mutation(() => Order)
    createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
        return this.orderService.create(createOrderInput);
    }

    @Query(() => PaginatedOrders, { name: 'orders' })
    findAll(
        @Args('status', { type: () => OrderStatus, nullable: true }) status?: OrderStatus,
        @Args('search', { type: () => String, nullable: true }) search?: string,
        @Args('skip', { type: () => Int, nullable: true }) skip?: number,
        @Args('take', { type: () => Int, nullable: true }) take?: number,
    ) {
        return this.orderService.findAll(status, search, skip, take);
    }

    @Query(() => Order, { name: 'order' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.orderService.findOne(id);
    }

    @Mutation(() => Order)
    updateOrderStatus(@Args('updateOrderStatusInput') updateOrderStatusInput: UpdateOrderStatusInput) {
        return this.orderService.updateStatus(updateOrderStatusInput);
    }

    @Mutation(() => Boolean)
    removeOrder(@Args('id', { type: () => String }) id: string) {
        return this.orderService.remove(id);
    }
}

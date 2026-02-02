import { ObjectType, Field, ID, Float, Int, InputType, PartialType } from '@nestjs/graphql';
import { Category } from '../../categories/models/category.model';
import { Accessory } from '../../accessories/entities/accessory.entity';
import { Color } from '../../colors/models/color.model';

@ObjectType()
@InputType('ProductSizeInput')
export class ProductSize {
    @Field(() => ID, { nullable: true })
    id?: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    dimensions?: string;

    @Field(() => Float)
    price: number;

    @Field({ nullable: true })
    productId?: string;
}

@ObjectType()
export class Product {
    @Field(() => ID)
    id: string;

    @Field()
    slug: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;

    @Field(() => Float, { nullable: true })
    discountPercentage?: number; // 0-100

    @Field(() => Int)
    stock: number;

    @Field(() => Boolean)
    isActive: boolean;

    @Field({ nullable: true })
    categoryId?: string;

    @Field(() => Category, { nullable: true })
    category?: any;

    @Field()
    mainImage: string;

    @Field(() => [String])
    galleryImages: string[];

    @Field({ nullable: true })
    glbFileUrl?: string;

    @Field(() => [Color])
    colors: Color[];

    @Field(() => [ProductSize])
    sizes: ProductSize[];

    @Field(() => [Accessory])
    accessories: Accessory[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@ObjectType()
export class PaginatedProducts {
    @Field(() => [Product])
    items: Product[];

    @Field(() => Int)
    total: number;
}

@InputType()
export class CreateProductInput {
    @Field()
    name: string;

    @Field()
    slug: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => Float)
    price: number;

    @Field(() => Float, { nullable: true })
    discountPercentage?: number; // 0-100

    @Field(() => Int)
    stock: number;

    @Field(() => Boolean, { defaultValue: true })
    isActive: boolean;

    @Field()
    mainImage: string;

    @Field(() => [String], { defaultValue: [] })
    galleryImages: string[];

    @Field({ nullable: true })
    glbFileUrl?: string;

    @Field({ nullable: true })
    categoryId?: string;

    @Field(() => [String], { nullable: true })
    colorIds?: string[];

    @Field(() => [ProductSize], { nullable: true })
    sizes?: ProductSize[];

    @Field(() => [String], { nullable: true })
    accessoryIds?: string[];
}

@InputType()
export class UpdateProductInput extends PartialType(CreateProductInput) { }

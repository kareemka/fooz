import { InputType, Field } from '@nestjs/graphql';

@InputType()
class CreateOrderItemAccessoryInput {
    @Field()
    name: string;

    @Field()
    price: number;
}

@InputType()
class CreateOrderItemInput {
    @Field()
    productId: string;

    @Field()
    quantity: number;

    @Field()
    price: number;

    @Field({ nullable: true })
    colorName?: string;

    @Field({ nullable: true })
    sizeName?: string;

    @Field(() => [CreateOrderItemAccessoryInput], { nullable: true })
    accessories?: CreateOrderItemAccessoryInput[];
}

@InputType()
export class CreateOrderInput {
    @Field()
    customerName: string;


    @Field()
    customerPhone: string;

    @Field()
    shippingAddress: string;

    @Field(() => [CreateOrderItemInput])
    items: CreateOrderItemInput[];

    @Field()
    totalAmount: number;
}

import { InputType, Field } from '@nestjs/graphql';
import { OrderStatus } from '../entities/order.entity';

@InputType()
export class UpdateOrderStatusInput {
    @Field()
    id: string;

    @Field(() => OrderStatus)
    status: OrderStatus;
}

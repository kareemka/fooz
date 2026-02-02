import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateAccessoryInput {
    @Field()
    name: string;

    @Field(() => Float)
    price: number;

    @Field({ nullable: true })
    image?: string;
}

import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreateFaqInput {
    @Field()
    question: string;

    @Field()
    answer: string;

    @Field(() => Int, { defaultValue: 0 })
    order?: number;

    @Field({ defaultValue: true })
    isActive?: boolean;
}

import { Field, ID, InputType, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Color {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field({ nullable: true })
    image?: string;
}

@InputType()
export class CreateColorInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    image?: string;
}

@InputType()
export class UpdateColorInput {
    @Field({ nullable: true })
    name?: string;

    @Field({ nullable: true })
    image?: string;
}
@ObjectType()
export class PaginatedColors {
    @Field(() => [Color])
    items: Color[];

    @Field(() => Int)
    total: number;
}

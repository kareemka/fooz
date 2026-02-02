import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Color, CreateColorInput, UpdateColorInput, PaginatedColors } from './models/color.model';
import { ColorsService } from './colors.service';

@Resolver(() => Color)
export class ColorsResolver {
    constructor(private colorsService: ColorsService) { }

    @Query(() => PaginatedColors, { name: 'colors' })
    async getColors(
        @Args('search', { nullable: true }) search?: string,
        @Args('skip', { nullable: true, type: () => Int }) skip?: number,
        @Args('take', { nullable: true, type: () => Int }) take?: number,
    ) {
        return this.colorsService.findAll(search, skip, take);
    }

    @Query(() => Color, { name: 'color', nullable: true })
    async getColor(@Args('id', { type: () => ID }) id: string) {
        return this.colorsService.findOne(id);
    }

    @Mutation(() => Color)
    async createColor(
        @Args('input') input: CreateColorInput,
    ) {
        return this.colorsService.create(input);
    }

    @Mutation(() => Color)
    async updateColor(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateColorInput,
    ) {
        return this.colorsService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteColor(@Args('id', { type: () => ID }) id: string) {
        return this.colorsService.delete(id);
    }

    @Mutation(() => Boolean)
    async bulkDeleteColors(@Args('ids', { type: () => [ID] }) ids: string[]) {
        return this.colorsService.bulkDelete(ids);
    }
}

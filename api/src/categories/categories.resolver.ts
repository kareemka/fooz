import { Resolver, Query, Mutation, Args, ID, Int } from '@nestjs/graphql';
import { Category, CreateCategoryInput, UpdateCategoryInput, PaginatedCategories } from './models/category.model';
import { CategoryService } from './categories.service';

@Resolver(() => Category)
export class CategoryResolver {
    constructor(private categoryService: CategoryService) { }

    @Query(() => PaginatedCategories, { name: 'categories' })
    async getCategories(
        @Args('search', { nullable: true }) search?: string,
        @Args('skip', { nullable: true, type: () => Int }) skip?: number,
        @Args('take', { nullable: true, type: () => Int }) take?: number,
    ) {
        return this.categoryService.findAll(search, skip, take);
    }

    @Query(() => Category, { name: 'categoryBySlug', nullable: true })
    async getCategoryBySlug(@Args('slug') slug: string) {
        return this.categoryService.findBySlug(slug);
    }

    @Mutation(() => Category)
    async createCategory(
        @Args('input') input: CreateCategoryInput,
    ) {
        return this.categoryService.create(input);
    }

    @Mutation(() => Category)
    async updateCategory(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateCategoryInput,
    ) {
        return this.categoryService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteCategory(@Args('id', { type: () => ID }) id: string) {
        return this.categoryService.delete(id);
    }

    @Mutation(() => Boolean)
    async bulkDeleteCategories(@Args('ids', { type: () => [ID] }) ids: string[]) {
        return this.categoryService.bulkDelete(ids);
    }
}

import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { Product, CreateProductInput, UpdateProductInput, PaginatedProducts } from './models/product.model';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
    constructor(private productService: ProductService) { }

    @Query(() => PaginatedProducts, { name: 'products' })
    async getProducts(
        @Args('category', { nullable: true }) category?: string,
        @Args('search', { nullable: true }) search?: string,
        @Args('skip', { nullable: true, type: () => Number }) skip?: number,
        @Args('take', { nullable: true, type: () => Number }) take?: number,
    ) {
        return this.productService.findAll(category, search, skip, take);
    }

    @Query(() => Product, { name: 'productBySlug', nullable: true })
    async getProductBySlug(@Args('slug') slug: string) {
        return this.productService.findBySlug(slug);
    }

    @Query(() => Product, { name: 'product', nullable: true })
    async getProduct(@Args('id', { type: () => ID }) id: string) {
        return this.productService.findById(id);
    }

    @Mutation(() => Product)
    async createProduct(
        @Args('input') input: CreateProductInput,
    ) {
        return this.productService.create(input);
    }

    @Mutation(() => Product)
    async updateProduct(
        @Args('id', { type: () => ID }) id: string,
        @Args('input') input: UpdateProductInput,
    ) {
        return this.productService.update(id, input);
    }

    @Mutation(() => Boolean)
    async deleteProduct(@Args('id', { type: () => ID }) id: string) {
        return this.productService.delete(id);
    }

    @Mutation(() => Boolean)
    async bulkDeleteProducts(@Args('ids', { type: () => [ID] }) ids: string[]) {
        return this.productService.bulkDelete(ids);
    }
}

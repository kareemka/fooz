import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { AccessoriesService } from './accessories.service';
import { Accessory, PaginatedAccessories } from './entities/accessory.entity';
import { CreateAccessoryInput } from './dto/create-accessory.input';

@Resolver(() => Accessory)
export class AccessoriesResolver {
    constructor(private readonly accessoriesService: AccessoriesService) { }

    @Mutation(() => Accessory)
    createAccessory(@Args('createAccessoryInput') createAccessoryInput: CreateAccessoryInput) {
        return this.accessoriesService.create(createAccessoryInput);
    }

    @Query(() => PaginatedAccessories, { name: 'accessories' })
    findAll(
        @Args('search', { nullable: true }) search?: string,
        @Args('skip', { nullable: true, type: () => Int }) skip?: number,
        @Args('take', { nullable: true, type: () => Int }) take?: number,
    ) {
        return this.accessoriesService.findAll(search, skip, take);
    }

    @Query(() => Accessory, { name: 'accessory' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.accessoriesService.findOne(id);
    }

    @Mutation(() => Accessory)
    updateAccessory(
        @Args('id', { type: () => String }) id: string,
        @Args('updateAccessoryInput') updateAccessoryInput: CreateAccessoryInput
    ) {
        return this.accessoriesService.update(id, updateAccessoryInput);
    }

    @Mutation(() => Accessory)
    removeAccessory(@Args('id', { type: () => String }) id: string) {
        return this.accessoriesService.remove(id);
    }

    @Mutation(() => Boolean)
    async bulkDeleteAccessories(@Args('ids', { type: () => [ID] }) ids: string[]) {
        await this.accessoriesService.bulkDelete(ids);
        return true;
    }
}

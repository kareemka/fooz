import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { FaqService } from './faq.service';
import { Faq, PaginatedFaqs } from './entities/faq.entity';
import { CreateFaqInput } from './dto/create-faq.input';
import { UpdateFaqInput } from './dto/update-faq.input';

@Resolver(() => Faq)
export class FaqResolver {
    constructor(private readonly faqService: FaqService) { }

    @Mutation(() => Faq)
    createFaq(@Args('createFaqInput') createFaqInput: CreateFaqInput) {
        return this.faqService.create(createFaqInput);
    }

    @Query(() => PaginatedFaqs, { name: 'faqs' })
    findAll(
        @Args('search', { nullable: true }) search?: string,
        @Args('skip', { nullable: true, type: () => Int }) skip?: number,
        @Args('take', { nullable: true, type: () => Int }) take?: number,
        @Args('isActive', { nullable: true, type: () => Boolean }) isActive?: boolean,
    ) {
        return this.faqService.findAll(search, skip, take, isActive);
    }

    @Query(() => Faq, { name: 'faq' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.faqService.findOne(id);
    }

    @Mutation(() => Faq)
    updateFaq(
        @Args('id', { type: () => String }) id: string,
        @Args('updateFaqInput') updateFaqInput: UpdateFaqInput
    ) {
        return this.faqService.update(id, updateFaqInput);
    }

    @Mutation(() => Faq)
    removeFaq(@Args('id', { type: () => String }) id: string) {
        return this.faqService.remove(id);
    }

    @Mutation(() => Boolean)
    async bulkDeleteFaqs(@Args('ids', { type: () => [ID] }) ids: string[]) {
        await this.faqService.bulkDelete(ids);
        return true;
    }
}

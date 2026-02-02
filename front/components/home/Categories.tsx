"use client";

import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "@/lib/graphql/queries";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { Category, getImageUrl } from "@/lib/products";
import Skeleton from "@/components/ui/Skeleton";

const Categories = () => {
    const { data, loading: isLoading } = useQuery(GET_CATEGORIES);
    const categories: Category[] = data?.categories?.items || [];

    return (
        <section className="py-8 md:py-12 relative overflow-hidden">
            <Container>
                <div className="flex items-center justify-between mb-6 md:mb-8 overflow-hidden">
                    <h2 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 md:w-2 h-6 md:h-8 bg-accent rounded-full"></span>
                        تصفح حسب العتاد
                    </h2>
                    <Link href="/products" className="text-xs md:text-sm font-bold text-accent hover:text-white flex items-center gap-1 transition-colors">
                        عرض الكل
                        <span className="material-symbols-outlined text-sm">arrow_back_ios</span>
                    </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
                    {isLoading ? (
                        Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-card-bg border border-white/5 space-y-3 md:space-y-4">
                                <Skeleton className="size-14 md:size-20 lg:size-24 rounded-full mx-auto" />
                                <Skeleton className="h-5 md:h-6 w-16 md:w-20 mx-auto" />
                            </div>
                        ))
                    ) : (
                        categories.map((cat, index) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link
                                    href={`/products?category=${cat.slug}`}
                                    className="group relative flex flex-col items-center justify-center gap-3 md:gap-4 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card-bg border border-white/5 hover:border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-neon overflow-hidden"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="size-14 md:size-20 lg:size-24 rounded-full bg-surface border border-white/10 overflow-hidden relative shadow-lg group-hover:shadow-primary/50 transition-all">
                                        <img
                                            src={getImageUrl(cat.image)}
                                            alt={cat.name}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            style={{ filter: 'saturate(0)' }}
                                        />
                                    </div>
                                    <span className="font-bold text-gray-300 group-hover:text-white relative z-10 text-sm md:text-lg text-center">{cat.name}</span>
                                </Link>
                            </motion.div>
                        ))
                    )}
                </div>
            </Container>
        </section>
    );
};


export default Categories;

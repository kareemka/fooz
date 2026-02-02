"use client";



import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/lib/graphql/queries";
import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/lib/products";
import Skeleton from "@/components/ui/Skeleton";

interface FeaturedProductsProps {
    title: string;
    category?: string;
}

const FeaturedProducts = ({ title, category }: FeaturedProductsProps) => {
    const { data, loading: isLoading, error } = useQuery(GET_PRODUCTS, {
        variables: { category: category === "all" ? undefined : category }
    });

    if (error) {
        console.error("FeaturedProducts Query Error:", error);
    }
    if (data) {
        console.log(`FeaturedProducts (${category}) loaded:`, data.products?.items?.length);
    }

    const products: Product[] = (data?.products?.items || []).map((p: any) => ({
        ...p,
        price: p.price || p.sizes?.[0]?.price || 0
    }));

    return (
        <section className="py-8 md:py-12 relative overflow-hidden">
            <Container>
                <div className="flex items-center justify-between mb-6 md:mb-8 overflow-hidden">
                    <h2 className="text-xl md:text-3xl font-bold text-white flex items-center gap-2">
                        <span className="w-1.5 md:w-2 h-6 md:h-8 bg-primary rounded-full"></span>
                        {title}
                    </h2>
                    <div className="flex gap-2">
                        <button className="size-8 md:size-10 flex items-center justify-center rounded-full bg-surface border border-white/10 hover:border-primary text-gray-300 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[18px] md:text-[24px] transition-transform">arrow_forward</span>
                        </button>
                        <button className="size-8 md:size-10 flex items-center justify-center rounded-full bg-surface border border-white/10 hover:border-primary text-gray-300 hover:text-primary transition-colors">
                            <span className="material-symbols-outlined text-[18px] md:text-[24px] transition-transform">arrow_back</span>
                        </button>
                    </div>
                </div>


                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {error && (
                        <div className="col-span-full text-center py-8">
                            <p className="text-red-500 font-bold">Error loading products: {error.message}</p>
                            <pre className="text-xs text-left overflow-auto max-h-40 bg-black/50 p-4 rounded mt-2 text-white">
                                {JSON.stringify(error, null, 2)}
                            </pre>
                        </div>
                    )}

                    {!isLoading && !error && products.length === 0 && (
                        <div className="col-span-full text-center py-8">
                            <p className="text-gray-400">No products found in this category.</p>
                        </div>
                    )}

                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={index} className="space-y-4">
                                <Skeleton className="w-full aspect-[3/4] rounded-xl" />
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))
                    ) : (
                        products.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </Container>
        </section>
    );
};

export default FeaturedProducts;

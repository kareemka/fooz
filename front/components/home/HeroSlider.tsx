"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { Product, getImageUrl } from "@/lib/products";
import { cn } from "@/lib/utils";
import Skeleton from "@/components/ui/Skeleton";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "@/lib/graphql/queries";

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

    // Use GraphQL query instead of removed getFilteredProducts
    const { data, loading: isLoading } = useQuery(GET_PRODUCTS, {
        variables: { take: 5 },
    });

    useEffect(() => {
        if (data?.products?.items) {
            setFeaturedProducts(data.products.items);
        }
    }, [data]);

    useEffect(() => {
        if (featuredProducts.length === 0) return;
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
        }, 8000);
        return () => clearInterval(timer);
    }, [featuredProducts.length]);

    const nextSlide = () => {
        if (featuredProducts.length === 0) return;
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        if (featuredProducts.length === 0) return;
        setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    if (isLoading) {
        return (
            <div className="relative h-[700px] md:h-[900px] overflow-hidden rounded-[4rem] bg-gray-900 animate-pulse flex items-center justify-center">
                <Skeleton className="w-1/2 h-20 rounded-xl" />
            </div>
        );
    }

    if (featuredProducts.length === 0) {
        return null;
    }

    const currentProduct = featuredProducts[currentSlide];
    const mainImage = currentProduct.mainImage || "";
    const hasDiscount = currentProduct.discountPercentage && currentProduct.discountPercentage > 0;
    const discountPercentage = hasDiscount ? currentProduct.discountPercentage : 0;

    return (
        <div className="relative h-[700px] md:h-[900px] overflow-hidden rounded-[4rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] glass-aaa border border-white/10 group will-change-transform">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.1, filter: "blur(30px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 0.9, filter: "blur(30px)" }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <div className="absolute inset-0 transition-transform duration-[2000ms] group-hover:scale-110">
                        <Image
                            src={getImageUrl(mainImage)}
                            alt={currentProduct.name}
                            fill
                            priority={currentSlide === 0}
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 1400px"
                            quality={100}
                        />
                    </div>

                    {/* Cinematic Gradients & Glows */}
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/60 to-[#05050a] z-10" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-transparent to-transparent opacity-90 z-10" />

                    {/* Dynamic Background Glow */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 blur-[150px] rounded-full z-10 animate-pulse-slow" />

                    <div className="relative h-full flex items-center px-12 md:px-32 z-20">
                        <div className="max-w-4xl text-right">
                            <motion.div
                                initial={{ opacity: 0, x: 100, filter: "blur(10px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="mb-10"
                            >
                                {hasDiscount && (
                                    <span className="inline-block px-8 py-3 text-sm font-black bg-gradient-to-r from-primary to-secondary text-white rounded-full shadow-[0_0_30px_rgba(176,38,255,0.6)] uppercase tracking-[0.2em]">
                                        خصم حصري {discountPercentage}%
                                    </span>
                                )}
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 50, filter: "blur(20px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.6, duration: 1.2 }}
                                className="text-6xl md:text-[9rem] font-black text-white mb-10 tracking-tighter leading-[0.85] drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                            >
                                {currentProduct.name}
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ delay: 0.7, duration: 1.2 }}
                                className="text-2xl md:text-3xl text-gray-300 mb-16 max-w-2xl ml-auto leading-relaxed font-medium opacity-80"
                            >
                                {currentProduct.description.substring(0, 150)}...
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 1 }}
                                className="flex gap-8 justify-end"
                            >
                                <Link href={`/products/${currentProduct.id}`}>
                                    <Button size="lg" className="btn-gaming bg-white text-black hover:bg-primary hover:text-white px-16 py-8 h-auto text-2xl font-black rounded-2xl shadow-2xl transition-all duration-500">
                                        اكتشف الآن
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Elements */}
            <div className="absolute inset-x-12 bottom-16 flex items-center justify-between z-30">
                <div className="flex gap-6">
                    <button onClick={prevSlide} className="p-6 glass-aaa rounded-3xl text-white hover:bg-primary transition-all active:scale-90 border border-white/10 group/btn shadow-xl">
                        <span className="material-symbols-outlined text-[32px] group-hover/btn:-translate-x-2 transition-transform">chevron_left</span>
                    </button>
                    <button onClick={nextSlide} className="p-6 glass-aaa rounded-3xl text-white hover:bg-primary transition-all active:scale-90 border border-white/10 group/btn shadow-xl">
                        <span className="material-symbols-outlined text-[32px] group-hover/btn:translate-x-2 transition-transform">chevron_right</span>
                    </button>
                </div>

                {/* Progress Indicators */}
                <div className="flex gap-5">
                    {featuredProducts.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={cn(
                                "h-2 rounded-full transition-all duration-1000",
                                currentSlide === index ? "bg-primary w-20 shadow-[0_0_20px_rgba(176,38,255,0.8)]" : "bg-white/20 w-6 hover:bg-white/40"
                            )}
                        />
                    ))}
                </div>
            </div>

            {/* Visual Flair */}
            <div className="absolute top-16 left-16 w-32 h-[2px] bg-gradient-to-r from-primary to-transparent opacity-30 z-20" />
            <div className="absolute bottom-16 right-16 w-32 h-[2px] bg-gradient-to-l from-secondary to-transparent opacity-30 z-20" />
        </div>
    );
};

export default HeroSlider;

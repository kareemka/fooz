"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Container from "@/components/ui/Container";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/store";
import { cn, formatPrice } from "@/lib/utils";
import Link from "next/link";
import { getImageUrl, Product } from "@/lib/products";

interface ProductDetailsProps {
    product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const { addItem } = useCart();

    const colors = (product as any).colors || [];
    const sizes = (product as any).sizes || [];
    const accessories = (product as any).accessories || [];

    const [activeColor, setActiveColor] = useState(colors.length > 0 ? colors[0]?.id : null);
    const [selectedSize, setSelectedSize] = useState(sizes.length > 0 ? sizes[0] : null);
    const [selectedAccessories, setSelectedAccessories] = useState<string[]>([]);


    // Refined Price Logic with Percentage Discount:
    // Discount percentage now applies to BOTH base price AND size prices

    let basePrice = 0;
    let finalPrice = 0;
    let hasDiscount = !!(product.discountPercentage && product.discountPercentage > 0);

    if (sizes.length > 0) {
        // Use selected size price or default to product price
        basePrice = selectedSize?.price || product.price || 0;
        // Apply discount percentage to size price
        finalPrice = hasDiscount ? basePrice * (1 - product.discountPercentage! / 100) : basePrice;
    } else {
        // Use base product price
        basePrice = product.price || 0;
        // Apply discount percentage to base price
        finalPrice = hasDiscount ? basePrice * (1 - product.discountPercentage! / 100) : basePrice;
    }

    const discountPercentageDisplay = hasDiscount ? product.discountPercentage! : 0;


    const accessoriesTotal = accessories
        .filter((acc: any) => selectedAccessories.includes(acc.id))
        .reduce((sum: number, acc: any) => sum + acc.price, 0);

    const totalPrice = finalPrice + accessoriesTotal;

    const images = (product.imagePaths?.map(p => p.path)) || [product.mainImage, ...(product.galleryImages || [])].filter(Boolean) as string[];

    const handleAddToCart = () => {
        setIsAddingToCart(true);
        const selectedAccObjects = accessories.filter((acc: any) => selectedAccessories.includes(acc.id));
        const selectedColorObject = colors.find((c: any) => c.id === activeColor);
        addItem(product, quantity, selectedSize, selectedAccObjects, selectedColorObject);

        setTimeout(() => {
            setIsAddingToCart(false);
        }, 2000);
    };

    return (
        <main className="min-h-screen bg-dark-bg text-white selection:bg-primary selection:text-white" dir="rtl">
            <Navbar />

            <div className="pt-24 md:pt-32">
                <Container className="py-8 md:py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                            {/* Product Info - Order 1 on desktop (right side) */}
                            <div className="lg:col-span-5 flex flex-col gap-6 order-2 lg:order-1">
                                {/* Header Section */}
                                <div className="flex flex-col gap-3">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-3 py-1 bg-accent/20 text-accent text-xs font-bold rounded-full uppercase tracking-wider border border-accent/30 flex items-center gap-1">
                                            <span className="size-1.5 bg-accent rounded-full animate-pulse"></span>
                                            جديد 2024
                                        </span>
                                        <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                                            <span className="text-yellow-400 text-xs font-bold">(4.8)</span>
                                            {[...Array(5)].map((_, i) => (
                                                <span key={i} className="material-symbols-outlined text-[14px] fill-current text-yellow-400">star</span>
                                            ))}
                                        </div>
                                    </div>

                                    <h1 className="text-3xl lg:text-4xl font-black text-white leading-tight">
                                        {product.name}
                                    </h1>

                                    <p className="text-gray-400 text-base leading-relaxed">
                                        {product.description}
                                    </p>
                                </div>

                                {/* Price Section */}
                                <div className="flex flex-col gap-3 p-5 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            {hasDiscount && (
                                                <motion.span
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-black rounded-lg shadow-lg"
                                                >
                                                    وفر {discountPercentageDisplay}٪
                                                </motion.span>
                                            )}
                                        </div>
                                        <div className="flex flex-col items-end gap-1">
                                            {hasDiscount && (
                                                <span className="text-base text-gray-500 line-through">{formatPrice(basePrice)}</span>
                                            )}
                                            <span className="text-3xl font-black text-primary">{formatPrice(finalPrice)}</span>
                                        </div>
                                    </div>

                                    {accessoriesTotal > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            className="flex flex-col gap-2 pt-3 border-t border-white/10"
                                        >
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-accent font-bold">+{formatPrice(accessoriesTotal)}</span>
                                                <span className="text-gray-400">الملحقات المختارة</span>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="text-2xl font-black text-white">{formatPrice(totalPrice)}</span>
                                                <span className="text-sm text-gray-400">الإجمالي النهائي</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>

                                {/* Color Selection */}
                                {colors.length > 0 && (
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-400">
                                                {colors.find((c: any) => c.id === activeColor)?.name}
                                            </span>
                                            <h3 className="text-sm font-bold text-white">اختر اللون</h3>
                                        </div>
                                        <div className="flex gap-3 flex-wrap justify-end">
                                            {colors.map((color: any) => (
                                                <motion.button
                                                    key={color.id}
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setActiveColor(color.id)}
                                                    className={cn(
                                                        "size-12 rounded-full border-3 transition-all relative overflow-hidden",
                                                        activeColor === color.id
                                                            ? "border-primary ring-4 ring-primary/30 scale-110"
                                                            : "border-white/20 hover:border-white/40"
                                                    )}
                                                    title={color.name}
                                                >
                                                    {color.image ? (
                                                        <div
                                                            className="absolute inset-0 bg-cover bg-center"
                                                            style={{ backgroundImage: `url(${getImageUrl(color.image)})` }}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 bg-gray-800" />
                                                    )}
                                                    {activeColor === color.id && (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                                            <span className="text-white material-symbols-outlined text-[20px] drop-shadow-lg">
                                                                check
                                                            </span>
                                                        </div>
                                                    )}
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Size Selection */}
                                {sizes.length > 0 && (
                                    <div className="flex flex-col gap-3">
                                        <h3 className="text-sm font-bold text-white">اختر المقاس</h3>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                            {sizes.map((size: any) => (
                                                <motion.button
                                                    key={size.id}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => setSelectedSize(size)}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 transition-all text-center",
                                                        selectedSize?.id === size.id
                                                            ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                                                            : "border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10"
                                                    )}
                                                >
                                                    <div className="flex flex-col gap-1.5">
                                                        <span className={cn(
                                                            "text-sm font-bold",
                                                            selectedSize?.id === size.id ? "text-primary" : "text-white"
                                                        )}>
                                                            {size.name}
                                                        </span>
                                                        {size.dimensions && (
                                                            <span className="text-xs text-gray-500">{size.dimensions}</span>
                                                        )}
                                                        <span className="text-primary font-black text-base">{formatPrice(size.price)}</span>
                                                    </div>
                                                </motion.button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Accessories Section */}
                                {accessories.length > 0 && (
                                    <div className="flex flex-col gap-4 p-5 bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl border border-white/10">
                                        <div className="flex items-center justify-between">
                                            <span className="px-2 py-1 bg-accent/10 text-accent text-xs font-bold rounded-full border border-accent/20">
                                                {selectedAccessories.length} محدد
                                            </span>
                                            <h3 className="text-base font-bold text-white">أضف الملحقات</h3>
                                        </div>
                                        <div className="grid grid-cols-1 gap-3">
                                            {accessories.map((accessory: any) => {
                                                const isSelected = selectedAccessories.includes(accessory.id);
                                                return (
                                                    <motion.label
                                                        key={accessory.id}
                                                        whileHover={{ scale: 1.01 }}
                                                        whileTap={{ scale: 0.99 }}
                                                        className={cn(
                                                            "flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all",
                                                            isSelected
                                                                ? "border-accent bg-accent/10 shadow-lg shadow-accent/20"
                                                                : "border-white/10 bg-white/5 hover:border-accent/50"
                                                        )}
                                                    >
                                                        <div className="flex-1 flex items-center gap-3">
                                                            {accessory.image && (
                                                                <img
                                                                    src={getImageUrl(accessory.image)}
                                                                    alt={accessory.name}
                                                                    className="size-14 rounded-lg object-cover bg-surface border border-white/10"
                                                                />
                                                            )}
                                                            <div className="flex-1">
                                                                <p className="text-sm font-bold text-white mb-1">{accessory.name}</p>
                                                                <p className="text-accent font-black text-base">+{formatPrice(accessory.price)}</p>
                                                            </div>
                                                        </div>
                                                        <div className={cn(
                                                            "size-6 rounded-md border-2 flex items-center justify-center transition-all",
                                                            isSelected
                                                                ? "bg-accent border-accent"
                                                                : "border-white/30 bg-white/5"
                                                        )}>
                                                            {isSelected && (
                                                                <span className="material-symbols-outlined text-[16px] text-black">check</span>
                                                            )}
                                                        </div>
                                                        <input
                                                            type="checkbox"
                                                            checked={isSelected}
                                                            onChange={(e) => {
                                                                if (e.target.checked) {
                                                                    setSelectedAccessories([...selectedAccessories, accessory.id]);
                                                                } else {
                                                                    setSelectedAccessories(selectedAccessories.filter(id => id !== accessory.id));
                                                                }
                                                            }}
                                                            className="sr-only"
                                                        />
                                                    </motion.label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* AR Button */}
                                {(product.model3dPath || product.glbFileUrl) && (
                                    <Link
                                        href={`/ar/${product.slug}`}
                                        className="relative group overflow-hidden rounded-xl"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-accent via-primary to-secondary opacity-100 group-hover:opacity-80 transition-opacity"></div>
                                        <div className="relative bg-black/40 backdrop-blur-sm hover:bg-black/30 text-white font-bold py-4 px-6 flex items-center justify-center gap-3 transition-all">
                                            <span className="material-symbols-outlined text-accent text-2xl group-hover:scale-110 transition-transform">view_in_ar</span>
                                            <span className="text-lg font-black">جرّب المنتج في غرفتك</span>
                                            <span className="size-2 bg-accent rounded-full animate-pulse"></span>
                                        </div>
                                    </Link>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-6 border-t border-white/10">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleAddToCart}
                                        disabled={isAddingToCart}
                                        className={cn(
                                            "flex-1 font-bold py-4 px-6 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg",
                                            isAddingToCart
                                                ? "bg-green-500 text-white"
                                                : "bg-gradient-to-r from-primary to-primary-dark hover:from-accent hover:to-cyan-600 text-white hover:shadow-2xl hover:shadow-primary/50"
                                        )}
                                    >
                                        {isAddingToCart ? (
                                            <>
                                                <span className="material-symbols-outlined text-[24px] animate-bounce">check_circle</span>
                                                <span className="text-base">تمت الإضافة بنجاح!</span>
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
                                                <span className="text-base">أضف إلى السلة</span>
                                            </>
                                        )}
                                    </motion.button>

                                    <div className="flex items-center bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="px-4 py-4 hover:bg-primary/20 transition-colors text-white font-bold text-xl"
                                        >
                                            +
                                        </motion.button>
                                        <span className="px-6 font-bold text-lg text-white">{quantity}</span>
                                        <motion.button
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="px-4 py-4 hover:bg-primary/20 transition-colors text-white font-bold text-xl"
                                        >
                                            -
                                        </motion.button>
                                    </div>
                                </div>

                                {/* Stock Status */}
                                <div className="flex items-center justify-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                                    <span className="size-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span className="text-green-400 text-sm font-bold">متوفر في المخزون - شحن فوري</span>
                                </div>
                            </div>

                            {/* Image Gallery - Order 2 on desktop (left side) */}
                            <div className="lg:col-span-7 order-1 lg:order-2">
                                <div className="sticky top-24">
                                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/10 shadow-2xl">
                                        {/* Decorative gradient */}
                                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>

                                        {/* 3D/AR Button */}
                                        {(product.model3dPath || product.glbFileUrl) && (
                                            <Link href={`/ar/${product.slug}`}>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 360 }}
                                                    transition={{ duration: 0.6 }}
                                                    className="absolute top-4 left-4 z-20 size-12 rounded-full bg-gradient-to-br from-accent to-cyan-500 backdrop-blur-md border-2 border-white/20 text-white shadow-lg flex items-center justify-center"
                                                >
                                                    <span className="material-symbols-outlined">3d_rotation</span>
                                                </motion.button>
                                            </Link>
                                        )}

                                        {/* Main Image */}
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                key={activeImageIndex}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.3 }}
                                                className="w-full h-full flex items-center justify-center p-8"
                                            >
                                                <img
                                                    alt={product.name}
                                                    className="max-w-full max-h-full object-contain drop-shadow-2xl"
                                                    src={getImageUrl(images[activeImageIndex] || "")}
                                                />
                                            </motion.div>
                                        </AnimatePresence>

                                        {/* Image Navigation Arrows */}
                                        {images.length > 1 && (
                                            <>
                                                <button
                                                    onClick={() => setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                                                    className="absolute left-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-primary transition-all flex items-center justify-center"
                                                >
                                                    <span className="material-symbols-outlined">chevron_left</span>
                                                </button>
                                                <button
                                                    onClick={() => setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                                                    className="absolute right-4 top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-black/50 backdrop-blur-sm border border-white/20 text-white hover:bg-primary transition-all flex items-center justify-center"
                                                >
                                                    <span className="material-symbols-outlined">chevron_right</span>
                                                </button>
                                            </>
                                        )}
                                    </div>

                                    {/* Thumbnail Gallery */}
                                    {images.length > 1 && (
                                        <div className="flex gap-3 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                                            {images.map((img: string, i: number) => (
                                                <motion.button
                                                    key={i}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    onClick={() => setActiveImageIndex(i)}
                                                    className={cn(
                                                        "size-20 rounded-xl overflow-hidden shrink-0 transition-all border-2",
                                                        activeImageIndex === i
                                                            ? "border-primary ring-2 ring-primary/50 shadow-lg"
                                                            : "border-white/10 hover:border-white/30"
                                                    )}
                                                >
                                                    <img
                                                        alt={`view ${i + 1}`}
                                                        className="w-full h-full object-cover"
                                                        src={getImageUrl(img)}
                                                    />
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </section>
                    </motion.div>
                </Container>
            </div>

            <Footer />
        </main>
    );
}
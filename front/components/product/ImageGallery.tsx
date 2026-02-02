"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageGalleryProps {
    images: string[];
    productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="space-y-6">
            {/* Main Image */}
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={selectedImage}
                        src={images[selectedImage]}
                        alt={`${productName} - ${selectedImage + 1}`}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-4">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={cn(
                            "aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 bg-white/5",
                            selectedImage === index
                                ? "border-primary scale-105 shadow-lg shadow-primary/30"
                                : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                        )}
                    >
                        <img
                            src={image}
                            alt={`${productName} thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                        />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ImageGallery;

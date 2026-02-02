"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/products";

interface CartItem extends Product {
    quantity: number;
    selectedSize?: any;
    selectedColor?: any;
    selectedAccessories?: any[];
}

interface CartStore {
    items: CartItem[];
    addItem: (product: Product, quantity: number, selectedSize?: any, selectedAccessories?: any[], selectedColor?: any) => void;
    removeItem: (cartItemId: string) => void;
    clearCart: () => void;
    getTotal: () => number;
    getItemCount: () => number;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (product, quantity, selectedSize, selectedAccessories = [], selectedColor = null) => {
                const items = get().items;
                // Create a unique key for this configuration
                const configId = `${product.id}-${selectedSize?.id || 'default'}-${selectedColor?.id || 'default'}-${selectedAccessories.map(a => a.id).sort().join(',')}`;

                const existingItemIndex = items.findIndex((i: any) => i.cartItemId === configId);

                if (existingItemIndex > -1) {
                    const newItems = [...items];
                    newItems[existingItemIndex].quantity += quantity;
                    set({ items: newItems });
                } else {
                    const accessoryPrice = selectedAccessories.reduce((sum, acc) => sum + acc.price, 0);
                    const basePrice = selectedSize?.price || product.price || 0;

                    // Apply discountPercentage to the base price
                    const hasDiscount = !!(product.discountPercentage && product.discountPercentage > 0);
                    const discountedBasePrice = hasDiscount
                        ? basePrice * (1 - product.discountPercentage! / 100)
                        : basePrice;

                    const itemPrice = discountedBasePrice + accessoryPrice;
                    const originalPriceTotal = basePrice + accessoryPrice;

                    set({
                        items: [...items, {
                            ...product,
                            price: itemPrice, // Store the calculated discounted price per unit
                            originalPrice: originalPriceTotal, // Store the original price before discount
                            quantity,
                            selectedSize,
                            selectedColor,
                            selectedAccessories,
                            cartItemId: configId // Add a unique internal ID
                        } as any]
                    });
                }
            },
            removeItem: (cartItemId) => set({
                items: get().items.filter((i: any) => i.cartItemId !== cartItemId)
            }),
            clearCart: () => set({ items: [] }),
            getTotal: () => get().items.reduce((acc, item: any) => acc + item.price * item.quantity, 0),
            getItemCount: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
        }),
        { name: "fooz-cart" }
    )
);

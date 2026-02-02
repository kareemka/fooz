"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/store";
import CartDrawer from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { getItemCount } = useCart();
    const pathname = usePathname();

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const navLinks = [
        { name: "الرئيسية", href: "/", icon: "home" },
        { name: "المنتجات", href: "/products", icon: "inventory_2" },
        { name: "من نحن", href: "/about", icon: "info" },
        { name: "تواصل معنا", href: "/contact", icon: "mail" },
        { name: "الاسئلة الشائعة", href: "/faq", icon: "help" },
    ];

    return (
        <>
            <header className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-[1400px] mx-auto w-full flex flex-col">
                    {/* Top Tier: Logo, Search, Actions */}
                    <div className="flex items-center justify-between px-4 md:px-10 py-3 md:py-4 gap-4 md:gap-8">
                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="md:hidden flex items-center justify-center size-10 rounded-xl bg-surface/50 text-white hover:bg-primary/20 hover:text-primary transition-all"
                            aria-label="فتح القائمة"
                        >
                            <span className="material-symbols-outlined">menu</span>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 text-white shrink-0 group">
                            <Image
                                src="/fooz-logo.png"
                                alt="FOOZ Gaming Logo"
                                width={140}
                                height={50}
                                className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(176,38,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(0,242,255,0.5)] transition-all"
                                priority
                            />
                        </Link>

                        {/* Search Bar */}
                        <div className="hidden md:flex flex-1 max-w-[600px]">
                            <label className="flex w-full cursor-text items-center rounded-full bg-surface border border-white/5 focus-within:border-primary/50 focus-within:shadow-[0_0_20px_rgba(176,38,255,0.2)] transition-all px-4 py-2.5">
                                <span className="material-symbols-outlined text-gray-400 ms-3">search</span>
                                <input
                                    className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none border-none focus:ring-0 p-0 text-right"
                                    placeholder="ابحث عن منتجات..."
                                    type="text"
                                />
                                <button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white text-xs font-bold px-5 py-1.5 rounded-full transition-all duration-300">بحث</button>
                            </label>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-2 md:gap-4 shrink-0">
                            <button className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-surface text-gray-300 hover:text-secondary transition-colors relative group">
                                <span className="material-symbols-outlined">favorite</span>
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="flex items-center justify-center size-10 rounded-full hover:bg-surface text-gray-300 hover:text-accent transition-colors relative"
                            >
                                <span className="material-symbols-outlined">shopping_cart</span>
                                {getItemCount() > 0 && (
                                    <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-[10px] font-bold text-white shadow-lg">
                                        {getItemCount()}
                                    </span>
                                )}
                            </button>
                            <button className="hidden sm:flex items-center justify-center size-10 rounded-full hover:bg-surface text-gray-300 hover:text-white transition-colors">
                                <span className="material-symbols-outlined">person</span>
                            </button>
                        </div>
                    </div>

                    {/* Bottom Tier: Nav Links (Desktop) */}
                    <div className="hidden md:flex justify-center border-t border-white/5 py-3 bg-black/20">
                        <nav className="flex gap-2 items-center bg-white/5 p-1.5 rounded-full border border-white/5 backdrop-blur-sm">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href;
                                return (
                                    <Link
                                        key={link.name}
                                        href={link.href}
                                        className={cn(
                                            "relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                                            isActive ? "text-white" : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="navbar-active"
                                                className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full border border-primary/30"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Mobile Search */}
                    <div className="md:hidden px-4 pb-3">
                        <label className="flex w-full cursor-text items-center rounded-xl bg-surface/80 border border-white/5 px-3 py-2.5">
                            <span className="material-symbols-outlined text-gray-400 ms-2 text-[20px]">search</span>
                            <input className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none border-none focus:ring-0 p-0 text-right" placeholder="بحث..." type="text" />
                        </label>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[60]"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-gradient-to-b from-dark-bg to-card-bg z-[70] shadow-2xl border-l border-white/10"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-white/10">
                                <Link href="/" className="flex items-center gap-2" onClick={() => setIsMobileMenuOpen(false)}>
                                    <Image
                                        src="/fooz-logo.png"
                                        alt="FOOZ Gaming Logo"
                                        width={120}
                                        height={45}
                                        className="h-10 w-auto object-contain"
                                    />
                                </Link>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="size-10 rounded-xl bg-surface/50 flex items-center justify-center text-gray-400 hover:text-white hover:bg-surface transition-all"
                                    aria-label="إغلاق القائمة"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            {/* Navigation Links */}
                            <nav className="p-4 flex flex-col gap-2">
                                {navLinks.map((link, index) => {
                                    const isActive = pathname === link.href;
                                    return (
                                        <motion.div
                                            key={link.name}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={link.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={cn(
                                                    "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300",
                                                    isActive
                                                        ? "bg-gradient-to-r from-primary/20 to-secondary/10 border border-primary/30 text-white"
                                                        : "text-gray-400 hover:text-white hover:bg-surface/50"
                                                )}
                                            >
                                                <span className={cn(
                                                    "material-symbols-outlined text-[22px]",
                                                    isActive ? "text-primary" : ""
                                                )}>{link.icon}</span>
                                                <span className="font-medium text-base">{link.name}</span>
                                                {isActive && (
                                                    <span className="ms-auto size-2 rounded-full bg-primary animate-pulse" />
                                                )}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>

                            {/* Drawer Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-white/10 bg-card-bg/50">
                                <div className="flex items-center justify-center gap-4">
                                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-surface/50 text-gray-400 hover:text-secondary transition-all">
                                        <span className="material-symbols-outlined">favorite</span>
                                        <span className="text-sm">المفضلة</span>
                                    </button>
                                    <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-surface/50 text-gray-400 hover:text-white transition-all">
                                        <span className="material-symbols-outlined">person</span>
                                        <span className="text-sm">حسابي</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default Navbar;

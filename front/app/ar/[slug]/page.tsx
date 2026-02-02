"use client";

import { use, useEffect, useState } from "react";
import { getImageUrl } from "@/lib/products";
import { useQuery } from "@apollo/client";
import { GET_PRODUCT_BY_SLUG } from "@/lib/graphql/queries";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Skeleton from "@/components/ui/Skeleton";
import { QRCodeSVG } from "qrcode.react";

export default function ARViewerPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const [isMobile, setIsMobile] = useState<boolean | null>(null);
    const [currentUrl, setCurrentUrl] = useState("");

    const { data, loading: isLoading, error } = useQuery(GET_PRODUCT_BY_SLUG, {
        variables: { slug },
        skip: !slug
    });

    const product = data?.productBySlug;

    // Detect Device Type
    useEffect(() => {
        const checkMobile = () => {
            const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
            return /android|ipad|iphone|ipod/i.test(userAgent.toLowerCase());
        };
        setIsMobile(checkMobile());
        setCurrentUrl(window.location.href);
    }, []);

    useEffect(() => {
        if (isMobile) {
            // Load model-viewer script only on mobile
            const script = document.createElement("script");
            script.type = "module";
            script.src = "https://ajax.googleapis.com/ajax/libs/model-viewer/3.4.0/model-viewer.min.js";
            document.body.appendChild(script);

            return () => {
                if (document.body.contains(script)) {
                    document.body.removeChild(script);
                }
            };
        }
    }, [isMobile]);

    if (isLoading || isMobile === null) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="flex flex-col items-center gap-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full animate-pulse" />
                        <span className="material-symbols-outlined text-6xl text-primary animate-spin">sync</span>
                    </div>
                    <p className="font-bold tracking-widest uppercase animate-pulse">جاري التحميل...</p>
                </div>
            </main>
        );
    }

    const modelPath = product?.glbFileUrl;

    if (!product || !modelPath) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center text-white p-6" dir="rtl">
                <div className="text-center glass-aaa p-12 rounded-[3rem] border border-white/10 max-w-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-orange-500" />
                    <span className="material-symbols-outlined text-7xl text-red-500 mb-6 block">view_in_ar_off</span>
                    <h1 className="text-3xl font-black mb-4">العرض ثلاثي الأبعاد غير متوفر</h1>
                    <p className="text-gray-400 mb-8 text-lg">
                        عذراً، هذا المنتج لا يمتلك نموذجاً ثلاثي الأبعاد متاحاً حالياً للعرض في الواقع المعزز.
                    </p>
                    <Link href={`/products/${product?.slug || ''}`} className="btn-gaming bg-white text-black hover:bg-gray-200 px-10 py-4 rounded-xl font-black transition-all inline-flex items-center gap-2">
                        <span className="material-symbols-outlined">arrow_forward</span>
                        العودة للمنتج
                    </Link>
                </div>
            </main>
        );
    }

    // DESKTOP VIEW
    if (!isMobile) {
        return (
            <main className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden p-6" dir="rtl">
                <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-black to-secondary/10 pointer-events-none" />

                <div className="relative z-10 w-full max-w-5xl glass-aaa border border-white/10 rounded-[3rem] p-12 lg:p-16 flex flex-col md:flex-row items-center gap-16 shadow-2xl shadow-primary/5">

                    {/* Content */}
                    <div className="flex-1 text-right space-y-8">
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-primary text-sm font-bold uppercase tracking-wider mb-6">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                تجربة واقع معزز
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                                استعرض <span className="text-transparent bg-clip-text bg-gradient-to-l from-primary to-accent">{product.name}</span> في مساحتك الخاصة
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                للحصول على أفضل تجربة، لقد قمنا بتخصيص هذا العرض للأجهزة المحمولة. قم بمسح رمز الاستجابة السريعة (QR Code) باستخدام كاميرا هاتفك لبدء التجربة فوراً.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-gray-500 font-bold border-t border-white/5 pt-6">
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined">ios</span>
                                يدعم iOS
                            </span>
                            <span className="w-1 h-1 bg-gray-700 rounded-full" />
                            <span className="flex items-center gap-2">
                                <span className="material-symbols-outlined">android</span>
                                يدعم Android
                            </span>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                        <div className="bg-white p-6 rounded-3xl relative z-10 shadow-xl transform group-hover:scale-105 transition-transform duration-500">
                            <QRCodeSVG
                                value={currentUrl}
                                size={250}
                                level="H"
                                includeMargin
                                imageSettings={{
                                    src: "/logo-icon.png", // Ensure you have a small logo icon or remove if not
                                    x: undefined,
                                    y: undefined,
                                    height: 40,
                                    width: 40,
                                    excavate: true,
                                }}
                            />
                            <div className="absolute inset-0 border-4 border-dashed border-black/10 rounded-3xl pointer-events-none" />
                        </div>
                        <div className="text-center mt-6">
                            <p className="text-white font-bold text-lg mb-1">امسح الكود</p>
                            <p className="text-primary text-sm">لبدء التجربة على جوالك</p>
                        </div>
                    </motion.div>
                </div>

                {/* Back Button */}
                <Link href={`/products/${product.slug}`} className="absolute top-10 right-10 flex items-center gap-3 text-white/50 hover:text-white transition-colors group">
                    <span className="text-lg font-bold">العودة للمنتج</span>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-white transition-colors">
                        <span className="material-symbols-outlined">arrow_forward</span>
                    </div>
                </Link>
            </main>
        );
    }

    // MOBILE VIEW
    return (
        <main className="min-h-screen bg-black relative overflow-hidden text-right" dir="rtl">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/10 via-black to-black" />

            {/* Header */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="fixed top-0 left-0 right-0 z-30 p-6 flex items-center justify-between pointer-events-none"
            >
                <Link
                    href={`/products/${product.slug}`}
                    className="w-12 h-12 bg-black/40 backdrop-blur-md rounded-full border border-white/10 flex items-center justify-center text-white pointer-events-auto active:scale-90 transition-transform"
                >
                    <span className="material-symbols-outlined">close</span>
                </Link>

                <div className="bg-black/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/10 pointer-events-auto">
                    <h1 className="text-sm font-bold text-white">{product.name}</h1>
                </div>
            </motion.header>

            {/* 3D Viewer */}
            <div className="absolute inset-0 z-10">
                {/* @ts-ignore */}
                <model-viewer
                    src={getImageUrl(modelPath)}
                    ios-src=""
                    alt={product.name}
                    shadow-intensity="1"
                    camera-controls
                    auto-rotate
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-orbit="45deg 55deg 2.5m"
                    min-camera-orbit="auto auto auto"
                    max-camera-orbit="auto auto auto"
                    interaction-prompt="auto"
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: "transparent",
                        "--poster-color": "transparent"
                    } as any}
                >
                    {/* Custom AR Button */}
                    <button
                        slot="ar-button"
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-sm glass-gaming border border-primary/50 bg-primary/20 text-white py-4 rounded-2xl font-black text-lg shadow-[0_0_30px_rgba(255,255,255,0.2)] flex items-center justify-center gap-3 backdrop-blur-xl transition-all active:scale-95 animate-bounce-subtle z-40 overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000" />
                        <span className="material-symbols-outlined">view_in_ar</span>
                        شاهد في غرفتك
                    </button>

                    {/* Loading State Slot */}
                    <div slot="poster" className="absolute inset-0 flex items-center justify-center bg-black">
                        <div className="flex flex-col items-center gap-6">
                            <div className="relative">
                                <span className="material-symbols-outlined text-[80px] text-primary animate-spin-slow opacity-20 absolute inset-0 blur-lg">view_in_ar</span>
                                <span className="material-symbols-outlined text-[80px] text-primary animate-spin-slow relative z-10">view_in_ar</span>
                            </div>
                            <p className="text-white/50 text-sm font-bold tracking-[0.2em] animate-pulse">LOADING 3D MODEL</p>
                        </div>
                    </div>
                </model-viewer>
            </div>

            {/* Hint Overlay (fades out) */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1 }}
                className="absolute bottom-32 left-0 right-0 z-20 flex justify-center pointer-events-none px-6"
            >
                <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/5 text-center">
                    <p className="text-white/70 text-xs font-medium">حرك إصبعك لتدوير المنتج • بإصبعين للتكبير</p>
                </div>
            </motion.div>
        </main>
    );
}

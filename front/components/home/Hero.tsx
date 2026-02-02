"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Hero = () => {
    return (
        <section className="relative w-full overflow-hidden bg-surface min-h-[500px] md:min-h-[700px] flex items-center shadow-2xl border-b border-white/10 group mt-[120px] md:mt-[140px]">
            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{
                        backgroundImage: 'url("/hero-bg.jpeg")',
                        filter: 'brightness(0.7) contrast(1.1)'
                    }}
                />
                {/* Gradient Overlays for text readability */}
                <div className="absolute inset-0 bg-gradient-to-l from-dark-bg via-dark-bg/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(0,242,255,0.15),transparent_60%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(176,38,255,0.15),transparent_60%)]" />
            </div>

            {/* Content Layer */}
            <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 md:pe-16 md:ps-12 flex flex-col items-center md:items-start gap-5 md:gap-6 text-center md:text-right py-10 md:py-0">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md border border-accent/50 text-accent text-xs md:text-sm font-bold rounded-full"
                >
                    <span className="material-symbols-outlined text-sm">view_in_ar</span>
                    عرض في الواقع المعزز (AR)
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tight drop-shadow-lg"
                >
                    <span className="block md:inline">مستوى جديد من</span>
                    <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-accent text-glow">
                        الراحة والأداء
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-gray-300 text-base md:text-xl font-medium max-w-[600px] leading-relaxed px-4 md:px-0"
                >
                    انغمس في اللعبة مع تشكيلتنا الحصرية من مكاتب وكراسي الألعاب المصممة للمحترفين. تصميم مريح، إضاءة RGB، ومتانة فائقة.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 w-full sm:w-auto px-4 md:px-0"
                >
                    <Link
                        href="/products"
                        className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white text-base font-bold h-14 px-8 rounded-xl shadow-[0_0_30px_rgba(176,38,255,0.4)] hover:shadow-[0_0_40px_rgba(0,242,255,0.4)] transition-all transform hover:-translate-y-1 border border-white/10 flex items-center justify-center gap-2 group"
                    >
                        <span>تسوق المجموعة</span>
                        <span className="material-symbols-outlined rtl:rotate-180 group-hover:translate-x-[-5px] transition-transform">arrow_forward</span>
                    </Link>
                    <button className="bg-surface/50 hover:bg-surface/80 backdrop-blur-md text-white text-base font-bold h-14 px-8 rounded-xl border border-white/20 hover:border-accent transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-accent">play_circle</span>
                        شاهد الفيديو
                    </button>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;

"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CURRENCY } from "@/lib/constants";

const PromoBanner = () => {
    return (
        <section className="py-12 relative overflow-hidden">
            <Container>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full rounded-3xl bg-gradient-to-r from-purple-900 to-indigo-900 overflow-hidden flex flex-col md:flex-row items-center justify-between p-8 md:p-12 relative border border-white/10 shadow-neon"
                >
                    {/* Background Accents */}
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    {/* Left: Text Content */}
                    <div className="relative z-10 flex flex-col items-start gap-6 max-w-2xl text-right">
                        <div className="inline-block px-4 py-1 bg-white/10 rounded-full border border-white/20 text-accent font-bold text-sm">عرض محدود</div>
                        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">حزمة السيت أب <span className="text-accent">الاحترافي</span></h2>
                        <p className="text-gray-200 text-lg leading-relaxed max-w-xl">
                            احصل على خصم 20% عند شراء مكتب RGB وكرسي احترافي معاً. جهز غرفتك بالكامل بأقل سعر.
                        </p>
                        <button className="mt-4 bg-white text-indigo-900 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all hover:scale-105 shadow-lg">
                            استعرض الحزمة
                        </button>
                    </div>

                    {/* Right: Floating Visual */}
                    <div className="relative z-10 mt-12 md:mt-0 w-full md:w-1/3 flex justify-center">
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="relative w-64 h-64"
                        >
                            <div className="absolute inset-0 bg-primary/30 rounded-full blur-2xl animate-pulse"></div>
                            <div className="relative w-full h-full bg-black/40 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/20 shadow-2xl rotate-6 hover:rotate-0 transition-all duration-500 group">
                                <div className="text-center group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[60px] text-accent mb-2">sports_esports</span>
                                    <div className="text-white">
                                        <span className="block text-sm font-medium text-gray-300">وفر حتى</span>
                                        <span className="block text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400">500</span>
                                        <span className="block text-xl font-bold text-accent">{CURRENCY.SYMBOL}</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </Container>
        </section>
    );
};

export default PromoBanner;

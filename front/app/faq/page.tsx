"use client";

import Container from "@/components/ui/Container";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_FAQS = gql`
    query GetFaqs($isActive: Boolean) {
        faqs(isActive: $isActive) {
            items {
                id
                question
                answer
                order
            }
        }
    }
`;

const FAQPage = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);
    const [searchTerm, setSearchTerm] = useState("");

    const { data, loading, error } = useQuery(GET_FAQS, {
        variables: { isActive: true }
    });

    const faqs = (data?.faqs?.items || []).filter((faq: any) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <main className="min-h-screen bg-dark-bg text-white relative overflow-hidden" dir="rtl">
            <AnimatedBackground />

            <section className="pt-40 pb-32 relative">
                <Container>
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-16 space-y-4">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-block px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent text-sm font-bold uppercase"
                            >
                                مركز المساعدة
                            </motion.div>
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-4xl md:text-5xl font-black"
                            >
                                الأسئلة <span className="text-primary">الشائعة</span>
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="text-gray-400 font-medium"
                            >
                                هل لديك استفسار؟ ابحث عن إجابتك هنا أو تواصل معنا مباشرة.
                            </motion.p>
                        </div>

                        {/* Search Bar */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="relative mb-12"
                        >
                            <input
                                className="w-full bg-surface/50 backdrop-blur-md border border-white/10 rounded-2xl p-5 pr-14 text-right outline-none focus:border-primary/50 transition-all font-bold"
                                placeholder="ابحث عن سؤالك..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">search</span>
                        </motion.div>

                        {/* FAQ List */}
                        <div className="space-y-4">
                            {loading ? (
                                <div className="text-center py-10">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                                    <p className="text-gray-400">جاري تحميل الأسئلة...</p>
                                </div>
                            ) : error ? (
                                <div className="text-center py-10 bg-red-500/10 rounded-2xl border border-red-500/20">
                                    <p className="text-red-400">عذراً، حدث خطأ أثناء تحميل الأسئلة.</p>
                                </div>
                            ) : faqs.length === 0 ? (
                                <div className="text-center py-10 text-gray-400">
                                    <p>لا توجد أسئلة شائعة متاحة حالياً.</p>
                                </div>
                            ) : (
                                faqs.map((faq: any, index: number) => (
                                    <motion.div
                                        key={faq.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 + 0.3 }}
                                        className={cn(
                                            "rounded-2xl border transition-all duration-300",
                                            activeIndex === index
                                                ? "bg-primary/5 border-primary/30"
                                                : "bg-surface border-white/5 hover:border-white/20"
                                        )}
                                    >
                                        <button
                                            onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                            className="w-full p-6 flex items-center justify-between text-right gap-4"
                                        >
                                            <span className={cn(
                                                "text-lg font-bold transition-colors",
                                                activeIndex === index ? "text-primary" : "text-white"
                                            )}>
                                                {faq.question}
                                            </span>
                                            <div className={cn(
                                                "size-8 rounded-full border flex items-center justify-center transition-all",
                                                activeIndex === index
                                                    ? "bg-primary border-primary text-white rotate-180"
                                                    : "border-white/10 text-gray-400"
                                            )}>
                                                <span className="material-symbols-outlined text-[20px]">expand_more</span>
                                            </div>
                                        </button>

                                        <AnimatePresence>
                                            {activeIndex === index && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: "auto", opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <div className="px-6 pb-6 pt-2 text-gray-400 leading-relaxed font-medium">
                                                        {faq.answer}
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Still have questions? */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-br from-primary/10 to-accent/10 border border-white/10 text-center"
                        >
                            <h3 className="text-2xl font-black text-white mb-4">هل لا تزال لديك أسئلة؟</h3>
                            <p className="text-gray-400 mb-8 font-medium">فريق خدمة العملاء متواجد لمساعدتك في أي وقت.</p>
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                <a href="https://wa.me/..." className="w-full sm:w-auto px-10 py-4 bg-green-500 hover:bg-green-600 text-white font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">chat</span>
                                    واتساب
                                </a>
                                <a href="mailto:..." className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-gray-100 font-black rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined">mail</span>
                                    البريد الإلكتروني
                                </a>
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

        </main>
    );
};

// Helper for class names since utils/cn might not be imported if I'm not careful
const cn = (...classes: any[]) => classes.filter(Boolean).join(" ");

export default FAQPage;

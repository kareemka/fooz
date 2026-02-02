"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setStatus('success');
        setFormData({ name: "", email: "", subject: "", message: "" });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    return (
        <main className="min-h-screen bg-gaming-grid selection:bg-primary/30">
            <section className="pt-32 pb-24 relative" dir="rtl">
                {/* Background Decor */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

                <Container>
                    <div className="text-center mb-16 relative z-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-block mb-4 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300 backdrop-blur-sm"
                        >
                            👋 تواصل معنا
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-5xl md:text-7xl font-black text-white mb-6"
                        >
                            نحن هنا <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">لمساعدتك</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed"
                        >
                            سواء كان لديك سؤال حول منتجاتنا، أو تحتاج إلى مساعدة في طلبك، أو تريد فقط أن تقول مرحبًا، نحن هنا للاستماع إليك.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                        {/* Information Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="lg:col-span-4 space-y-6"
                        >
                            <div className="glass p-8 rounded-3xl border border-white/5 hover:border-primary/30 transition-colors group">
                                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[32px]">mail</span>
                                </div>
                                <h3 className="text-white font-bold text-xl mb-2">البريد الإلكتروني</h3>
                                <p className="text-gray-400 mb-4 text-sm">فريقنا الودود موجود هنا للمساعدة.</p>
                                <a href="mailto:support@foozgaming.com" className="text-primary font-mono hover:text-white transition-colors dir-ltr block text-right">support@foozgaming.com</a>
                            </div>

                            <div className="glass p-8 rounded-3xl border border-white/5 hover:border-secondary/30 transition-colors group">
                                <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[32px]">phone</span>
                                </div>
                                <h3 className="text-white font-bold text-xl mb-2">رقم الهاتف</h3>
                                <p className="text-gray-400 mb-4 text-sm">من الاثنين إلى الجمعة ، من 9 صباحًا حتى 6 مساءً.</p>
                                <a href="tel:+966500000000" className="text-secondary font-mono hover:text-white transition-colors dir-ltr block text-right">+966 50 000 0000</a>
                            </div>

                            <div className="glass p-8 rounded-3xl border border-white/5 hover:border-accent/30 transition-colors group">
                                <div className="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <span className="material-symbols-outlined text-[32px]">location_on</span>
                                </div>
                                <h3 className="text-white font-bold text-xl mb-2">الموقع</h3>
                                <p className="text-gray-400 text-sm">الرياض، المملكة العربية السعودية</p>
                            </div>
                        </motion.div>

                        {/* Contact Form */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 }}
                            className="lg:col-span-8"
                        >
                            <div className="glass p-8 md:p-10 rounded-3xl border border-white/5 relative overflow-hidden">
                                {status === 'success' ? (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="text-center py-20"
                                    >
                                        <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                            <span className="material-symbols-outlined text-[48px]">check_circle</span>
                                        </div>
                                        <h3 className="text-3xl font-black text-white mb-4">تم الإرسال بنجاح!</h3>
                                        <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                                            شكرًا لتواصلك معنا. استلمنا رسالتك وسنقوم بالرد عليك في أقرب وقت ممكن.
                                        </p>
                                        <Button onClick={() => setStatus('idle')} variant="outline">
                                            إرسال رسالة أخرى
                                        </Button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6 text-right relative z-10">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">الاسم الكامل</label>
                                                <input
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    required
                                                    type="text"
                                                    placeholder="أدخل اسمك"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-medium text-gray-300">البريد الإلكتروني</label>
                                                <input
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    required
                                                    type="email"
                                                    placeholder="example@gmail.com"
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all font-sans"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">الموضوع</label>
                                            <input
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                required
                                                type="text"
                                                placeholder="كيف يمكننا مساعدتك؟"
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-gray-300">الرسالة</label>
                                            <textarea
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                rows={6}
                                                placeholder="اكتب رسالتك هنا..."
                                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:bg-white/10 transition-all resize-none"
                                            ></textarea>
                                        </div>
                                        <Button disabled={status === 'loading'} className="w-full py-4 text-lg gap-3 shadow-lg shadow-primary/20">
                                            {status === 'loading' ? (
                                                <>
                                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                    جاري الإرسال...
                                                </>
                                            ) : (
                                                <>
                                                    <span className="material-symbols-outlined text-[20px]">send</span>
                                                    إرسال الرسالة
                                                </>
                                            )}
                                        </Button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </Container>
            </section>

        </main>
    );
};

export default ContactPage;

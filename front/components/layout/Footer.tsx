"use client";

import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const Footer = () => {
    return (
        <footer className="bg-card-bg border-t border-white/10 pt-16 pb-8 relative z-10" dir="rtl">
            <div className="max-w-[1400px] mx-auto px-4 md:px-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
                    {/* Branding */}
                    <div className="flex flex-col gap-6 items-start">
                        <Link href="/" className="block">
                            <Image
                                src="/fooz-logo.png"
                                alt="FOOZ Gaming Logo"
                                width={160}
                                height={60}
                                className="h-14 w-auto object-contain drop-shadow-[0_0_10px_rgba(176,38,255,0.3)]"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            وجهتك الأولى لكل ما يتعلق بعالم الجيمنج. نوفر لك أفضل المعدات، الكراسي، والمكاتب لتجربة لعب لا مثيل لها.
                        </p>
                        <div className="flex gap-4 mt-2">
                            <a className="size-10 rounded-full bg-surface flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all hover:scale-110" href="#"><span className="material-symbols-outlined text-[20px]">public</span></a>
                            <a className="size-10 rounded-full bg-surface flex items-center justify-center text-gray-400 hover:text-white hover:bg-secondary transition-all hover:scale-110" href="#"><span className="material-symbols-outlined text-[20px]">alternate_email</span></a>
                            <a className="size-10 rounded-full bg-surface flex items-center justify-center text-gray-400 hover:text-white hover:bg-primary transition-all hover:scale-110" href="#"><span className="material-symbols-outlined text-[20px]">forum</span></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col gap-6 items-start">
                        <h3 className="text-white font-bold text-lg border-b border-primary/30 pb-2 inline-block w-fit">روابط سريعة</h3>
                        <div className="flex flex-col gap-3">
                            <Link className="text-gray-400 text-sm hover:text-accent transition-colors flex items-center gap-2 group" href="/about">
                                <span className="size-1.5 bg-primary rounded-full group-hover:w-3 transition-all"></span>
                                <span className="group-hover:translate-x-1 transition-transform">من نحن</span>
                            </Link>
                            <Link className="text-gray-400 text-sm hover:text-accent transition-colors flex items-center gap-2 group" href="/faq">
                                <span className="size-1.5 bg-primary rounded-full group-hover:w-3 transition-all"></span>
                                <span className="group-hover:translate-x-1 transition-transform">الأسئلة الشائعة</span>
                            </Link>
                            <a className="text-gray-400 text-sm hover:text-accent transition-colors flex items-center gap-2 group" href="#">
                                <span className="size-1.5 bg-primary rounded-full group-hover:w-3 transition-all"></span>
                                <span className="group-hover:translate-x-1 transition-transform">برنامج الولاء</span>
                            </a>
                            <a className="text-gray-400 text-sm hover:text-accent transition-colors flex items-center gap-2 group" href="#">
                                <span className="size-1.5 bg-primary rounded-full group-hover:w-3 transition-all"></span>
                                <span className="group-hover:translate-x-1 transition-transform">سياسة الضمان</span>
                            </a>
                        </div>
                    </div>

                    {/* Gear */}
                    <div className="flex flex-col gap-6 items-start">
                        <h3 className="text-white font-bold text-lg border-b border-accent/30 pb-2 inline-block w-fit">العتاد</h3>
                        <div className="flex flex-col gap-3">
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="size-1.5 bg-accent rounded-full group-hover:w-3 transition-all"></span><span className="group-hover:translate-x-1 transition-transform">الكراسي الاحترافية</span></a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="size-1.5 bg-accent rounded-full group-hover:w-3 transition-all"></span><span className="group-hover:translate-x-1 transition-transform">مكاتب الجيمنج</span></a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="size-1.5 bg-accent rounded-full group-hover:w-3 transition-all"></span><span className="group-hover:translate-x-1 transition-transform">الإكسسوارات</span></a>
                            <a className="text-gray-400 text-sm hover:text-primary transition-colors flex items-center gap-2 group" href="#"><span className="size-1.5 bg-accent rounded-full group-hover:w-3 transition-all"></span><span className="group-hover:translate-x-1 transition-transform">الإضاءة والديكور</span></a>
                        </div>
                    </div>

                    {/* Join Us */}
                    <div className="flex flex-col gap-6 items-start">
                        <h3 className="text-white font-bold text-lg">انضم للنخبة</h3>
                        <p className="text-gray-400 text-sm">كن أول من يحصل على العروض الحصرية وتحديثات المنتجات الجديدة.</p>
                        <form className="flex flex-col gap-3 w-full">
                            <input className="w-full bg-surface border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-primary transition-all" placeholder="البريد الإلكتروني" type="email" />
                            <button className="bg-gradient-to-r from-primary to-primary-dark hover:from-accent hover:to-cyan-600 text-white text-sm font-bold px-4 py-3 rounded-lg transition-all shadow-lg">
                                اشتراك الآن
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">© 2024 عالم الألعاب. جميع الحقوق محفوظة.</p>
                    <div className="flex items-center gap-4 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                        <span className="text-xs font-bold text-gray-400 border border-gray-600 rounded px-2 py-1 uppercase tracking-wider">VISA</span>
                        <span className="text-xs font-bold text-gray-400 border border-gray-600 rounded px-2 py-1 uppercase tracking-wider">Mastercard</span>
                        <span className="text-xs font-bold text-gray-400 border border-gray-600 rounded px-2 py-1 uppercase tracking-wider">Mada</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
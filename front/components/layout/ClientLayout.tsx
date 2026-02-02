"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { ApolloWrapper } from "@/lib/apollo-wrapper";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
    children,
    cairoVariable,
}: {
    children: React.ReactNode;
    cairoVariable: string;
}) {
    useEffect(() => {
        // Detect if device is mobile/touch
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

        // Only enable Lenis on desktop (non-touch devices)
        if (!isMobile && !hasTouch) {
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical',
                gestureOrientation: 'vertical',
                smoothWheel: true,
                wheelMultiplier: 1,
                touchMultiplier: 2,
                infinite: false,
            });

            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            // Mouse glow global handler (desktop only)
            const handleMouseMove = (e: MouseEvent) => {
                document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
                document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
            };

            window.addEventListener('mousemove', handleMouseMove);

            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                lenis.destroy();
            };
        }
    }, []);

    return (
        <body className={`${cairoVariable} font-sans antialiased text-white mouse-glow bg-background`}>
            <AnimatedBackground />
            <div className="relative z-10">
                <ApolloWrapper>
                    <Navbar />
                    {children}
                    <Footer />
                </ApolloWrapper>
            </div>
        </body>
    );
}

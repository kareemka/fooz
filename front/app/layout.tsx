import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import ClientLayout from "@/components/layout/ClientLayout";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Fooz Gaming | أثاث ألعاب مستقبلي",
  description: "حول غرفتك إلى ساحة ألعاب مستقبلية مع أثاث Fooz Gaming",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
      </head>
      <ClientLayout cairoVariable={cairo.variable}>
        {children}
      </ClientLayout>
    </html>
  );
}

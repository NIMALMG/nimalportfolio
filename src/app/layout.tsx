import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Preloader from "@/components/ui/Preloader";

export const metadata: Metadata = {
  title: "Nimal | Freelance Web Developer",
  description: "I build premium websites that help businesses grow and attract more customers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="font-sans antialiased bg-[#fbfbfb] text-gray-900 transition-colors duration-500 selection:bg-var(--accentColor) selection:text-white overflow-x-hidden">
        <Preloader />
        <SmoothScroll>
          <Header />
          <main className="relative">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}

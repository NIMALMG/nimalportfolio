import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Preloader from "@/components/ui/Preloader";
import CustomCursor from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

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
    <html
      lang="en"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="font-sans bg-black text-white selection:bg-blue-600 selection:text-white md:cursor-none">
        <Preloader />
        <CustomCursor />
        <SmoothScroll>
          <Header />
          <main className="relative min-h-screen">
            {children}
          </main>
        </SmoothScroll>
      </body>
    </html>
  );
}

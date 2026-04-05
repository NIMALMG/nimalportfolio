import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Header from "@/components/layout/Header";
import Preloader from "@/components/ui/Preloader";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#fbfbfb",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://nimal-portfolio.vercel.app'), // Replace with actual domain
  title: "Nimal | Freelance Web Developer & UI Designer",
  description: "I build premium, high-converting websites that help businesses grow. Specializing in Next.js, immersive GSAP animations, and Awwwards-tier frontend engineering.",
  keywords: ["Freelance Web Developer", "Frontend Engineer", "Next.js", "GSAP Animations", "React Developer", "Awwwards Level Design", "UI/UX Designer"],
  authors: [{ name: "Nimal" }],
  creator: "Nimal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nimal-portfolio.vercel.app",
    siteName: "Nimal Portfolio",
    title: "Nimal | Premium Web Engineering",
    description: "I build premium, high-converting websites that help businesses grow. Specializing in Next.js, immersive GSAP animations, and Awwwards-tier frontend engineering.",
    images: [
      {
        url: "https://i.imgur.com/your-placeholder-og-image.jpg", // REPLACE WITH REAL OG IMAGE
        width: 1200,
        height: 630,
        alt: "Nimal Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nimal | Premium Web Engineering",
    description: "I build premium, high-converting websites that help businesses grow. Specializing in Next.js, immersive GSAP animations, and Awwwards-tier frontend engineering.",
    images: ["https://i.imgur.com/your-placeholder-og-image.jpg"], // REPLACE WITH REAL OG IMAGE
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Palette, BarChart, MonitorSmartphone } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: "Premium Web Design",
    description: "I craft beautiful, modern, and user-centric interfaces tailored to your brand identity, guaranteeing an Awwwards-tier level of interaction.",
    icon: <Palette className="w-8 h-8 text-gray-900" />,
  },
  {
    title: "Next.js Development",
    description: "Transform your old, outdated site into a highly-converting modern masterpiece leveraging the latest React frameworks.",
    icon: <MonitorSmartphone className="w-8 h-8 text-gray-900" />,
  },
  {
    title: "SEO Optimization",
    description: "I ensure your site loads blazingly fast, cracking top-tier Lighthouse scores to radically boost SEO and skyrocket customer retention.",
    icon: <BarChart className="w-8 h-8 text-gray-900" />,
  },
];

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title Entrance
      gsap.fromTo(
        ".services-heading",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play pause resume reverse"
          },
        }
      );

      // 2. SVG Swoosh Drawing Animation
      gsap.fromTo(
        ".svg-swoosh",
        { strokeDasharray: "400", strokeDashoffset: "400" },
        {
          strokeDashoffset: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.5,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            toggleActions: "play pause resume reverse"
          }
        }
      );

      // 3. Staggered Minimal Cards
      gsap.fromTo(
        cardsRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: ".services-grid",
            start: "top 85%",
            toggleActions: "play pause resume reverse"
          }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="w-full bg-white py-20 md:py-32 lg:py-48 relative z-10 overflow-hidden">
      
      {/* Minimal Background Layer */}
      <div className="absolute inset-0 z-0 bg-[#fbfbfb] pointer-events-none opacity-50"></div>

      <div className="section-wrapper relative z-10 flex flex-col items-center">
        
        {/* Massive Screenshot-matched Hero Header */}
        <div className="services-heading text-center mb-24 max-w-5xl mx-auto px-4 flex flex-col items-center">
          <h2 className="text-[2.5rem] sm:text-6xl md:text-7xl lg:text-[5.5rem] font-sans font-semibold text-gray-900 tracking-tight leading-[1.1] mb-8">
            We build websites that <br className="hidden md:block"/>
            <span className="relative inline-block pb-2 outline-none">
              grow your business
              {/* Green SVG Swoosh strictly matching screenshot */}
              <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full text-emerald-400 h-4 md:h-6 pointer-events-none" viewBox="0 0 400 20" fill="none" preserveAspectRatio="none">
                <path d="M5 15Q 200 0 395 15" stroke="currentColor" strokeWidth="8" strokeLinecap="round" className="svg-swoosh"/>
              </svg>
            </span>
          </h2>
          
          <p className="text-gray-500 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-4xl mb-12">
            Premium web design, Next.js development, and SEO optimization. We deliver stunning, high-performing websites tailored to scale your brand.
          </p>
          
          {/* Black Glow CTA Button */}
          <a href="#contact" className="group relative overflow-hidden rounded-full bg-gray-900 px-10 py-5 text-white shadow-xl shadow-gray-900/20 hover-lift font-medium flex items-center justify-center gap-3 transition-all" style={{ color: "#ffffff" }}>
            <span className="relative z-10 flex items-center text-white gap-3">
              <svg className="w-5 h-5 text-gray-300 group-hover:rotate-12 transition-transform drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              Book a Call
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Muted Minimal Services Grid */}
        <div className="services-grid w-full grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl px-4">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="group relative flex flex-col p-10 bg-white border border-gray-100 rounded-[2rem] hover:shadow-xl hover:shadow-gray-100 transition-all duration-500 overflow-hidden"
            >
              {/* Minimal Top Icon */}
              <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                {service.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
              <p className="text-gray-500 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

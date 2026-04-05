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
    icon: <Palette className="w-10 h-10 text-white" />,
    lightColor: "from-blue-500/20 to-transparent",
    borderColor: "group-hover:border-blue-500/50"
  },
  {
    title: "Full Website Redesign",
    description: "Transform your old, outdated site into a highly-converting modern masterpiece leveraging the latest React & GSAP frameworks.",
    icon: <MonitorSmartphone className="w-10 h-10 text-white" />,
    lightColor: "from-purple-500/20 to-transparent",
    borderColor: "group-hover:border-purple-500/50"
  },
  {
    title: "Performance Optimization",
    description: "I ensure your site loads blazingly fast, cracking top-tier Lighthouse scores to radically boost SEO and skyrocket customer retention.",
    icon: <BarChart className="w-10 h-10 text-white" />,
    lightColor: "from-green-500/20 to-transparent",
    borderColor: "group-hover:border-green-500/50"
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
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );

      // 2. Heavy Stagger Cards Entrance
      gsap.fromTo(
        cardsRef.current,
        { y: 150, opacity: 0, rotateX: 15, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 1.5,
          stagger: 0.2, // Smooth delay entry
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 65%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" className="relative py-32 px-6 md:px-12 bg-[#050505] overflow-hidden" ref={containerRef}>
      
      {/* Background Deep Glows */}
      <div className="absolute top-0 right-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -translate-y-1/2 translate-x-1/4" />
      <div className="absolute bottom-0 left-0 w-[80vw] h-[80vw] md:w-[40vw] md:h-[40vw] bg-purple-600/5 rounded-full blur-[150px] pointer-events-none translate-y-1/2 -translate-x-1/4" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        
        {/* Updated Heading */}
        <div className="services-heading text-center mb-24 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/5 bg-white/5 backdrop-blur-md mb-6">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gray-300 uppercase">
              What I Offer
            </span>
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-white drop-shadow-lg tracking-wide">
            Elevating Your Brand
          </h2>
          <p className="mt-6 text-gray-400 font-light text-lg md:text-xl max-w-2xl text-center leading-relaxed">
            Delivering high-performance, agency-grade digital experiences tailored to dominate your market.
          </p>
        </div>

        {/* Large Premium Cards Layout */}
        <div className="w-full flex flex-col gap-6 lg:gap-10 perspective-1000">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              // Minimal massive row layout as requested for pure premium depth
              className={`group relative w-full flex flex-col md:flex-row items-center p-8 md:p-12 rounded-[2rem] bg-[#0a0a0a] border border-white/5 hover:bg-[#0c0c0c] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-4 hover:shadow-[0_20px_60px_rgba(37,99,235,0.05)] cursor-none overflow-hidden ${service.borderColor}`}
            >
              
              {/* Internal Dynamic Reveal Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.lightColor} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

              {/* Light Sweep Effect */}
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:animate-[sweep_1.5s_ease-out_1]" />

              <div className="w-full md:w-1/3 flex items-center justify-center md:justify-start mb-8 md:mb-0 relative z-10">
                <div className="w-24 h-24 rounded-3xl bg-[#111] border border-white/10 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:rotate-[15deg] transition-all duration-700 ease-out">
                  {service.icon}
                </div>
              </div>

              <div className="w-full md:w-2/3 flex flex-col items-center md:items-start text-center md:text-left relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold font-serif text-white mb-4 group-hover:text-blue-400 transition-colors duration-500">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                  {service.description}
                </p>
              </div>

              {/* Minimal Decorative Corner Crosses indicative of premium agency aesthetics */}
              <div className="absolute top-6 right-6 text-white/5 group-hover:text-white/20 transition-colors duration-500">+</div>
              <div className="absolute bottom-6 left-6 text-white/5 group-hover:text-white/20 transition-colors duration-500">+</div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
    </section>
  );
}

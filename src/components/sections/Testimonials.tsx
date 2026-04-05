"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const testimonials = [
  {
    quote: "Nimal didn't just build a website, he completely transformed our digital presence. The attention to detail and Awwwards-level animations increased our conversion rate by 300%.",
    name: "Sarah Jenkins",
    role: "CEO at TechFlow"
  },
  {
    quote: "Working with Nimal was an absolute game-changer. His Next.js architecture is blazingly fast, and the minimal, premium design exactly captures our brand aesthetic.",
    name: "Mark Thompson",
    role: "Founder at ScaleUp"
  },
  {
    quote: "The best frontend developer we've ever partnered with. Flawless execution, seamless GSAP scroll interactions, and a true eye for top-tier digital luxury.",
    name: "Elena Rodriguez",
    role: "Marketing Director"
  }
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Entrance Animation for the Header
      gsap.fromTo(
        ".testimonial-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play pause resume reverse"
          }
        }
      );

      // Advanced MatchMedia Responsiveness
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop: Horizontal Scroll Pinning (Advanced Agency Animation)
        const scrollWidth = scrollContainerRef.current ? scrollContainerRef.current.scrollWidth - window.innerWidth : 0;
        
        if (scrollWidth > 0) {
          gsap.to(scrollContainerRef.current, {
            x: -scrollWidth,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: `+=${scrollWidth}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1
            }
          });

          // Staggered Card Reveals tied to the scrub
          cardsRef.current.forEach((card, i) => {
            if (!card) return;
            gsap.fromTo(
              card,
              { opacity: 0.2, scale: 0.9, filter: "blur(4px)" },
              {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                ease: "power2.out",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: gsap.getById("horizontal-scroll"), 
                  start: "left center+=20%",
                  end: "left center-=20%",
                  scrub: true,
                }
              }
            );
          });
        }
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile: Vertical stack entrance 
        gsap.to(scrollContainerRef.current, { x: 0 }); // reset potential resize overrides
        gsap.fromTo(
          cardsRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: scrollContainerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="testimonials" 
      ref={sectionRef} 
      className="w-full bg-[#fbfbfb] py-20 md:py-32 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 mb-16 md:mb-24 testimonial-header">
        <h3 className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase mb-4">Client Feedback</h3>
        <h2 className="text-4xl md:text-6xl font-serif font-black text-gray-900 tracking-tight">
          Don't just take my <br className="hidden md:block"/>
          <span className="italic text-gray-500">word for it.</span>
        </h2>
      </div>

      {/* 
        Horizontal Scroll Track 
        On mobile: vertical flex col. On Desktop: horizontal flex wrapper forced beyond screen width.
      */}
      <div className="w-full overflow-hidden">
        <div 
          ref={scrollContainerRef}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-16 px-4 md:px-[10vw] w-fit"
          id="horizontal-scroll"
        >
          {testimonials.map((test, index) => (
            <div 
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="w-full md:w-[600px] lg:w-[800px] flex-shrink-0 flex flex-col p-8 md:p-14 bg-white border border-gray-100 shadow-xl shadow-gray-200/40 rounded-[2.5rem] relative"
            >
              {/* Giant Quote Highlight */}
              <div className="absolute top-8 left-8 text-8xl text-gray-100 font-serif leading-none select-none pointer-events-none">
                "
              </div>
              
              <p className="text-2xl md:text-4xl font-light text-gray-800 leading-[1.4] mb-12 relative z-10 mx-4 md:mx-6 mt-6">
                {test.quote}
              </p>
              
              <div className="mt-auto flex items-center gap-4 mx-4 md:mx-6">
                <div className="w-14 h-14 rounded-full bg-gray-900 flex items-center justify-center text-white font-bold text-xl">
                  {test.name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-gray-900 text-lg">{test.name}</span>
                  <span className="text-gray-500 text-sm tracking-wide">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

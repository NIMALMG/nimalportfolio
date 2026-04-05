"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const phrases = textRef.current?.querySelectorAll(".phrase-line") || [];
      
      gsap.fromTo(
        phrases,
        { y: 100, opacity: 0, rotateX: -10 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.15,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play pause resume reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="w-full bg-[#fbfbfb] py-32 lg:py-48 relative border-t border-gray-100">
      <div className="section-wrapper relative z-10 flex flex-col md:flex-row items-start justify-between gap-12">
        
        {/* Left Side Label */}
        <div className="w-full md:w-1/4">
          <div className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-var(--accentColor)"></span>
            <span className="text-sm font-semibold tracking-[0.2em] text-gray-400 uppercase">About Me</span>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-3/4 max-w-4xl" ref={textRef}>
          <div className="overflow-hidden mb-6">
            <h3 className="phrase-line text-4xl md:text-5xl lg:text-7xl font-serif text-gray-900 font-medium leading-[1.2] tracking-tight">
              I am Nimal, a creative developer
            </h3>
          </div>
          <div className="overflow-hidden mb-6">
            <h3 className="phrase-line text-4xl md:text-5xl lg:text-7xl font-serif text-gray-900 font-medium leading-[1.2] tracking-tight">
              specializing in building <span className="text-gradient-accent italic">high-end</span>
            </h3>
          </div>
          <div className="overflow-hidden mb-12">
            <h3 className="phrase-line text-4xl md:text-5xl lg:text-7xl font-serif text-gray-900 font-medium leading-[1.2] tracking-tight">
              websites for ambitious brands.
            </h3>
          </div>
          
          <div className="overflow-hidden max-w-2xl">
            <p className="phrase-line text-lg lg:text-xl text-gray-500 font-light leading-relaxed">
              I blend technical engineering with precise aesthetic direction. My goal is to craft digital experiences that not only look breathtaking but also drive tangible growth through flawless performance and interactive storytelling.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);
  const headingRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── ENTRANCE ANIMATION ──
      const tl = gsap.timeline();
      
      // Staggered text reveal
      tl.fromTo(
        headingRefs.current,
        { y: 80, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }
      );

      // Image reveal
      tl.fromTo(
        ".hero-image-wrapper",
        { scale: 0.9, opacity: 0, filter: "blur(20px)" },
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" },
        "-=0.8"
      );

      // Continuous float animation for the image
      gsap.to(".hero-image-wrapper", {
        y: -15,
        repeat: -1,
        yoyo: true,
        duration: 4,
        ease: "sine.inOut"
      });

      // ── 3D MOUSE TILT ──
      gsap.set(imageInnerRef.current, { rotationX: 0, rotationY: 0 });

      const handleMouseMove = (e: MouseEvent) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate relative pos: -1 to +1
        const relX = (e.clientX - centerX) / centerX;
        const relY = (e.clientY - centerY) / centerY;

        // Apply gentle rotation based on mouse
        gsap.to(imageInnerRef.current, {
          rotationY: relX * 12,
          rotationX: -relY * 12,
          duration: 1,
          ease: "power3.out"
        });

        // Move accent light source
        gsap.to(lightRef.current, {
          x: relX * 100,
          y: relY * 100,
          duration: 1,
          ease: "power3.out"
        });
      };

      const handleMouseEnter = () => {
        gsap.to(imageInnerRef.current, { scale: 1.03, duration: 0.5, ease: "power2.out" });
      };

      const handleMouseLeave = () => {
        gsap.to(imageInnerRef.current, { rotationX: 0, rotationY: 0, scale: 1, duration: 0.5, ease: "power2.out" });
        gsap.to(lightRef.current, { x: 0, y: 0, duration: 0.5 });
      };

      window.addEventListener("mousemove", handleMouseMove);
      
      const imageEl = imageInnerRef.current;
      if (imageEl) {
        imageEl.addEventListener("mouseenter", handleMouseEnter);
        imageEl.addEventListener("mouseleave", handleMouseLeave);
      }

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        if (imageEl) {
          imageEl.removeEventListener("mouseenter", handleMouseEnter);
          imageEl.removeEventListener("mouseleave", handleMouseLeave);
        }
      };
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 overflow-hidden bg-[#fbfbfb]">
      
      {/* Background Soft Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-purple-100 rounded-full blur-[120px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-blue-50 rounded-full blur-[100px] opacity-60 pointer-events-none" />

      <div className="section-wrapper relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* LEFT TEXT */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left z-20">
          <div className="mb-6 overflow-hidden">
            <div ref={(el) => { headingRefs.current[0] = el; }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-100 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-sm font-medium tracking-wide text-gray-600">Available for freelance</span>
            </div>
          </div>
          
          <div className="overflow-hidden mb-4">
            <h1 ref={(el) => { headingRefs.current[1] = el; }} className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1] font-serif">
              I build <span className="text-gradient-accent italic pr-2">premium</span>
            </h1>
          </div>
          <div className="overflow-hidden mb-6">
            <h1 ref={(el) => { headingRefs.current[2] = el; }} className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1] font-serif">
              websites that
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1 ref={(el) => { headingRefs.current[3] = el; }} className="text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-gray-900 leading-[1.1] font-serif">
              grow your business.
            </h1>
          </div>

          <div className="overflow-hidden mb-12">
            <p ref={(el) => { headingRefs.current[4] = el; }} className="text-lg md:text-xl text-gray-500 font-light max-w-lg leading-relaxed">
              Elevating brands with Awwwards-tier design, seamless animations, and high-performance engineering.
            </p>
          </div>

          <div className="overflow-hidden">
            <div ref={(el) => { headingRefs.current[5] = el; }} className="flex flex-wrap items-center gap-4 text-white">
              <a href="#work" className="group relative overflow-hidden rounded-full bg-gray-900 px-8 py-4 text-white hover-lift font-medium" style={{ color: "#ffffff" }}>
                <span className="relative z-10 flex items-center text-white gap-2">
                  View Work
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-var(--accentColor) opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a href="#contact" className="rounded-full px-8 py-4 font-medium text-gray-700 bg-white border border-gray-200 hover:bg-gray-50 hover-lift transition-all">
                Contact Me
              </a>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE (Cropped, 3D floating) */}
        <div className="w-full md:w-1/2 flex justify-center lg:justify-end z-10">
          <div className="hero-image-wrapper relative w-[80%] max-w-[450px] aspect-[4/5] perspective-1000">
            {/* Soft backdrop shadow */}
            <div className="absolute inset-x-10 -bottom-10 h-1/2 bg-purple-300/30 blur-3xl rounded-full"></div>
            
            <div 
              ref={imageInnerRef} 
              className="w-full h-full relative rounded-3xl overflow-hidden glass-panel border border-white/60 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transform-style-3d will-change-transform bg-white/40"
            >
              {/* Inner ambient light follower */}
              <div ref={lightRef} className="absolute inset-0 flex items-center justify-center opacity-30 mix-blend-overlay pointer-events-none z-20">
                <div className="w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_50%)]"></div>
              </div>

              {/* The Image (Cropped) */}
              <div className="absolute inset-0 z-10 w-full h-full transform translate-z-[30px]">
                <Image 
                  src="/profile.png" 
                  alt="Nimal" 
                  fill 
                  className="object-cover object-top filter contrast-[1.05] brightness-105"
                  priority
                  unoptimized
                />
              </div>

              {/* Minimal UI overlay elements for premium tech feel */}
              <div className="absolute top-6 left-6 z-30 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-sm text-xs font-semibold text-gray-800 translate-z-[40px]">
                Creative Developer
              </div>
              <div className="absolute bottom-6 right-6 z-30 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/50 shadow-sm text-xs font-semibold text-gray-800 translate-z-[40px]">
                UI/UX Designer
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const techLogos = [
  {
    name: "Next.js",
    hoverColor: "group-hover:text-[#000000]",
    svg: (
      <svg viewBox="0 0 180 180" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 0C40.2944 0 0 40.2944 0 90C0 139.706 40.2944 180 90 180C139.706 180 180 139.706 180 90C180 40.2944 139.706 0 90 0ZM72.6312 119.516L54.7675 94.6188V53.25H63.6337V88.8225L108.626 151.526C102.724 153.304 96.4444 154.238 90 154.238C54.5156 154.238 25.7625 125.484 25.7625 90C25.7625 54.5156 54.5156 25.7625 90 25.7625C125.484 25.7625 154.238 54.5156 154.238 90C154.238 103.882 149.824 116.741 142.365 127.316L72.6312 30.15V119.516H72.6312Z" />
      </svg>
    )
  },
  {
    name: "React",
    hoverColor: "group-hover:text-[#61DAFB]",
    svg: (
      <svg viewBox="-11.5 -10.23174 23 20.46348" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="currentColor"/>
        <g stroke="currentColor" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2"/>
          <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
          <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
        </g>
      </svg>
    )
  },
  {
    name: "Vercel",
    hoverColor: "group-hover:text-[#000000]",
    svg: (
      <svg viewBox="0 0 256 222" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0l128 221.705H0z"/>
      </svg>
    )
  },
  {
    name: "Tailwind CSS",
    hoverColor: "group-hover:text-[#06B6D4]",
    svg: (
      <svg viewBox="0 0 256 154" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0c-25.6 0-48 16-57.6 48 12.8-16 28.8-22.4 48-19.2 11.233 1.872 19.23 9.99 28.188 19.083C158.4 59.813 172.8 74.4 204.8 74.4c25.6 0 48-16 57.6-48-12.8 16-28.8 22.4-48 19.2-11.233-1.872-19.23-9.99-28.188-19.083C173.187 14.587 158.788 0 128 0zM51.2 76.8C25.6 76.8 3.2 92.8-6.4 124.8c12.8-16 28.8-22.4 48-19.2 11.233 1.872 19.23 9.99 28.188 19.083C81.6 136.613 96 151.2 128 151.2c25.6 0 48-16 57.6-48-12.8 16-28.8 22.4-48 19.2-11.233-1.872-19.23-9.99-28.188-19.083C96.387 91.387 81.988 76.8 51.2 76.8z" />
      </svg>
    )
  },
  {
    name: "TypeScript",
    hoverColor: "group-hover:text-[#3178C6]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0H1.125zM11.91 19.066H9.13v-8.472H6V8.406h8.92v2.188H11.91v8.472zm10.158.07c-1.32.96-3.21 1.487-5.07 1.487-3.194 0-5.46-1.558-5.46-4.604 0-3.328 2.668-4.32 5.084-4.814l1.35-.29c1.68-.363 2.07-.745 2.07-1.442 0-.825-.795-1.393-2.025-1.393-1.29 0-2.28.527-2.61 1.258h-2.58c.45-1.844 2.25-3.313 5.37-3.313 3.03 0 4.8 1.484 4.8 3.974 0 2.922-2.115 3.99-3.96 4.404l-1.635.345c-2.325.51-2.475 1.17-2.475 1.74 0 .973 1.004 1.572 2.58 1.572 1.395 0 2.505-.51 3.12-1.318l2.43 2.375z" />
      </svg>
    )
  },
  {
    name: "Figma",
    hoverColor: "group-hover:text-[#F24E1E]",
    svg: (
      <svg viewBox="0 0 38 57" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
        <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5A9.5 9.5 0 1 1 0 47.5z" />
        <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
        <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
        <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
      </svg>
    )
  },
  {
    name: "Node.js",
    hoverColor: "group-hover:text-[#5FA04E]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
         <path d="M11.83 23h-.04c-.31 0-.61-.17-.76-.43l-9.13-15.6a1 1 0 0 1 0-1L11.03.43c.15-.26.45-.43.76-.43h.04c.31 0 .61.17.76.43l9.13 15.6c.15.26.15.58 0 .84l-9.13 15.7c-.15.26-.45.43-.76.43zm-.54-21L3 16.5 11.23 21 21 16.5 11.29 2z"/>
      </svg>
    )
  },
  {
    name: "Azure",
    hoverColor: "group-hover:text-[#0078D4]",
    svg: (
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.483 21.3H24L14.025 4.013l-3.3 5.72 9.006 11.53H7.727l-2.244 3.9h-.001zM13.212 2.7L0 21.3h4.948L18.423 2.7h-5.21z"/>
      </svg>
    )
  }
];

export default function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Elegant uniform marquee loop without ScrollTrigger for seamless playback
    const marqueeInner = marqueeRef.current;
    if (!marqueeInner) return;

    // Duplicated tech items to span the width, so we move halfway to loop perfectly
    const tween = gsap.to(marqueeInner, {
      xPercent: -50,
      repeat: -1,
      duration: 35, // Slow, elegant luxury agency crawl
      ease: "none"
    });

    const pause = () => tween.pause();
    const play = () => tween.play();

    marqueeInner.addEventListener("mouseenter", pause);
    marqueeInner.addEventListener("mouseleave", play);

    return () => {
      tween.kill();
      marqueeInner.removeEventListener("mouseenter", pause);
      marqueeInner.removeEventListener("mouseleave", play);
    };
  }, []);

  // Duplicate items heavily to absolutely ensure the marquee never runs out of content on ultra-widescreens
  const duplicatedTech = [...techLogos, ...techLogos, ...techLogos, ...techLogos];

  return (
    <section 
      id="techstack" 
      ref={sectionRef} 
      className="w-full bg-white py-16 lg:py-24 relative overflow-hidden flex flex-col justify-center min-h-[300px]"
    >
      
      {/* Subtle Graph Paper Grid Background */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px"
        }}
      />

      <div className="w-full relative z-10 flex flex-col items-center">

        <h3 className="text-sm font-semibold tracking-widest text-gray-400 uppercase mb-16 px-4 text-center">
          Trusted Core Technologies
        </h3>
        
        {/* Infinite Scrolling Marquee */}
        <div className="w-full relative flex items-center h-24">
          
          {/* Left/Right fading edge masks for the sleek dissolve effect */}
          <div className="absolute top-0 left-0 w-24 md:w-48 h-full bg-gradient-to-r from-white to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 right-0 w-24 md:w-48 h-full bg-gradient-to-l from-white to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex w-max" ref={marqueeRef}>
            {duplicatedTech.map((tech, index) => (
              <div
                key={index}
                className="flex items-center justify-center px-10 md:px-16 group"
              >
                {/* 
                  Agency Styling: 
                  Visible text-gray-400 SVG vector by default.
                  On hover, smoothly transitions to its true Brand Color.
                */}
                <div 
                  className={`relative flex items-center justify-center transition-all duration-500 ease-out 
                             text-gray-400 ${tech.hoverColor} group-hover:scale-110 cursor-pointer`}
                  title={tech.name}
                >
                  <div className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center mix-blend-multiply">
                    {tech.svg}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
      
    </section>
  );
}

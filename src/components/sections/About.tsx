"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "top 50%",
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-12 w-full flex justify-center">
      <div
        ref={containerRef}
        className="max-w-4xl mx-auto flex flex-col items-center text-center space-y-6"
      >
        <span className="text-sm font-semibold tracking-[0.2em] text-blue-500 uppercase">
          About Me
        </span>
        <h2
          ref={textRef}
          className="text-3xl md:text-5xl font-outfit text-white font-medium leading-normal md:leading-relaxed"
        >
          I’m Nimal, a freelance developer focused on building <span className="text-gray-400 italic">premium, high-converting</span> websites for businesses.
        </h2>
      </div>
    </section>
  );
}

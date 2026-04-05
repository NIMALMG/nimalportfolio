"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scale and fade up entrance for massive impact
      gsap.fromTo(
        ".contact-reveal",
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.2,
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
    <section id="contact" ref={sectionRef} className="w-full bg-[#fbfbfb] pt-20 pb-32 md:pt-32 md:pb-64 lg:pt-48 relative overflow-hidden border-t border-gray-100">
      
      {/* Absolute Ambient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[100vw] h-[100vw] max-w-[1200px] max-h-[1200px] bg-gradient-to-b from-purple-100/50 to-transparent rounded-full blur-[100px] opacity-60"></div>
      </div>

      <div className="section-wrapper relative z-10 flex flex-col items-center text-center">
        
        <div className="contact-reveal inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-10">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-semibold tracking-[0.2em] text-gray-500 uppercase">Available for work</span>
        </div>

        <h2 className="contact-reveal text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-serif font-black text-gray-900 tracking-tight leading-[1] max-w-5xl mb-12">
          Let’s build something <span className="text-gradient-accent italic pr-2">great</span> together.
        </h2>

        <div className="contact-reveal flex flex-col sm:flex-row items-center gap-6 mt-8">
          <a
            href="mailto:nimalmgaiml@gmail.com"
            className="group relative overflow-hidden rounded-full bg-gray-900 px-10 py-5 text-white hover-lift font-medium text-lg w-full sm:w-auto"
            style={{ color: "#ffffff" }}
          >
            <span className="relative z-10 flex items-center justify-center gap-3 text-white">
              Send an Email
              <svg className="w-5 h-5 group-hover:block transition-transform stroke-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-var(--accentColor) opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </a>
        </div>

        {/* Secondary Contact Links: Phone, Github, LinkedIn */}
        <div className="contact-reveal flex flex-wrap items-center justify-center gap-8 md:gap-12 mt-16 pt-12 border-t border-gray-200 w-full max-w-3xl mx-auto">
          
          <a href="tel:+910000000000" className="flex items-center gap-3 text-gray-500 hover:text-gray-900 transition-colors group">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:-translate-y-1 transition-transform bg-white shadow-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="font-medium text-sm tracking-wide uppercase">Call Me</span>
          </a>

          <a href="https://github.com/NIMALMG" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-gray-900 transition-colors group">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:-translate-y-1 transition-transform bg-white shadow-sm">
              <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </div>
            <span className="font-medium text-sm tracking-wide uppercase">GitHub</span>
          </a>

          <a href="https://www.linkedin.com/in/nimal-mg/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-gray-500 hover:text-[#0A66C2] transition-colors group">
            <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center group-hover:-translate-y-1 transition-transform bg-white shadow-sm">
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </div>
            <span className="font-medium text-sm tracking-wide uppercase">LinkedIn</span>
          </a>

        </div>
      </div>

      {/* Footer minimal signature */}
      <div className="absolute bottom-10 left-0 w-full text-center z-10">
        <p className="text-sm font-medium text-gray-400">
          © {new Date().getFullYear()} Nimal. All rights reserved.
        </p>
      </div>

    </section>
  );
}

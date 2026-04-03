"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reveal-contact",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      className="py-32 px-6 md:px-12 border-t border-white/5 relative overflow-hidden flex flex-col items-center"
      ref={containerRef}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-600/10 blur-[150px] -z-10 rounded-full pointer-events-none" />
      
      <div className="max-w-4xl w-full text-center space-y-12 reveal-contact">
        <h2 className="text-5xl md:text-8xl font-bold font-outfit text-white leading-tight">
          Let’s build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">great together</span>
        </h2>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto reveal-contact">
          Ready to elevate your online presence? Drop me a message and let's craft a premium digital experience.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 reveal-contact">
          <a
            href="mailto:nimalmgaiml@gmail.com"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-transform duration-300 hover:scale-105"
          >
            Send an Email
          </a>
          <a
            href="https://wa.me/916381193366" target="_blank" rel="noreferrer"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-semibold rounded-full hover:bg-white/10 transition-transform duration-300 hover:scale-105 flex items-center justify-center"
          >
            <svg 
              className="w-5 h-5 mr-2 text-green-500" 
              fill="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.027 6.988 2.895a9.85 9.85 0 0 1 2.895 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.82 11.82 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
      
      <div className="absolute bottom-6 text-gray-500 text-sm reveal-contact">
        © {new Date().getFullYear()} Nimal. All rights reserved.
      </div>
    </section>
  );
}

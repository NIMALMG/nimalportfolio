"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { name: "WORK", href: "#work" },
  { name: "SERVICES", href: "#services" },
  { name: "ABOUT", href: "#about" },
  { name: "CONTACT", href: "#contact" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      [headerRef.current, fadeRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-6 flex items-center justify-between"
      >
        <a href="/#" className="text-xl font-bold font-serif text-gray-900 tracking-wider">
          NIMAL.
        </a>
        
        <a
          href="mailto:nimalmgaiml@gmail.com"
          className="hidden md:block text-sm font-medium text-gray-500 hover:text-var(--accentColor) transition-colors"
        >
          nimalmgaiml@gmail.com
        </a>
        
        <nav className="flex items-center">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="hidden sm:block">
                <a
                  href={link.href}
                  className="group relative text-sm font-semibold tracking-widest text-gray-500 hover:text-gray-900 transition-colors uppercase"
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Sweep underline */}
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-var(--accentColor) transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Soft gradient fade for navbar background readability */}
      <div 
        ref={fadeRef}
        className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-[#fbfbfb] via-[#fbfbfb]/80 to-transparent z-40 pointer-events-none"
      ></div>
    </>
  );
}

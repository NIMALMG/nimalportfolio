"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Initial Entrance Animation
  useEffect(() => {
    gsap.fromTo(
      [headerRef.current, fadeRef.current],
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  // Mobile Menu Animation Controller
  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(mobileMenuRef.current, {
        pointerEvents: "auto",
        autoAlpha: 1,
        backdropFilter: "blur(16px)",
        duration: 0.4,
        ease: "power2.out"
      });
      gsap.fromTo(
        mobileLinksRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power3.out", delay: 0.2 }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        pointerEvents: "none",
        autoAlpha: 0,
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.in"
      });
    }
    
    // Cleanup to prevent scroll locking on unmount
    return () => { document.body.style.overflow = ""; };
  }, [isMobileOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-[100] px-6 lg:px-12 py-6 flex items-center justify-between pointer-events-auto"
      >
        <a href="/#" className="text-xl font-bold font-serif text-gray-900 tracking-wider relative z-[110]">
          NIMAL.
        </a>
        
        <a
          href="mailto:nimalmgaiml@gmail.com"
          className="hidden md:block text-sm font-medium text-gray-500 hover:text-var(--accentColor) transition-colors relative z-[110]"
        >
          nimalmgaiml@gmail.com
        </a>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center relative z-[110]">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="group relative text-sm font-semibold tracking-widest text-gray-500 hover:text-gray-900 transition-colors uppercase"
                >
                  <span className="relative z-10">{link.name}</span>
                  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-var(--accentColor) transition-all duration-300 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Hamburger Toggle */}
        <button 
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-[6px] relative z-[110]"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle mobile menu"
        >
          <span className={`h-[2px] w-8 bg-gray-900 transition-all duration-300 ${isMobileOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
          <span className={`h-[2px] w-8 bg-gray-900 transition-all duration-300 ${isMobileOpen ? 'opacity-0' : ''}`}></span>
          <span className={`h-[2px] w-8 bg-gray-900 transition-all duration-300 ${isMobileOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
        </button>
      </header>

      {/* Soft gradient fade for desktop navbar readability */}
      <div 
        ref={fadeRef}
        className="fixed top-0 left-0 w-full h-32 bg-gradient-to-b from-[#fbfbfb] via-[#fbfbfb]/80 to-transparent z-[40] pointer-events-none"
      ></div>

      {/* Fullscreen Mobile Navigation Menu */}
      <div 
        ref={mobileMenuRef}
        className="fixed inset-0 w-full h-[100dvh] bg-white/80 z-[90] flex flex-col items-center justify-center opacity-0 pointer-events-none"
        style={{ backdropFilter: "blur(0px)" }}
      >
        <nav className="flex flex-col items-center">
          <ul className="flex flex-col items-center gap-10">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <a
                  ref={(el) => { mobileLinksRef.current[i] = el; }}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-4xl font-serif font-bold text-gray-900 hover:text-gray-500 transition-colors uppercase tracking-widest block"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Mobile menu explicit robust email fallback */}
        <a 
          href="mailto:nimalmgaiml@gmail.com" 
          className="absolute bottom-12 text-sm font-medium tracking-wide text-gray-500 hover:text-gray-900 transition-colors uppercase"
        >
          nimalmgaiml@gmail.com
        </a>
      </div>
    </>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const navLinks = [
  { name: "Work", href: "#work" },
  { name: "Services", href: "#services" },
  { name: "About", href: "#about" },
];

export default function Header() {
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Basic entry animation for the header
    gsap.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-12 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between glass rounded-full px-6 py-3 pointer-events-auto">
        <div className="text-xl font-bold tracking-wider font-outfit text-white">
          NIMAL.
        </div>
        
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="hover:text-white transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="bg-white text-black px-5 py-2 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-300"
        >
          Let's Talk
        </a>
      </div>
    </header>
  );
}

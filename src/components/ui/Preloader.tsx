"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We run it every time for dev preview, normally wrapped in sessionStorage
    // const hasVisited = sessionStorage.getItem("hasVisited");
    // if (hasVisited) { setShow(false); return; }

    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem("hasVisited", "true");
          document.body.style.overflow = "";
          setShow(false);
        },
      });

      const chars = textContainerRef.current?.querySelectorAll('.char');

      if (chars) {
        // Dramatic cinematic reveal
        tl.fromTo(
          chars,
          { 
            y: 100, 
            opacity: 0, 
            rotateX: -90, 
            rotateY: 45, 
            filter: "blur(15px)",
            scale: 0.8
          },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            rotateY: 0,
            filter: "blur(0px)",
            scale: 1,
            stagger: 0.05,
            duration: 1.5,
            ease: "expo.out",
          }
        )
        // Glow pulse effect
        .to(chars, {
          textShadow: "0px 0px 20px rgba(255,255,255,0.8)",
          duration: 0.5,
          yoyo: true,
          repeat: 1
        })
        // Dramatic exit
        .to(chars, {
          y: -50,
          opacity: 0,
          filter: "blur(10px)",
          scale: 1.1,
          stagger: 0.03,
          duration: 0.8,
          ease: "power4.in",
          delay: 0.2
        })
        .to(
          containerRef.current,
          {
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (!show) return null;

  // Full name for the loader
  const fullName = "NIMAL M G".split("");

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
    >
      <div 
        ref={textContainerRef} 
        className="flex text-white font-outfit text-5xl md:text-8xl font-bold tracking-[0.3em] perspective-1000"
      >
        {fullName.map((char, index) => (
          <span 
            key={index} 
            className={`char inline-block ${char === " " ? "w-6 md:w-12" : ""}`}
            style={{ transformOrigin: "50% 100%" }}
          >
            {char}
          </span>
        ))}
        <span className="char inline-block text-blue-500">.</span>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!show) return;

    document.body.style.overflowY = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflowY = "";
        setShow(false);
      }
    });

    // 1. Sleek Apple-style minimalist loading bar sweep
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 1.2,
      ease: "power2.inOut"
    });

    // 2. Logo and loader upward fade out
    tl.to([textRef.current, progressRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.6,
      ease: "power3.in"
    }, "+=0.2");

    // 3. Entire background dissolving smoothly
    tl.to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut"
    });

    return () => {
      document.body.style.overflowY = "";
    };
  }, [show]);

  if (!show) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999999] flex flex-col items-center justify-center bg-[#fbfbfb]"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Sleek Dark Logo for Light Theme */}
        <div ref={textRef} className="text-xl md:text-2xl font-bold font-serif text-gray-900 tracking-widest uppercase">
          NIMAL.
        </div>

        {/* Minimal Progress Bar Track */}
        <div className="w-48 h-[2px] bg-gray-200 rounded-full overflow-hidden">
          {/* Active Loading Line */}
          <div 
            ref={progressRef}
            className="w-full h-full bg-gray-900 origin-left scale-x-0"
          ></div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hide native cursor only if we are on desktop
    if (window.innerWidth >= 768) {
      const cursor = cursorRef.current;
      const follower = followerRef.current;
      if (!cursor || !follower) return;

      // GSAP quickTo is an advanced Awwwards technique to highly optimize rapid event dispatching
      // It bypasses timeline initialization overhead per mouse move.
      // Set cursor way off screen and hidden initially to prevent the 0,0 top-left glitch!
      gsap.set([cursor, follower], { x: window.innerWidth / 2, y: window.innerHeight / 2, opacity: 0 });

      let hasMoved = false;

      const xToCursor = gsap.quickTo(cursor, "x", { duration: 0, ease: "none" });
      const yToCursor = gsap.quickTo(cursor, "y", { duration: 0, ease: "none" });

      const xToFollower = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
      const yToFollower = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });

      const onMouseMove = (e: MouseEvent) => {
        if (!hasMoved) {
          hasMoved = true;
          gsap.to([cursor, follower], { opacity: 1, duration: 0.5, ease: "power2.out" });
        }

        xToCursor(e.clientX);
        yToCursor(e.clientY);

        xToFollower(e.clientX);
        yToFollower(e.clientY);
      };

      // Premium magnetic scaling on interactive elements
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = 
          target.tagName === 'A' || 
          target.tagName === 'BUTTON' || 
          target.closest('a') || 
          target.closest('button') ||
          target.classList.contains('group');

        const isInput = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA';

        if (isInteractive) {
          gsap.to(follower, {
            scale: 1.8,
            backgroundColor: "rgba(37, 99, 235, 0.05)",
            borderColor: "rgba(37, 99, 235, 0.6)",
            filter: "blur(2px)",
            duration: 0.4,
            ease: "expo.out"
          });
          gsap.to(cursor, { scale: 0, duration: 0.2 }); // hide dot on hover
        } else if (isInput) {
          gsap.to(follower, {
            scale: 0.5,
            borderRadius: "0px",
            borderColor: "#fff",
            duration: 0.3
          });
        }
      };

      const handleMouseOut = () => {
        gsap.to(follower, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.3)",
          filter: "blur(0px)",
          borderRadius: "9999px",
          duration: 0.4,
          ease: "expo.out"
        });
        gsap.to(cursor, { scale: 1, duration: 0.2 });
      };

      window.addEventListener("mousemove", onMouseMove);
      document.body.addEventListener("mouseover", handleMouseOver);
      document.body.addEventListener("mouseout", handleMouseOut);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mouseover", handleMouseOver);
        document.body.removeEventListener("mouseout", handleMouseOut);
      };
    }
  }, []);

  return (
    <div className="hidden md:block pointer-events-none z-[99999]">
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-150 backdrop-blur-[1px]"
      />
    </div>
  );
}

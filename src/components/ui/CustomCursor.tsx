"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ══════════════════════════════════════════════════════════
    // REFERENCE: Cursor.tsx — EXACT clone
    // Manual rAF lerp loop with delay=6
    // gsap.to(cursor, { x, y, duration: 0.1 })
    // mix-blend-mode: difference
    // 50px size (from Cursor.css)
    // cursor-icons on [data-cursor] hover — snaps to element
    // cursor-disable hides cursor
    // ══════════════════════════════════════════════════════════
    if (window.innerWidth < 600) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let hover = false;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    // REFERENCE line 12-15: track raw mouse position
    const onMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMouseMove);

    // REFERENCE line 16-25: rAF loop with lerp delay=6
    let rafId: number;
    const loop = () => {
      if (!hover) {
        const delay = 6; // EXACT from reference line 18
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 }); // EXACT reference line 21
      }
      rafId = requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);

    // REFERENCE line 26-48: data-cursor hover behavior
    const hoverListeners: Array<{ el: HTMLElement; over: (e: MouseEvent) => void; out: () => void }> = [];

    const setupHovers = () => {
      // Interactive elements (links, buttons) act like data-cursor="disable" — shrink cursor
      document.querySelectorAll("a, button").forEach((item) => {
        const element = item as HTMLElement;
        const overHandler = () => {
          cursor.classList.add("cursor-hover");
        };
        const outHandler = () => {
          cursor.classList.remove("cursor-hover");
        };
        element.addEventListener("mouseover", overHandler);
        element.addEventListener("mouseout", outHandler);
        hoverListeners.push({ el: element, over: overHandler, out: outHandler });
      });
    };

    // Delay setup slightly so DOM is ready
    const setupTimeout = setTimeout(setupHovers, 500);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      clearTimeout(setupTimeout);
      hoverListeners.forEach(({ el, over, out }) => {
        el.removeEventListener("mouseover", over);
        el.removeEventListener("mouseout", out);
      });
    };
  }, []);

  return (
    <>
      {/* REFERENCE Cursor.css: 50px, mix-blend-mode: difference, rounded, purple glow
          --size: 50px; background-color: #e6c3ff;
          box-shadow: 0px 0px 30px 0px rgb(175, 131, 255);
          mix-blend-mode: difference */}
      <div
        ref={cursorRef}
        className="cursor-main hidden md:block"
      />
    </>
  );
}

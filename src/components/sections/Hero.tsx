"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Image from "next/image";

gsap.registerPlugin(TextPlugin);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const iamRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLDivElement>(null);
  
  // Image Refs
  const slice1Ref = useRef<HTMLDivElement>(null);
  const slice2Ref = useRef<HTMLDivElement>(null);
  const slice3Ref = useRef<HTMLDivElement>(null);
  const slice4Ref = useRef<HTMLDivElement>(null);
  
  // Outer Container
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for preloader to finish
    const tl = gsap.timeline({ delay: 3.5 }); // Preloader takes ~3.5s now

    gsap.set(sectionRef.current, { opacity: 1 });

    // Step 1: Advanced Image Slices (No distortion!)
    tl.fromTo(
      slice2Ref.current,
      { y: "-100%" },
      { y: "0%", duration: 1.5, ease: "expo.out" },
      0
    )
    .fromTo(
      slice3Ref.current,
      { y: "100%" },
      { y: "0%", duration: 1.5, ease: "expo.out" },
      0
    )
    .fromTo(
      [slice1Ref.current, slice4Ref.current],
      { opacity: 0, filter: "blur(10px)" },
      { opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
      0.5
    )

    // Dynamic scale to entire image container
    .fromTo(
      imageContainerRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 2, ease: "power2.out" },
      0
    )

    // Step 2: "I am" Typing Animation
    .to(iamRef.current, {
      text: "I am",
      duration: 0.6,
      ease: "none"
    }, 1.2)

    // Step 3: Huge Name Cinematic Reveal
    tl.fromTo(
      nameRef.current,
      { opacity: 0, scale: 0.9, rotateX: -30, filter: "blur(15px)", y: 50 },
      { opacity: 1, scale: 1, rotateX: 0, filter: "blur(0px)", y: 0, duration: 2, ease: "expo.out" },
      1.5
    )

    // Step 4: Role Typing Animation with scramble effect
    tl.to(roleRef.current, {
      text: "a Frontend Developer",
      duration: 1.2,
      ease: "none"
    }, 2)

    // Step 5: Description text cinematic fade-in
    tl.fromTo(
      descRef.current,
      { y: 30, opacity: 0, filter: "blur(5px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "power3.out" },
      3.2
    );

    // Advanced 3D Hover Tilt on the image container
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageContainerRef.current) return;
      const rect = imageContainerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(imageContainerRef.current, {
        rotationY: x / 30,
        rotationX: -y / 30,
        ease: "power2.out",
        duration: 0.8,
        transformPerspective: 1000
      });
    };

    const handleMouseLeave = () => {
      if (!imageContainerRef.current) return;
      gsap.to(imageContainerRef.current, {
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
        duration: 1,
      });
    };

    imageContainerRef.current?.addEventListener("mousemove", handleMouseMove);
    imageContainerRef.current?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      imageContainerRef.current?.removeEventListener("mousemove", handleMouseMove);
      imageContainerRef.current?.removeEventListener("mouseleave", handleMouseLeave);
    };

  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-12 px-6 md:px-12 opacity-0 overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-[50vh] h-[50vh] bg-blue-600/10 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center z-10">
        
        {/* Left Side: Flawless Segmented Portrait Animation */}
        <div className="flex justify-center md:justify-start perspective-1000">
          <div 
            ref={imageContainerRef}
            className="relative w-[280px] h-[400px] lg:w-[400px] lg:h-[550px] flex group border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] transform-style-3d cursor-crosshair"
          >
            {/* Overlay Gradient for luxury feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-20 pointer-events-none mix-blend-multiply opacity-50 group-hover:opacity-30 transition-opacity duration-700" />
            
            {/* Slice 1 */}
            <div ref={slice1Ref} className="relative w-1/4 h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1s]">
              <div className="absolute top-0 h-full w-[400%] left-[0%]">
                <Image src="/profile.png" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" alt="Nimal" priority />
              </div>
            </div>

            {/* Slice 2 */}
            <div ref={slice2Ref} className="relative w-1/4 h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1s]">
              <div className="absolute top-0 h-full w-[400%] left-[-100%]">
                <Image src="/profile.png" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" alt="Nimal" priority />
              </div>
            </div>

            {/* Slice 3 */}
            <div ref={slice3Ref} className="relative w-1/4 h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1s]">
              <div className="absolute top-0 h-full w-[400%] left-[-200%]">
                <Image src="/profile.png" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" alt="Nimal" priority />
              </div>
            </div>

            {/* Slice 4 */}
            <div ref={slice4Ref} className="relative w-1/4 h-full overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-[1s]">
              <div className="absolute top-0 h-full w-[400%] left-[-300%]">
                <Image src="/profile.png" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" alt="Nimal" priority />
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Side: Typography Sequence */}
        <div className="flex flex-col justify-center">
          
          {/* I am */}
          <div 
            ref={iamRef} 
            className="text-lg md:text-2xl font-light text-gray-400 mb-2 h-8"
          />
          
          {/* Huge Name */}
          <h1 
            ref={nameRef}
            className="text-6xl sm:text-7xl lg:text-[8.5rem] font-bold font-outfit uppercase leading-[0.85] tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-100 to-gray-600 drop-shadow-lg opacity-0"
            style={{ transformOrigin: "0% 50%" }}
          >
            NIMAL .
          </h1>
          
          {/* Role */}
          <div className="w-full text-left md:text-right mt-6 pr-2">
            <div 
              ref={roleRef} 
              className="inline-block text-2xl md:text-4xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-outfit tracking-wide h-12"
            />
          </div>

          {/* Description */}
          <div 
            ref={descRef}
            className="mt-8 md:mt-16 text-lg md:text-2xl font-light text-gray-400 leading-relaxed max-w-lg opacity-0"
          >
            Every scroll reveals a chapter — walk through my journey and see how it all began.
          </div>
        </div>

      </div>
    </section>
  );
}

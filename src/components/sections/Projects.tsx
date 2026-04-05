"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const projects = [
  {
    title: "Saurashtra Connect",
    category: "Web Platform",
    tools: ["Next.js", "TypeScript", "Tailwind", "Prisma"],
    description: "A modern web platform bridging communities with responsive layout, advanced routing, and dynamic user roles.",
    image: "/project1.png",
    link: "https://saurashtra-connect.vercel.app/",
    color: "from-blue-500/20",
  },
  {
    title: "Shivani Shoe Mart",
    category: "E-Commerce",
    tools: ["React", "CSS3", "GSAP", "Redux"],
    description: "An elegant, premium storefront showcasing high-end footwear with immersive GSAP product viewer.",
    image: "/project2.png",
    link: "https://shivanishoemart.netlify.app/",
    color: "from-purple-500/20",
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Heading Entry
      gsap.fromTo(
        ".projects-heading",
        { y: 50, opacity: 0, filter: "blur(10px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play pause resume reverse"
          }
        }
      );

      // Cards staggered entry
      gsap.fromTo(
        cardsRef.current,
        { y: 150, opacity: 0, scale: 0.95, rotateX: 10 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 1.5,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 75%",
            toggleActions: "play pause resume reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={sectionRef} className="w-full bg-[#fbfbfb] py-32 lg:py-48 relative overflow-hidden border-t border-gray-100">
      
      <div className="section-wrapper relative z-10 flex flex-col items-center">
        
        {/* Heading */}
        <div className="projects-heading text-center mb-20 md:mb-32 flex flex-col items-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-6">
            <span className="w-2 h-2 rounded-full bg-var(--accentColor) animate-pulse"></span>
            <span className="text-xs font-semibold tracking-[0.25em] text-gray-500 uppercase">Selected Work</span>
          </span>
          <h2 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 tracking-wide uppercase" style={{ letterSpacing: "2px" }}>
            Featured Projects
          </h2>
        </div>

        {/* Modern Grid */}
        <div className="projects-grid w-full grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 perspective-1000">
          {projects.map((project, index) => (
            <a
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              href={project.link}
              target="_blank"
              rel="noreferrer"
              className="group relative flex flex-col bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_rgba(124,58,237,0.1)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-4 hover:border-purple-200 cursor-pointer"
            >
              {/* Image Container with inner hover scale/glow */}
              <div className="relative w-full aspect-[16/10] overflow-hidden bg-gray-50">
                <div className={`absolute inset-0 bg-gradient-to-b ${project.color} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10`} />
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transform group-hover:scale-105 group-hover:rotate-1 transition-transform duration-700 ease-out"
                  unoptimized
                />
                
                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 z-20 w-12 h-12 bg-white rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 shadow-lg">
                  <svg className="w-5 h-5 text-gray-900 transform group-hover:rotate-45 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </div>
              </div>

              {/* Text Info Container */}
              <div className="p-8 lg:p-10 flex flex-col flex-grow relative z-20 bg-white">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-3xl font-bold text-gray-900 group-hover:text-var(--accentColor) transition-colors duration-500">
                    {project.title}
                  </h3>
                  <span className="text-sm font-medium text-gray-400 bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    {project.category}
                  </span>
                </div>
                
                <p className="text-gray-500 text-lg leading-relaxed mb-8 flex-grow">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tools.map((tool, i) => (
                    <span key={i} className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}

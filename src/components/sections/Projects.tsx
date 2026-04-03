"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "Saurashtra Connect",
    description: "A modern web platform bridging communities. Features responsive layout, advanced routing, and dark/light dynamic interfaces. The project aimed to deliver unparalleled speed while maintaining huge data sets and user roles across specific zones.",
    link: "https://saurashtra-connect.vercel.app/",
    image: "/project1.png",
    tech: ["Next.js", "Tailwind", "TypeScript", "Prisma"],
  },
  {
    title: "Shivani Shoe Mart",
    description: "An elegant, premium E-commerce storefront showcasing high-end footwear. Integrated with an immersive GSAP product viewer, automated cart calculations, and responsive multi-platform layout optimization.",
    link: "https://shivanishoemart.netlify.app/",
    image: "/project2.png",
    tech: ["React", "CSS3", "GSAP", "Redux"],
  },
];

const ProjectCard = ({ 
  project, 
  index, 
  onClick 
}: { 
  project: typeof projects[0]; 
  index: number;
  onClick: () => void;
}) => {
  const tiltRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiltLayer = tiltRef.current;
    const glare = glareRef.current;
    if (!tiltLayer || !glare) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { left, top, width, height } = tiltLayer.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(tiltLayer, {
        rotationY: x * 15,
        rotationX: -y * 15,
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });

      gsap.to(glare, {
        x: x * width * 2,
        y: y * height * 2,
        opacity: 0.6,
        duration: 0.5
      });
    };

    const handleMouseLeave = () => {
      gsap.to(tiltLayer, {
        rotationY: 0,
        rotationX: 0,
        ease: "power3.out",
        duration: 1,
      });
      gsap.to(glare, {
        opacity: 0,
        duration: 1
      });
    };

    tiltLayer.addEventListener("mousemove", handleMouseMove);
    tiltLayer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      tiltLayer.removeEventListener("mousemove", handleMouseMove);
      tiltLayer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="project-wrapper absolute top-[10%] md:top-[15%] left-1/2 -translate-x-1/2 w-[340px] md:w-[420px] h-[520px] md:h-[580px] perspective-[2000px] z-10 cursor-pointer" onClick={onClick}>
      <div className="project-flip-wrapper relative w-full h-full transform-style-3d shadow-2xl">
        <div ref={tiltRef} className="relative w-full h-full transform-style-3d">
          
          {/* --- REAR FACE (NIMAL LOGO CARD BACK) --- */}
          <div 
            className="project-back absolute inset-0 w-full h-full bg-[#050505] rounded-xl border-2 border-white/10 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)] z-10"
            style={{ transform: "rotateY(0deg) translateZ(1px)" }}
          >
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900 via-[#050505] to-[#050505]"></div>
            <div className="relative w-48 h-48 border border-white/20 rounded-full flex items-center justify-center">
              <h2 className="text-[7rem] font-serif text-white/10 drop-shadow-[0_0_25px_rgba(255,255,255,0.1)] absolute">N</h2>
              <div className="w-40 h-40 border border-white/20 rotate-45 flex items-center justify-center">
                <h1 className="text-6xl font-outfit text-white/30 font-bold -rotate-45 block">N</h1>
              </div>
            </div>
            <div className="absolute bottom-6 text-white/10 text-xs tracking-[0.5em] font-outfit">SERIES 0{index + 1}</div>
          </div>

          {/* --- FRONT FACE (ACTUAL PROJECT UI) --- */}
          <div 
            className="project-front absolute inset-0 w-full h-full bg-[#0a0a0a] rounded-xl border border-white/10 flex flex-col overflow-hidden group shadow-[0_0_40px_rgba(37,99,235,0.15)] opacity-0 pointer-events-none"
            // Note: rotateY is 180. When flip-wrapper applies 180, 180+180=360 (forward facing logic).
            style={{ transform: "rotateY(180deg) translateZ(2px)" }}
          >
            <div ref={glareRef} className="absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_50%)] opacity-0 pointer-events-none mix-blend-screen z-50"></div>

            <div className="relative w-full h-[55%] overflow-hidden border-b border-white/10">
              <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply" />
              <Image 
                src={`${project.image}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-top scale-105 group-hover:scale-100 group-hover:rotate-1 transition-transform duration-[2s] ease-out brightness-75 group-hover:brightness-110"
                alt={project.title}
              />
            </div>

            <div className="p-8 flex flex-col h-[45%] bg-gradient-to-b from-[#0a0a0a] to-blue-900/10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold font-serif text-white tracking-wider uppercase group-hover:text-blue-400 transition-colors line-clamp-1">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {project.tech.slice(0, 3).map((t, i) => (
                   <span key={i} className="px-3 py-1 text-xs font-semibold tracking-[0.2em] uppercase bg-white/5 text-gray-300 rounded-sm hover:bg-white/10 transition-colors">
                    {t}
                  </span>
                ))}
                {project.tech.length > 3 && (
                  <span className="px-3 py-1 text-xs font-semibold tracking-widest uppercase bg-blue-600/20 text-blue-400 rounded-sm">
                    +{project.tech.length - 3}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".project-wrapper");
      const flipContainers = gsap.utils.toArray<HTMLElement>(".project-flip-wrapper");
      const backFaces = gsap.utils.toArray<HTMLElement>(".project-back");
      const frontFaces = gsap.utils.toArray<HTMLElement>(".project-front");
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        }
      });

      // 1. Spacing the wrappers
      tl.to(wrappers[0], { xPercent: -120, rotationZ: -8, yPercent: 10, duration: 2, ease: "power2.out" }, 0)
        .to(wrappers[1], { xPercent: 20, rotationZ: 8, yPercent: 10, duration: 2, ease: "power2.out" }, 0); 

      // 2. Physical 180° Spin
      tl.to(flipContainers[0], { rotationY: 180, duration: 2.5, ease: "power1.inOut" }, 1)
        .to(flipContainers[1], { rotationY: 180, duration: 2.5, ease: "power1.inOut" }, 1);
        
      // 3. EXPLICIT VISIBILITY TOGGLE (Bypasses rendering bugs on CSS variables)
      // Executed precisely at the 90-degree mark where the edge is perfectly facing the user! (At duration 1 + 1.25 = 2.25)
      tl.to(backFaces, { opacity: 0, pointerEvents: "none", duration: 0.01 }, 2.25)
        .to(frontFaces, { opacity: 1, pointerEvents: "auto", duration: 0.01 }, 2.25);

      // 4. Float leveling
      tl.to(wrappers, { rotationZ: 0, yPercent: 0, ease: "power2.inOut", duration: 1.5 }, 2.5);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <section ref={containerRef} id="work" className="relative w-full h-[250vh] bg-black">
        <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />

        <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center pt-24 pb-32">
          
          <div className="absolute top-0 left-0 w-full h-[35vh] bg-[#050505] z-0 pointer-events-none">
            <div className="absolute bottom-0 translate-y-[50%] left-1/2 -translate-x-1/2 w-[250vw] h-[100vw] rounded-[50%] bg-[#050505] border-b border-white/5 shadow-[0_20px_80px_rgba(0,0,0,1)]"></div>
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center h-full">
            <div className="text-center mb-10 pt-8 z-20">
              <h2 className="text-5xl md:text-8xl font-bold text-white tracking-widest font-serif drop-shadow-2xl uppercase">
                Hand Crafted Works
              </h2>
            </div>

            <div className="relative w-full flex-grow mt-12 perspective-[2000px]">
              {projects.map((project, index) => (
                <ProjectCard 
                  key={index} 
                  project={project} 
                  index={index} 
                  onClick={() => setSelectedProject(project)} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedProject && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 md:p-12 perspective-1000">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-xl cursor-pointer"
            onClick={() => setSelectedProject(null)}
          />
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] bg-[#050505] rounded-3xl border border-white/10 shadow-[0_0_150px_rgba(37,99,235,0.3)] overflow-hidden flex flex-col md:flex-row transform-style-3d animate-in fade-in zoom-in duration-500"
          >
            <div className="w-full md:w-[55%] h-64 md:h-auto relative bg-gray-900 border-r border-white/5">
              <Image 
                src={`${selectedProject.image}`}
                fill
                unoptimized
                sizes="(max-width: 768px) 100vw, 100vw"
                className="object-cover object-top"
                alt={selectedProject.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#050505] via-transparent to-transparent opacity-80" />
            </div>

            <div className="w-full md:w-[45%] p-8 md:p-16 flex flex-col justify-center bg-[url('/noise.png')]">
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-red-500 hover:border-red-500 transition-all z-20 group"
              >
                <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <span className="w-max inline-flex items-center px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-bold tracking-[0.2em] uppercase text-xs mb-8 font-outfit">
                <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 animate-pulse" /> Detailed Showcase
              </span>
              
              <h2 className="text-4xl md:text-[3.5rem] leading-[1.1] font-bold text-white font-serif mb-8 drop-shadow-lg">
                {selectedProject.title}
              </h2>
              <p className="text-gray-300 text-lg md:text-xl font-light leading-relaxed mb-10">
                {selectedProject.description}
              </p>

              <div className="mb-12">
                <h4 className="text-gray-500 text-sm uppercase tracking-[0.2em] font-semibold mb-4">Technologies Leveraged</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.tech.map((t, i) => (
                    <span key={i} className="px-5 py-3 text-sm font-semibold tracking-wider bg-[#111] border border-white/10 text-gray-200 rounded-lg shadow-inner">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <a 
                href={selectedProject.link} 
                target="_blank" 
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center w-full md:w-max px-10 py-5 bg-white text-black font-bold tracking-widest uppercase rounded-lg hover:bg-gray-200 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Launch Live Site
                  <svg className="w-5 h-5 ml-3 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-blue-500 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 z-0" />
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

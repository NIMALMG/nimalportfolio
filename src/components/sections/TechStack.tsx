"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const skillSummary = [
  { name: "JAVA", percent: 80 },
  { name: "PYTHON", percent: 70 },
  { name: "NEXT.JS", percent: 70 },
  { name: "FIREBASE", percent: 60 },
  { name: "LLMs & NLP", percent: 60 },
  { name: "FASTAPI / DOCKER", percent: 60 },
  { name: "AZURE", percent: 50 },
];

const techItems = [
  { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", invert: true, color: "hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]" },
  { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(97,218,251,0.4)]" },
  { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(56,189,248,0.4)]" },
  { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]" },
  { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(250,204,21,0.4)]" },
  { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]" },
  { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(37,99,235,0.4)]" },
  { name: "Azure", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(37,153,235,0.4)]" },
  { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg", invert: false, color: "hover:shadow-[0_0_30px_rgba(239,68,68,0.4)]" },
];

export default function TechStack() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const summaryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const numbersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // --- MATRIX BACKGROUND ---
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789§±ßµ@#$%^&*".split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) drops[x] = Math.random() * -100;

    let matrixAnimationId: number;
    const drawMatrix = () => {
      ctx.fillStyle = "rgba(5, 5, 5, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 51, 0.4)"; // Reduced opacity further
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        if (drops[i] > 0) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        }

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      matrixAnimationId = window.requestAnimationFrame(drawMatrix);
    };
    drawMatrix();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // --- GSAP ANIMATIONS ---
    const gsapCtx = gsap.context(() => {

      // Summary Bar Items Stagger Slide-Up
      gsap.fromTo(
        summaryItemsRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          stagger: 0.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );

      // Summary Bar GSAP Number Counter
      numbersRef.current.forEach((el, index) => {
        if (!el) return;
        const targetPercent = skillSummary[index].percent;
        gsap.to(el, {
          innerText: targetPercent,
          duration: 2.5,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          },
          ease: "power3.out",
          onUpdate: function () {
            el.innerHTML = Math.round(Number(this.targets()[0].innerText)) + "%";
          }
        });
      });

      // Grid Cards Stagger Entrance
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 40, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: ".tech-grid-wrapper",
            start: "top 80%",
          }
        }
      );

      // Cards Continuous Floating Motion
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: "-=10",
          duration: 2 + (i % 2),
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: i * 0.1
        });
      });

    }, containerRef);

    return () => {
      window.cancelAnimationFrame(matrixAnimationId);
      window.removeEventListener("resize", handleResize);
      gsapCtx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-[#050505] overflow-hidden flex flex-col pt-12 pb-32">
      
      {/* Absolute Matrix Background Layer with Soft Glow Overlay */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30 mix-blend-screen pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,transparent_0%,#050505_80%)] pointer-events-none" />
      
      <div className="absolute top-[20%] left-[20%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen animate-pulse" />
      <div className="absolute bottom-[20%] right-[20%] w-[50vw] h-[50vw] bg-purple-900/10 rounded-full blur-[150px] pointer-events-none mix-blend-screen" />

      <div className="relative z-10 w-full flex-grow flex flex-col items-center">
        
        {/* --- 🟢 TOP: PREMIUM SKILL SUMMARY BAR --- */}
        <div className="w-full max-w-7xl mx-auto px-4 mt-12 mb-32 relative">
          
          {/* Animated Soft Gradient Underglow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 rounded-3xl blur-[50px] opacity-60 animate-[pulse_6s_ease-in-out_infinite] z-0" />
          
          <div className="relative z-10 w-full bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.8)] py-10 px-6 md:px-12 flex flex-wrap justify-between items-center gap-y-12">
            {skillSummary.map((skill, index) => (
              <div 
                key={index} 
                ref={(el) => { summaryItemsRef.current[index] = el; }}
                className="flex flex-col items-center group cursor-default w-1/2 md:w-1/3 lg:flex-1"
              >
                <span 
                  ref={(el) => { numbersRef.current[index] = el; }}
                  className="text-5xl md:text-6xl font-bold font-outfit text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] tabular-nums transition-all duration-500 group-hover:scale-110 group-hover:from-blue-400 group-hover:to-purple-500 group-hover:drop-shadow-[0_0_30px_rgba(168,85,247,0.6)]"
                >
                  0%
                </span>
                <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mt-4 text-gray-500 group-hover:text-gray-300 transition-colors duration-500 text-center">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>


        {/* --- 🔵 BELOW: PREMIUM TECH SHOWCASE --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-white font-outfit uppercase tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.1)] mb-4">
            Tools & Technologies
          </h2>
          <span className="w-24 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent block mx-auto rounded-full opacity-50" />
        </div>

        <div className="tech-grid-wrapper w-full max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-10 perspective-1000">
          {techItems.map((tech, i) => (
            <div
              key={i}
              ref={(el) => { cardsRef.current[i] = el; }}
              className={`relative flex items-center p-6 md:p-8 bg-[#0a0a0a]/60 backdrop-blur-lg border border-white/5 rounded-3xl cursor-none transform-style-3d group ${tech.color} hover:bg-[#111111]/90 hover:-translate-y-2 hover:scale-[1.02] hover:border-white/20 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]`}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                gsap.to(e.currentTarget, {
                  rotationX: -y * 15,
                  rotationY: x * 15,
                  duration: 0.5,
                  ease: "power2.out"
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotationX: 0,
                  rotationY: 0,
                  duration: 0.5,
                  ease: "power2.out"
                });
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-3xl" />

              <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0" style={{ transform: "translateZ(30px)" }}>
                <img 
                  src={tech.icon} 
                  className={`w-full h-full object-contain drop-shadow-lg scale-90 group-hover:scale-110 transition-transform duration-500 ${tech.invert ? 'invert' : ''}`} 
                  alt={tech.name} 
                />
              </div>

              <div className="ml-6 flex flex-col justify-center" style={{ transform: "translateZ(20px)" }}>
                <span className="text-xl md:text-2xl font-bold font-serif text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all duration-300">
                  {tech.name}
                </span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Mastered
                </span>
              </div>

              <div className="absolute top-6 right-6 w-2 h-2 rounded-full border border-white/20 group-hover:border-white/80 group-hover:bg-white/20 transition-all duration-300" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

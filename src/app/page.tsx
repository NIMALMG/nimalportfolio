import Hero from "@/components/sections/Hero";
import TechStack from "@/components/sections/TechStack";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Projects from "@/components/sections/Projects";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <Hero />
      <TechStack />
      <About />
      <Services />
      <Projects />
      <Contact />
    </div>
  );
}

"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { 
  FaLaptopCode, FaMobileAlt, FaDatabase, FaReact, FaNodeJs, FaFigma, FaServer, FaCogs, FaRocket, FaPalette, FaCodeBranch, FaBug, FaVuejs, FaPython, FaDocker, FaAws, FaGithub, FaGitAlt, FaLinux, FaSass, FaJava, FaPhp, FaAngular, FaTerminal, FaShieldAlt, FaHtml5, FaCss3Alt, FaJsSquare, FaSwift, FaUbuntu, FaWindows, FaApple, FaCloud, FaLock, FaCode, FaNetworkWired, FaMicrochip, FaBrain, FaRobot, FaGlobe 
} from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const iconsOrbit1 = [
  { icon: FaReact, color: "text-[#61DAFB]" },
  { icon: FaNodeJs, color: "text-[#339933]" },
  { icon: FaPython, color: "text-[#3776AB]" },
  { icon: FaDocker, color: "text-[#2496ED]" },
  { icon: FaAws, color: "text-[#FF9900]" },
  { icon: FaGithub, color: "text-white" },
  { icon: FaGitAlt, color: "text-[#F05032]" },
];

const iconsOrbit2 = [
  { icon: FaLinux, color: "text-white" },
  { icon: FaVuejs, color: "text-[#4FC08D]" },
  { icon: FaSass, color: "text-[#CC6699]" },
  { icon: FaJava, color: "text-[#5382A1]" },
  { icon: FaPhp, color: "text-[#777BB4]" },
  { icon: FaAngular, color: "text-[#DD0031]" },
  { icon: FaTerminal, color: "text-white" },
  { icon: FaDatabase, color: "text-[#336791]" },
  { icon: FaShieldAlt, color: "text-green-500" },
  { icon: FaHtml5, color: "text-[#E34F26]" },
];

const iconsOrbit3 = [
  { icon: FaCss3Alt, color: "text-[#1572B6]" },
  { icon: FaJsSquare, color: "text-[#F7DF1E]" },
  { icon: FaSwift, color: "text-[#FA7343]" },
  { icon: FaUbuntu, color: "text-[#E95420]" },
  { icon: FaWindows, color: "text-[#0078D6]" },
  { icon: FaApple, color: "text-white" },
  { icon: FaFigma, color: "text-[#F24E1E]" },
  { icon: FaServer, color: "text-cyan-500" },
  { icon: FaRocket, color: "text-white" },
  { icon: FaCloud, color: "text-blue-400" },
  { icon: FaLock, color: "text-yellow-500" },
  { icon: FaCode, color: "text-accent" },
  { icon: FaNetworkWired, color: "text-purple-500" },
  { icon: FaMicrochip, color: "text-pink-500" },
];

const iconsOrbit4 = [
  { icon: FaBrain, color: "text-pink-400" },
  { icon: FaRobot, color: "text-cyan-400" },
  { icon: FaCodeBranch, color: "text-white" },
  { icon: FaBug, color: "text-red-500" },
  { icon: FaPalette, color: "text-purple-400" },
  { icon: FaReact, color: "text-[#61DAFB]" },
  { icon: FaNodeJs, color: "text-[#339933]" },
  { icon: FaPython, color: "text-[#3776AB]" },
  { icon: FaDocker, color: "text-[#2496ED]" },
  { icon: FaAws, color: "text-[#FF9900]" },
  { icon: FaGithub, color: "text-white" },
  { icon: FaVuejs, color: "text-[#4FC08D]" },
  { icon: FaJava, color: "text-[#5382A1]" },
  { icon: FaDatabase, color: "text-[#336791]" },
  { icon: FaShieldAlt, color: "text-green-500" },
  { icon: FaLinux, color: "text-white" },
  { icon: FaServer, color: "text-cyan-500" },
  { icon: FaCloud, color: "text-blue-400" },
];

const OrbitRing = ({ radiusDesktop, radiusMobile, duration, reverse, icons }: { radiusDesktop: number, radiusMobile: number, duration: number, reverse: boolean, icons: any[] }) => {
  return (
    <>
      <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: radiusMobile, height: radiusMobile }}>
        <div className="w-full h-full rounded-full border border-white/10 relative" style={{ animation: `spin-orbit ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}` }}>
          {icons.map((item, index) => {
            const angle = (index / icons.length) * 360;
            return (
              <div key={index} className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radiusMobile / 2}px)` }}>
                <div style={{ animation: `spin-orbit ${duration}s linear infinite ${reverse ? 'normal' : 'reverse'}` }} className="pointer-events-auto">
                  <div style={{ transform: `rotate(-${angle}deg)` }} className="w-10 h-10 bg-[#111] border border-white/10 rounded-full flex items-center justify-center hover:scale-125 hover:border-accent hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300 relative group cursor-pointer">
                    <item.icon className={`w-5 h-5 ${item.color} group-hover:scale-110 transition-transform`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" style={{ width: radiusDesktop, height: radiusDesktop }}>
        <div className="w-full h-full rounded-full border border-white/10 relative" style={{ animation: `spin-orbit ${duration}s linear infinite ${reverse ? 'reverse' : 'normal'}` }}>
          {icons.map((item, index) => {
            const angle = (index / icons.length) * 360;
            return (
              <div key={index} className="absolute top-1/2 left-1/2 pointer-events-none" style={{ transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-${radiusDesktop / 2}px)` }}>
                <div style={{ animation: `spin-orbit ${duration}s linear infinite ${reverse ? 'normal' : 'reverse'}` }} className="pointer-events-auto">
                  <div style={{ transform: `rotate(-${angle}deg)` }} className="w-14 h-14 bg-[#111] border border-white/10 rounded-full flex items-center justify-center hover:scale-125 hover:border-accent hover:shadow-[0_0_20px_rgba(229,9,20,0.4)] transition-all duration-300 relative group cursor-pointer">
                    <item.icon className={`w-6 h-6 ${item.color} group-hover:scale-110 transition-transform`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
};

export default function StudioAbout() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".service-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".step-item",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".process-section",
          start: "top 80%",
        },
      }
    );

  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white flex flex-col" ref={containerRef}>
      <Navbar />

      <div className="flex-1 pt-40 px-4 md:px-8 w-full max-w-6xl mx-auto relative z-10 flex flex-col">
        <div className="text-center mb-24 md:mb-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 hero-text leading-[1.1] opacity-0">
            Welcome to <br />
            <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4 italic">Kh1ev Studio.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed hero-text opacity-0">
            The digital development wing of Kh1ev Organization. We engineer robust web applications, immersive digital experiences, and innovative IT solutions.
          </p>
        </div>

        <div className="services-section mb-40">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-24 relative z-10">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/20 rounded-full text-accent font-bold text-xs tracking-[0.2em] uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                The Kh1ev Studio Mission
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-[1.1]">
                Not Just Learning.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-300 to-neutral-600">Building Real Portfolios.</span>
              </h2>
            </div>
            <div className="md:w-1/2 md:pl-12 md:border-l border-white/10">
              <p className="text-neutral-400 text-lg md:text-xl leading-relaxed mb-8">
                Kh1ev Studio is an open laboratory for tech enthusiasts. We believe the absolute best way to master IT is by getting our hands dirty. We gather passionate individuals to brainstorm, execute, and build massive IT projects that become powerful additions to our collective portfolios.
              </p>
              <div className="flex items-center gap-4">
                <Link href="/join" className="px-8 py-4 bg-accent text-white font-extrabold rounded-full shadow-[0_0_20px_rgba(229,9,20,0.3)] hover:scale-105 active:scale-95 transition-all duration-300">
                  Join our Studio
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 mb-32">
             <div className="hidden md:block absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2 z-0"></div>
             
             {[
               { step: "01", title: "Ideation", desc: "Brainstorming innovative and ambitious tech ideas." },
               { step: "02", title: "Assembly", desc: "Forming a dedicated team of developers and designers." },
               { step: "03", title: "Execution", desc: "Engineering the architecture and writing the code." },
               { step: "04", title: "Deployment", desc: "Launching the product to build our public portfolios." }
             ].map((item, i) => (
               <div key={i} className="service-card opacity-0 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 relative z-10 hover:border-accent/50 transition-colors duration-500 group">
                 <div className="text-5xl font-black text-white/5 group-hover:text-accent/20 transition-colors duration-500 mb-4">{item.step}</div>
                 <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                 <p className="text-neutral-400 leading-relaxed text-sm">{item.desc}</p>
               </div>
             ))}
          </div>

          <div className="bg-[#050505] border border-white/5 rounded-[3rem] py-10 md:py-16 text-center relative z-10 overflow-hidden">
             <h3 className="text-3xl font-bold text-white mb-4 px-4">Limitless Exploration</h3>
             <p className="text-neutral-500 max-w-2xl mx-auto mb-10 text-lg px-4">We don't restrict ourselves to one field. We explore, learn, and engineer projects across a vast spectrum of IT domains.</p>
             
             <style dangerouslySetInnerHTML={{__html: `
               @keyframes marquee-left {
                 0% { transform: translateX(0); }
                 100% { transform: translateX(-50%); }
               }
               @keyframes marquee-right {
                 0% { transform: translateX(-50%); }
                 100% { transform: translateX(0); }
               }
               .animate-marquee-left {
                 animation: marquee-left 35s linear infinite;
               }
               .animate-marquee-right {
                 animation: marquee-right 35s linear infinite;
               }
             `}} />

             <div className="relative w-full flex flex-col gap-4">
                {/* Fade masks */}
                <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

                {/* Track 1: Left */}
                <div className="flex w-max animate-marquee-left">
                  {[
                    "Web Development", "Mobile Applications", "Data Science", "Artificial Intelligence", 
                    "Cloud Computing", "Game Development", "UI/UX Design", "DevOps Engineering",
                    // Duplicated for infinite effect
                    "Web Development", "Mobile Applications", "Data Science", "Artificial Intelligence", 
                    "Cloud Computing", "Game Development", "UI/UX Design", "DevOps Engineering"
                  ].map((domain, i) => (
                    <div key={i} className="px-5 py-2.5 md:px-6 md:py-3 bg-[#0a0a0a] border border-white/10 rounded-full text-neutral-300 font-medium hover:border-accent hover:text-white transition-colors duration-300 hover:shadow-[0_0_15px_rgba(229,9,20,0.2)] cursor-default text-sm md:text-base mx-2 whitespace-nowrap">
                      {domain}
                    </div>
                  ))}
                </div>

                {/* Track 2: Right */}
                <div className="flex w-max animate-marquee-right -ml-[25%]">
                  {[
                    "Internet of Things", "Machine Learning", "System Architecture", "Open Source",
                    "Cyber Security", "Blockchain", "Augmented Reality", "Quantum Computing",
                    // Duplicated for infinite effect
                    "Internet of Things", "Machine Learning", "System Architecture", "Open Source",
                    "Cyber Security", "Blockchain", "Augmented Reality", "Quantum Computing"
                  ].map((domain, i) => (
                    <div key={i} className="px-5 py-2.5 md:px-6 md:py-3 bg-[#0a0a0a] border border-white/10 rounded-full text-neutral-300 font-medium hover:border-accent hover:text-white transition-colors duration-300 hover:shadow-[0_0_15px_rgba(229,9,20,0.2)] cursor-default text-sm md:text-base mx-2 whitespace-nowrap">
                      {domain}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
        <div className="tech-section mb-40 relative w-full h-[750px] md:h-[1000px] flex items-center justify-center overflow-hidden">
          <div className="absolute z-20 w-40 h-40 md:w-56 md:h-56 rounded-full bg-[#111] border border-white/10 flex flex-col items-center justify-center text-center p-4 md:p-6">
            <h2 className="text-lg md:text-2xl font-black text-white leading-tight">
              Powered by<br/>
              <span className="bg-accent text-white px-2 py-1 md:px-3 md:py-1 inline-block mt-2 italic">Modern Tech</span>
            </h2>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @keyframes spin-orbit {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}} />

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-full h-full">
            <OrbitRing radiusMobile={260} radiusDesktop={320} duration={30} reverse={false} icons={iconsOrbit1} />
            <OrbitRing radiusMobile={420} radiusDesktop={520} duration={45} reverse={true} icons={iconsOrbit2} />
            <OrbitRing radiusMobile={580} radiusDesktop={720} duration={60} reverse={false} icons={iconsOrbit3} />
            <OrbitRing radiusMobile={740} radiusDesktop={920} duration={80} reverse={true} icons={iconsOrbit4} />
          </div>
        </div>

        <div className="w-full mb-32 relative z-10 hero-text opacity-0">
          <div className="bg-[#111] border border-white/10 rounded-[3rem] p-10 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden group hover:border-accent/50 transition-colors duration-500">
            <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">See Our Work in Action</h2>
            <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
              Explore the projects we've built, ranging from community portals to high-performance web applications and backend architectures.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
              <Link href="/studio/projects" className="px-10 py-4 bg-white text-black font-extrabold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full sm:w-auto hover:scale-105 transition-transform duration-300">
                View Studio Projects
              </Link>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}

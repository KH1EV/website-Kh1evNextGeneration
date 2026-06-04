"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaLock, FaUsers, FaCode, FaCheckCircle, FaStar, FaRocket, FaHandshake, FaArrowRight } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function JoinUsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.to(".hero-text", {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
      delay: 0.1
    });

    const rows = gsap.utils.toArray(".division-row");
    rows.forEach((row: any, i) => {
      gsap.to(row, {
        scrollTrigger: {
          trigger: row,
          start: "top 80%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      });
    });
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white flex flex-col" ref={containerRef}>
      <Navbar />
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-accent/5 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      <div className="flex-1 pt-40 pb-32 px-4 md:px-[5%] w-full max-w-[1600px] mx-auto relative z-10 flex flex-col">
        
        <div className="text-center mb-32 max-w-7xl mx-auto w-full">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter leading-[1.1] tracking-tight text-white mb-8 hero-text opacity-0 translate-y-10">
            Join the <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4 italic md:whitespace-nowrap">Kh1ev Ecosystem.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-4xl mx-auto leading-relaxed hero-text opacity-0 translate-y-10">
            We are a collective of driven individuals, always welcoming passionate people to join our organization, community divisions, or studio.
          </p>
        </div>

        <div className="flex flex-col gap-24 lg:gap-32 w-full max-w-6xl mx-auto mb-32">
          <div className="division-row opacity-0 translate-y-16 flex flex-col lg:flex-row gap-10 lg:gap-20 items-start group">
            <div className="lg:w-1/3 flex flex-col items-start">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2">
                Kh1ev <br className="hidden lg:block" />
                <span className="text-neutral-500">Organization</span>
              </h2>
              <div className="bg-neutral-900 border border-white/10 text-neutral-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mt-4">
                Invite-Only
              </div>
            </div>
            <div className="lg:w-2/3 flex flex-col">
              <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-300 font-light leading-snug mb-8">
                The core foundation and governing body of the entire Kh1ev ecosystem. Entry to this division is strictly reserved for handpicked individuals.
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 max-w-lg">
                <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Requirements</h4>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-5 h-5 text-neutral-600 mt-0.5 shrink-0" />
                  <span className="text-base text-neutral-400">Classified.</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="division-row opacity-0 translate-y-16 flex flex-col lg:flex-row-reverse gap-10 lg:gap-20 items-start group">
            <div className="lg:w-1/3 flex flex-col items-start lg:items-end lg:text-right">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2">
                Kh1ev <br className="hidden lg:block" />
                <span className="text-accent italic">Community</span>
              </h2>
              <div className="bg-accent/10 border border-accent/20 text-accent text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mt-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-accent rounded-full animate-pulse" /> OPEN
              </div>
            </div>
            <div className="lg:w-2/3 flex flex-col items-start lg:items-end lg:text-right">
              <p className="text-2xl md:text-3xl lg:text-4xl text-white font-light leading-snug mb-8">
                Our massive public hub. We are actively recruiting for various divisions including Moderators, Hosts, Event Organizers etc.
              </p>
              <div className="flex flex-col lg:items-end w-full">
                <div className="bg-accent/5 p-6 rounded-2xl border border-accent/10 max-w-lg mb-8 text-left">
                  <h4 className="text-sm font-bold text-accent uppercase tracking-wider mb-4 border-b border-accent/10 pb-2">Requirements</h4>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-base text-neutral-300">Active participation in our Discord.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaCheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                      <span className="text-base text-neutral-300">Passion for building a positive community.</span>
                    </li>
                  </ul>
                </div>
                <Link href="/recruitment/community" className="group/btn flex items-center gap-4 bg-accent hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-black uppercase tracking-widest transition-all duration-300 text-sm md:text-base">
                  Apply Now <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

          <div className="division-row opacity-0 translate-y-16 flex flex-col lg:flex-row gap-10 lg:gap-20 items-start group">
            <div className="lg:w-1/3 flex flex-col items-start">
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-2">
                Kh1ev <br className="hidden lg:block" />
                <span className="text-neutral-400">Studio</span>
              </h2>
              <div className="bg-neutral-900 border border-white/10 text-neutral-400 text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-widest mt-4">
                Closed
              </div>
            </div>
            <div className="lg:w-2/3 flex flex-col">
              <p className="text-2xl md:text-3xl lg:text-4xl text-neutral-300 font-light leading-snug mb-8">
                The collaborative IT laboratory. We brainstorm and build massive tech projects together as a dedicated team.
              </p>
              <div className="bg-white/5 p-6 rounded-2xl border border-white/5 max-w-lg">
                <h4 className="text-sm font-bold text-neutral-300 uppercase tracking-wider mb-4 border-b border-white/10 pb-2">Requirements</h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-neutral-500 mt-0.5 shrink-0" />
                    <span className="text-base text-neutral-400">Highly supportive & collaborative mindset.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <FaCheckCircle className="w-5 h-5 text-neutral-500 mt-0.5 shrink-0" />
                    <span className="text-base text-neutral-400">Commitment to continuous learning.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto w-full division-row opacity-0 mt-16 pt-24 border-t border-white/5">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
             <div className="md:w-1/2">
               <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tight leading-[1] mb-6 md:mb-0">Why <br/><span className="text-neutral-500">Join Us?</span></h2>
             </div>
             <div className="md:w-1/2">
               <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
                 Being a part of Kh1ev means surrounding yourself with builders, creators, and innovators.
               </p>
             </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                  <FaRocket className="w-6 h-6 text-white group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-white font-bold mb-4">Massive Portfolios</h3>
                <p className="text-neutral-400 text-lg font-light leading-relaxed">Collaborate on large-scale IT projects that will elevate your resume and experience.</p>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                  <FaHandshake className="w-6 h-6 text-white group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-white font-bold mb-4">Networking</h3>
                <p className="text-neutral-400 text-lg font-light leading-relaxed">Connect with passionate developers, designers, and tech enthusiasts.</p>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent/10 group-hover:text-accent transition-colors duration-300">
                  <FaStar className="w-6 h-6 text-white group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-2xl text-white font-bold mb-4">Skill Growth</h3>
                <p className="text-neutral-400 text-lg font-light leading-relaxed">Learn by doing. Gain practical, hands-on experience by building real-world solutions.</p>
              </div>
           </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}

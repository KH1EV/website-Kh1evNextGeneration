"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaLock, FaUsers, FaCode, FaCheckCircle, FaStar, FaRocket, FaHandshake } from "react-icons/fa";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    const cards = gsap.utils.toArray(".division-card");
    cards.forEach((card: any, i) => {
      gsap.to(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        delay: i * 0.1
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

      <div className="flex-1 pt-40 pb-32 px-4 md:px-8 w-full max-w-7xl mx-auto relative z-10 flex flex-col">
        
        <div className="text-center mb-24 md:mb-32 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white mb-8 hero-text opacity-0 translate-y-10">
            Join the <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4 italic">Kh1ev Ecosystem.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed hero-text opacity-0 translate-y-10">
            We are a collective of driven individuals, always welcoming passionate people to join our organization, community divisions, or studio.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24">
          
          <div className="division-card translate-y-10 opacity-0 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500 flex flex-col">
            <div className="w-14 h-14 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <FaLock className="w-5 h-5 text-neutral-400" />
            </div>
            
            <div className="relative z-10 mb-8 flex-grow">
              <h2 className="text-2xl font-black text-white mb-4">Kh1ev Organization</h2>
              <p className="text-neutral-400 leading-relaxed mb-6 text-sm">
                The core foundation and governing body of the entire Kh1ev ecosystem. 
              </p>
              <div className="space-y-3 mt-auto bg-white/5 p-4 rounded-2xl border border-white/5">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Requirements</h4>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-neutral-400 leading-relaxed">unknown.</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 pt-6 border-t border-white/5 mt-auto">
              <button disabled className="w-full py-3 bg-neutral-900/50 text-neutral-600 font-bold rounded-xl cursor-not-allowed text-sm">
                Strictly Invite-Only
              </button>
            </div>
          </div>

          <div className="division-card translate-y-10 opacity-0 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500 flex flex-col">
            <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <FaUsers className="w-5 h-5 text-neutral-500" />
            </div>
            
            <div className="relative z-10 mb-8 flex-grow">
              <h2 className="text-2xl font-black text-white mb-4">Kh1ev Community</h2>
              <p className="text-neutral-400 leading-relaxed mb-6 text-sm">
                Our massive public hub. We recruit for various divisions (Mod, Host, EO) periodically.
              </p>
              <div className="space-y-3 mt-auto bg-white/5 p-4 rounded-2xl border border-white/5">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Requirements</h4>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-neutral-400 leading-relaxed">Active participation in our Discord.</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-neutral-400 leading-relaxed">Passion for building a positive community.</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 pt-6 border-t border-white/5 mt-auto">
              <button disabled className="w-full py-3 bg-neutral-900/50 text-neutral-600 font-bold rounded-xl cursor-not-allowed text-sm">
                Recruitment Closed
              </button>
            </div>
          </div>

          <div className="division-card translate-y-10 opacity-0 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden group hover:border-white/10 transition-all duration-500 flex flex-col relative z-10">
            <div className="w-14 h-14 bg-neutral-900 border border-white/10 rounded-2xl flex items-center justify-center mb-8 relative z-10 group-hover:scale-110 transition-transform duration-500">
              <FaCode className="w-5 h-5 text-neutral-500" />
            </div>
            
            <div className="relative z-10 mb-8 flex-grow">
              <h2 className="text-2xl font-black text-white mb-4">Kh1ev Studio</h2>
              <p className="text-neutral-400 leading-relaxed mb-6 font-medium text-sm">
                The collaborative IT laboratory. We build massive tech projects together.
              </p>
              <div className="space-y-3 mt-auto bg-white/5 p-4 rounded-2xl border border-white/5">
                <h4 className="text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">Requirements</h4>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-neutral-400 leading-relaxed">Highly supportive & collaborative mindset.</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-neutral-400 leading-relaxed">Commitment to continuous learning.</span>
                </div>
                <div className="flex items-start gap-3">
                  <FaCheckCircle className="w-4 h-4 text-neutral-500 mt-0.5 shrink-0" />
                  <span className="text-xs text-neutral-400 leading-relaxed">Bring positive impact to the team.</span>
                </div>
              </div>
            </div>
            
            <div className="relative z-10 pt-6 border-t border-white/5 mt-auto">
              <button disabled className="w-full py-3 bg-neutral-900/50 text-neutral-600 font-bold rounded-xl cursor-not-allowed text-sm">
                Application Closed
              </button>
            </div>
          </div>

        </div>

        <div className="max-w-4xl mx-auto w-full division-card translate-y-10 opacity-0">
           <div className="text-center mb-12">
             <h2 className="text-3xl font-bold text-white mb-4">Why Join Us?</h2>
             <p className="text-neutral-500">Being a part of Kh1ev means surrounding yourself with builders, creators, and innovators.</p>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 text-center hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaRocket className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">Massive Portfolios</h3>
                <p className="text-neutral-400 text-sm">Collaborate on large-scale IT projects that will elevate your resume and experience.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 text-center hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaHandshake className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">Networking</h3>
                <p className="text-neutral-400 text-sm">Connect with passionate developers, designers, and tech enthusiasts.</p>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl p-6 text-center hover:border-white/10 transition-colors">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaStar className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-bold mb-2">Skill Growth</h3>
                <p className="text-neutral-400 text-sm">Learn by doing. Gain practical, hands-on experience by building real-world solutions.</p>
              </div>
           </div>
        </div>

      </div>
      <Footer />
    </main>
  );
}

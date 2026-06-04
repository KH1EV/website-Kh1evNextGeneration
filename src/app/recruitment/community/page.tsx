"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaShieldAlt, FaPaintBrush, FaHandshake, FaCheck, FaArrowRight } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

export default function CommunityRecruitmentPage() {
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

    const sections = gsap.utils.toArray(".role-section");
    sections.forEach((section: any, i) => {
      gsap.to(section, {
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 0.8,
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

      <div className="flex-1 pt-40 pb-32 px-4 md:px-8 w-full max-w-7xl mx-auto relative z-10 flex flex-col">
        
        <div className="text-center mb-24 md:mb-32 max-w-7xl mx-auto relative">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter leading-[1.1] tracking-tight text-white mb-8 hero-text opacity-0 translate-y-10">
            Open <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4 italic md:whitespace-nowrap">Recruitment.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-4xl mx-auto leading-relaxed hero-text opacity-0 translate-y-10">
            We are currently looking for passionate individuals to join the Kh1ev Community staff divisions. Review the available positions and their requirements below.
          </p>
        </div>

        <div className="space-y-16 md:space-y-32">
          <div className="role-section opacity-0 translate-y-10 group">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              
              <div className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 leading-none uppercase">Chat <br/> <span className="text-blue-500 block mt-2">Moderator</span></h2>
                <div className="bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mt-6 inline-block w-max">
                  Moderator Division
                </div>
                <p className="text-neutral-400 leading-relaxed text-lg mt-8 font-light">
                  As a Chat Moderator, you are the frontline of our community. Beyond monitoring discussions and ensuring the server remains safe, your primary responsibility is to actively engage with members and keep the chat lively and welcoming.
                </p>
                <a href="https://forms.gle/DbrkXTysTu6hZP3j7" target="_blank" rel="noreferrer" className="group/btn mt-10 inline-flex items-center justify-between w-full md:w-max gap-6 px-8 py-4 bg-white text-black font-black rounded-full hover:bg-neutral-200 transition-all active:scale-95 text-sm uppercase tracking-widest">
                  Apply Now <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="lg:w-2/3 flex flex-col gap-16">
                <div>
                  <h3 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">Requirements</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Must be at least 16 years old with a strong understanding of communication etiquette.</span>
                    </li>
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Active in the Kh1ev Community Discord server.</span>
                    </li>
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Able to remain neutral, emotionally resilient, and capable of making objective decisions.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">Responsibilities</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Monitor daily chat activities and take strict action against violations according to operational standards.</span>
                    </li>
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-blue-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Welcome new members and assist in answering basic questions about the server.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16 md:mt-32" />
          </div>

          <div className="role-section opacity-0 translate-y-10 group">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              
              <div className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 leading-none uppercase">Visual <br/> <span className="text-pink-500 block mt-2">Designer</span></h2>
                <div className="bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mt-6 inline-block w-max">
                  Creative Division
                </div>
                <p className="text-neutral-400 leading-relaxed text-lg mt-8 font-light">
                  We are looking for creative talents to shape Kh1ev's visual identity. You will be responsible for creating event banners, social media posts, and other visual assets.
                </p>
                <a href="https://forms.gle/DbrkXTysTu6hZP3j7" target="_blank" rel="noreferrer" className="group/btn mt-10 inline-flex items-center justify-between w-full md:w-max gap-6 px-8 py-4 bg-white text-black font-black rounded-full hover:bg-neutral-200 transition-all active:scale-95 text-sm uppercase tracking-widest">
                  Apply Now <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="lg:w-2/3 flex flex-col gap-16">
                <div>
                  <h3 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">Requirements</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-pink-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Possess a design portfolio (sample works) that can be presented during the interview.</span>
                    </li>
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-pink-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Proficient in design software (Photoshop, Illustrator, Figma, Canva Pro, etc.).</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">Responsibilities</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-pink-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Complete design requests according to the deadlines agreed upon with the team.</span>
                    </li>
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-pink-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Open to critique, revisions, and feedback from the Head Division.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-16 md:mt-32" />
          </div>

          <div className="role-section opacity-0 translate-y-10 group">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              
              <div className="lg:w-1/3 lg:sticky lg:top-32 flex flex-col">
                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-2 leading-none uppercase">Partner <br/> <span className="text-green-500 block mt-2">Manager</span></h2>
                <div className="bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold px-4 py-2 rounded-full uppercase tracking-widest mt-6 inline-block w-max">
                  Partner Manager Division
                </div>
                <p className="text-neutral-400 leading-relaxed text-lg mt-8 font-light">
                  Partner Managers are the diplomats of Kh1ev. You will be tasked with seeking, negotiating, and maintaining partnerships with other organizations.
                </p>
                <a href="https://forms.gle/DbrkXTysTu6hZP3j7" target="_blank" rel="noreferrer" className="group/btn mt-10 inline-flex items-center justify-between w-full md:w-max gap-6 px-8 py-4 bg-white text-black font-black rounded-full hover:bg-neutral-200 transition-all active:scale-95 text-sm uppercase tracking-widest">
                  Apply Now <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
              
              <div className="lg:w-2/3 flex flex-col gap-16">
                <div>
                  <h3 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">Requirements</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Possess excellent communication, grammar, and public relations skills.</span>
                    </li>
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Understand the Discord ecosystem and cross-community partnership systems.</span>
                    </li>
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Polite, professional, and able to represent Kh1ev image exceptionally well.</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-3xl font-black text-white mb-8 border-b border-white/10 pb-4">Responsibilities</h3>
                  <ul className="space-y-6">
                    <li className="flex items-start gap-6 group/item">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-1 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors text-neutral-500">
                        <FaCheck className="w-4 h-4" />
                      </div>
                      <span className="text-base md:text-lg text-neutral-300 font-light leading-relaxed">Monitor and ensure partner servers comply with the agreed-upon standards.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
          </div>

        </div>
      </div>
      <Footer />
    </main>
  );
}

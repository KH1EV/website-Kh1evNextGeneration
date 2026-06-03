"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaEye, FaBullseye, FaRocket, FaHandshake, FaStar, FaDiscord, FaCode } from "react-icons/fa";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white" ref={containerRef}>
      <Navbar />

      <section className="relative min-h-[60vh] flex flex-col justify-center px-8 md:px-[5%] pt-40 pb-24">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-center gap-6 md:gap-8 relative z-10">

          <div className="text-center w-full flex flex-col items-center">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight text-white max-w-4xl hero-text opacity-0">
              We are <span className="bg-accent text-white px-3 md:px-6 inline-block mt-2 md:mt-0 italic">Kh1ev.</span><br />
            </h1>
            
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl leading-relaxed mt-6 hero-text opacity-0">
              <span className="text-white font-semibold">Kh1ev Organization</span> is a dynamic organization operating in the digital technology sector.
            </p>
          </div>

          <div className="w-full mt-16 md:mt-24 relative z-10 hero-text opacity-0">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">The Journey</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">From a small group of enthusiasts to a robust digital organization.</p>
            </div>
            
            <div className="max-w-4xl mx-auto relative px-4 md:px-0">
              <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-[2px] bg-white/10 md:-translate-x-1/2"></div>
              
              <div className="flex flex-col gap-12 md:gap-16">
                
                <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                  <div className="hidden md:flex flex-1 justify-end pr-16 text-right">
                    <div>
                      <h3 className="text-2xl font-bold text-accent mb-2">2023</h3>
                      <h4 className="text-xl font-bold text-white mb-2">The Beginning</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">Started as a regular community.</p>
                    </div>
                  </div>
                  <div className="absolute left-[22px] md:left-1/2 w-4 h-4 rounded-full bg-[#111] border-[3px] border-accent md:-translate-x-1/2 mt-[6px] md:mt-0 group-hover:scale-150 group-hover:bg-accent transition-all duration-300 z-10"></div>
                  <div className="md:hidden pl-16 w-full text-left">
                    <h3 className="text-xl font-bold text-accent mb-1">2023</h3>
                    <h4 className="text-lg font-bold text-white mb-2">The Beginning</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">Started as a regular community.</p>
                  </div>
                  <div className="hidden md:block flex-1 pl-16"></div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                  <div className="hidden md:block flex-1 pr-16"></div>
                  <div className="absolute left-[22px] md:left-1/2 w-4 h-4 rounded-full bg-[#111] border-[3px] border-accent md:-translate-x-1/2 mt-[6px] md:mt-0 group-hover:scale-150 group-hover:bg-accent transition-all duration-300 z-10"></div>
                  <div className="md:hidden pl-16 w-full text-left">
                    <h3 className="text-xl font-bold text-accent mb-1">2024</h3>
                    <h4 className="text-lg font-bold text-white mb-2">Technological Steps</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">Remained a regular community, but began seeing technological developments like bots and websites.</p>
                  </div>
                  <div className="hidden md:flex flex-1 pl-16 text-left">
                    <div>
                      <h3 className="text-2xl font-bold text-accent mb-2">2024</h3>
                      <h4 className="text-xl font-bold text-white mb-2">Technological Steps</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">Remained a regular community, but began seeing technological developments like bots and websites.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                  <div className="hidden md:flex flex-1 justify-end pr-16 text-right">
                    <div>
                      <h3 className="text-2xl font-bold text-accent mb-2">2025</h3>
                      <h4 className="text-xl font-bold text-white mb-2">Community Progress</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">Maintained our community roots, but started showing more significant progress and growth.</p>
                    </div>
                  </div>
                  <div className="absolute left-[22px] md:left-1/2 w-4 h-4 rounded-full bg-[#111] border-[3px] border-accent md:-translate-x-1/2 mt-[6px] md:mt-0 group-hover:scale-150 group-hover:bg-accent transition-all duration-300 z-10"></div>
                  <div className="md:hidden pl-16 w-full text-left">
                    <h3 className="text-xl font-bold text-accent mb-1">2025</h3>
                    <h4 className="text-lg font-bold text-white mb-2">Community Progress</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">Maintained our community roots, but started showing more significant progress and growth.</p>
                  </div>
                  <div className="hidden md:block flex-1 pl-16"></div>
                </div>

                <div className="relative flex flex-col md:flex-row items-start md:items-center w-full group">
                  <div className="hidden md:block flex-1 pr-16"></div>
                  <div className="absolute left-[22px] md:left-1/2 w-4 h-4 rounded-full bg-accent border-[3px] border-accent md:-translate-x-1/2 mt-[6px] md:mt-0 group-hover:scale-150 transition-all duration-300 z-10 shadow-[0_0_15px_rgba(229,9,20,0.8)]"></div>
                  <div className="md:hidden pl-16 w-full text-left">
                    <h3 className="text-xl font-bold text-accent mb-1">2026</h3>
                    <h4 className="text-lg font-bold text-white mb-2">Digital Tech Expansion</h4>
                    <p className="text-neutral-400 text-sm leading-relaxed">Just beginning our shift towards digital technology development.</p>
                  </div>
                  <div className="hidden md:flex flex-1 pl-16 text-left">
                    <div>
                      <h3 className="text-2xl font-bold text-accent mb-2">2026</h3>
                      <h4 className="text-xl font-bold text-white mb-2">Digital Tech Expansion</h4>
                      <p className="text-neutral-400 text-sm leading-relaxed">Just beginning our shift towards digital technology development.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full mt-24 md:mt-32 relative z-10 hero-text opacity-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto">
              <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 rounded-[2rem] p-8 md:p-10 hover:border-cyan-500/40 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-cyan-500 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  <FaEye className="w-48 h-48" />
                </div>
                <div className="w-14 h-14 bg-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <FaEye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Our Vision</h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base relative z-10">To become a leading digital tech community and development studio that empowers individuals to innovate, collaborate, and build the future of technology together.</p>
              </div>
              
              <div className="bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-[2rem] p-8 md:p-10 hover:border-red-500/40 transition-all duration-500 group relative overflow-hidden">
                <div className="absolute -right-6 -bottom-6 text-red-500 opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                  <FaBullseye className="w-48 h-48" />
                </div>
                <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 transition-transform duration-300 relative z-10">
                  <FaBullseye className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10">Our Mission</h3>
                <p className="text-neutral-400 leading-relaxed text-sm md:text-base relative z-10">Providing a solid ecosystem for IT enthusiasts to grow, while consistently delivering high-quality digital solutions and fostering a strong, supportive network of tech professionals.</p>
              </div>
            </div>
          </div>

          <div className="w-full mt-24 md:mt-32 relative z-10 hero-text opacity-0">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Core Values</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">The principles that guide our development and community.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 md:px-0">
              <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mb-5 text-purple-500 group-hover:scale-110 transition-transform duration-300">
                  <FaRocket className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Innovation</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Always exploring new technologies and pushing boundaries to build better digital experiences.</p>
              </div>
              <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-3xl p-8 hover:border-blue-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-5 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                  <FaHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Collaboration</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Working together as a unified ecosystem where every member's contribution is valued.</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/20 rounded-3xl p-8 hover:border-yellow-500/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mb-5 text-yellow-500 group-hover:scale-110 transition-transform duration-300">
                  <FaStar className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Excellence</h3>
                <p className="text-sm text-neutral-400 leading-relaxed">Delivering high-quality, robust, and scalable solutions that stand the test of time.</p>
              </div>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-center w-full mt-24 md:mt-32 relative z-10 hero-text opacity-0">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Organization Structure</h2>
              <p className="text-neutral-400 max-w-2xl mx-auto">The core divisions that power the Kh1ev ecosystem.</p>
            </div>
            
            <div className="relative flex flex-col items-center">
              <div className="block relative z-10 bg-[#111] border border-accent/50 rounded-2xl p-6 md:p-8 w-[400px] text-center shadow-[0_0_40px_rgba(229,9,20,0.15)] group hover:border-accent transition-all duration-300 hover:-translate-y-1">
                <div className="absolute inset-0 bg-gradient-to-b from-accent/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Kh1ev Organization</h3>
                <p className="text-sm text-neutral-400 relative z-10">The founding parent organization overseeing all operations and digital divisions.</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-[2px] h-12 bg-gradient-to-b from-accent/50 to-white/20"></div>
                <div className="w-[450px] h-[2px] bg-white/20"></div>
                <div className="flex justify-between w-[450px]">
                  <div className="w-[2px] h-12 bg-gradient-to-b from-white/20 to-accent/30"></div>
                  <div className="w-[2px] h-12 bg-gradient-to-b from-white/20 to-accent/30"></div>
                </div>
              </div>

              <div className="flex gap-20 relative z-10">
                <div className="block relative bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6 md:p-8 w-[350px] text-center group hover:border-red-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 mx-auto bg-red-500/20 rounded-2xl flex items-center justify-center mb-5 text-red-500 group-hover:scale-110 transition-transform duration-300">
                    <FaDiscord className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">Kh1ev Community</h3>
                  <p className="text-sm text-neutral-400 relative z-10">Our vibrant Discord server community. A space for networking, tech discussions, collaboration, and gaming.</p>
                </div>

                <div className="block relative bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-6 md:p-8 w-[350px] text-center group hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 mx-auto bg-blue-500/20 rounded-2xl flex items-center justify-center mb-5 text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <FaCode className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 relative z-10">Kh1ev Studio</h3>
                  <p className="text-sm text-neutral-400 relative z-10">Our digital development wing. Focused on engineering web applications, mobile app, and innovative IT solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="md:hidden flex flex-col items-center w-full mt-20 relative z-10 hero-text opacity-0">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">Organization Structure</h2>
              <p className="text-neutral-400 text-sm max-w-[280px] mx-auto">The core divisions that power the Kh1ev ecosystem.</p>
            </div>
            
            <div className="flex flex-col items-center w-full px-2">
              <div className="block bg-[#111] border border-accent/50 rounded-2xl p-6 w-full max-w-[320px] text-center shadow-[0_0_30px_rgba(229,9,20,0.15)] relative z-10 transition-transform hover:-translate-y-1">
                <h3 className="text-xl font-bold text-white mb-2">Kh1ev Organization</h3>
                <p className="text-xs text-neutral-400">The founding parent organization overseeing all operations.</p>
              </div>

              <div className="flex flex-col items-center w-full my-4">
                <div className="w-[2px] h-6 bg-accent/50"></div>
                <div className="w-[2px] h-2 bg-accent/50 mx-auto rounded-full mt-1 mb-1 animate-pulse"></div>
                <div className="w-[2px] h-6 bg-accent/50"></div>
              </div>

              <div className="flex flex-col gap-6 w-full max-w-[320px]">
                <div className="block bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 rounded-2xl p-6 w-full text-center relative z-10 transition-transform hover:-translate-y-1 hover:border-red-500/50">
                  <div className="w-12 h-12 mx-auto bg-red-500/20 rounded-2xl flex items-center justify-center mb-4 text-red-500">
                    <FaDiscord className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Kh1ev Community</h3>
                  <p className="text-xs text-neutral-400">Discord server community for networking, tech discussion, and gaming.</p>
                </div>

                <div className="block bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20 rounded-2xl p-6 w-full text-center relative z-10 transition-transform hover:-translate-y-1 hover:border-blue-500/50">
                  <div className="w-12 h-12 mx-auto bg-blue-500/20 rounded-2xl flex items-center justify-center mb-4 text-blue-500">
                    <FaCode className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">Kh1ev Studio</h3>
                  <p className="text-xs text-neutral-400">Digital system development wing focused on web apps and IT solutions.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full mt-24 md:mt-32 relative z-10 hero-text opacity-0">
            <div className="bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-white/10 rounded-[3rem] p-10 md:p-16 text-center max-w-5xl mx-auto relative overflow-hidden group">
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Be Part of the Future.</h2>
              <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 relative z-10">
                Whether you're looking to collaborate on open-source projects, need digital solutions, or just want to hang out with tech enthusiasts.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                <a href="https://discord.gg/MwNE7Vfb6t" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black font-bold rounded-full shadow-[0_0_20px_rgba(255,255,255,0.1)] w-full sm:w-auto">
                  Join Discord Server
                </a>
                <a href="/team" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full transition-colors hover:bg-white/10 w-full sm:w-auto">
                  Meet The Team
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </main>
  );
}

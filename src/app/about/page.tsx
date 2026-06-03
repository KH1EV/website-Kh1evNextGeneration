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

          <div className="w-full mt-24 md:mt-40 relative z-10 hero-text opacity-0">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
              
              <div className="flex flex-col md:flex-row border-t border-b border-white/10">
                <div className="flex-1 md:border-r border-white/10 py-16 md:py-24 md:pr-16 relative">
                  <div className="text-[120px] md:text-[200px] font-black text-white/[0.03] absolute top-0 left-0 leading-none select-none pointer-events-none -mt-4 md:-mt-8">01</div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Our Vision</h3>
                    </div>
                    <p className="text-neutral-400 leading-relaxed text-xl md:text-3xl font-light">
                      To become a leading digital tech community and development studio that <strong className="text-white font-semibold">empowers individuals</strong> to innovate, collaborate, and build the future of technology together.
                    </p>
                  </div>
                </div>

                <div className="flex-1 py-16 md:py-24 md:pl-16 relative">
                  <div className="text-[120px] md:text-[200px] font-black text-white/[0.03] absolute top-0 left-0 md:left-16 leading-none select-none pointer-events-none -mt-4 md:-mt-8">02</div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <h3 className="text-3xl md:text-5xl font-bold text-white tracking-tight uppercase">Our Mission</h3>
                    </div>
                    <p className="text-neutral-400 leading-relaxed text-xl md:text-3xl font-light">
                      Providing a <strong className="text-white font-semibold">solid ecosystem</strong> for IT enthusiasts to grow, while consistently delivering high-quality digital solutions and fostering a strong network of tech professionals.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="w-full mt-24 md:mt-40 relative z-10 hero-text opacity-0">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Core Values</h2>
              <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto">The principles that guide our development and community.</p>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 md:px-0">
              <div className="flex flex-col border-b border-white/10">
                
                <div className="group border-t border-white/10 hover:border-white/20 transition-colors duration-500 py-10 md:py-16 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 relative overflow-hidden cursor-default">
                  <div className="absolute top-0 left-0 h-full w-0 bg-white/[0.02] group-hover:w-full transition-all duration-700 ease-out z-0"></div>
                  <div className="relative z-10 text-5xl md:text-7xl font-black text-white/10 group-hover:text-purple-500 transition-colors duration-500 md:w-32">01</div>
                  <div className="relative z-10 flex-1">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-4 transition-transform duration-500">Innovation</h3>
                    <p className="text-lg md:text-xl text-neutral-400 font-light group-hover:translate-x-4 transition-transform duration-500 delay-75 max-w-2xl">
                      We refuse to settle for the ordinary. By constantly exploring cutting-edge technologies and pushing creative boundaries, we engineer digital experiences that redefine industry standards and drive meaningful progress.
                    </p>
                  </div>
                  <div className="relative z-10 hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-white/10 group-hover:border-purple-500 group-hover:-rotate-12 transition-all duration-500 group-hover:scale-110">
                    <FaRocket className="w-8 h-8 text-neutral-600 group-hover:text-purple-500 transition-colors duration-500" />
                  </div>
                </div>

                <div className="group border-t border-white/10 hover:border-white/20 transition-colors duration-500 py-10 md:py-16 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 relative overflow-hidden cursor-default">
                  <div className="absolute top-0 left-0 h-full w-0 bg-white/[0.02] group-hover:w-full transition-all duration-700 ease-out z-0"></div>
                  <div className="relative z-10 text-5xl md:text-7xl font-black text-white/10 group-hover:text-red-500 transition-colors duration-500 md:w-32">02</div>
                  <div className="relative z-10 flex-1">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-4 transition-transform duration-500">Collaboration</h3>
                    <p className="text-lg md:text-xl text-neutral-400 font-light group-hover:translate-x-4 transition-transform duration-500 delay-75 max-w-2xl">
                      Greatness is never achieved alone. We cultivate a unified ecosystem where diverse talents converge. By valuing every member's unique perspective, we build stronger teams and deliver far superior results.
                    </p>
                  </div>
                  <div className="relative z-10 hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-white/10 group-hover:border-red-500 group-hover:rotate-12 transition-all duration-500 group-hover:scale-110">
                    <FaHandshake className="w-8 h-8 text-neutral-600 group-hover:text-red-500 transition-colors duration-500" />
                  </div>
                </div>

                <div className="group border-t border-white/10 hover:border-white/20 transition-colors duration-500 py-10 md:py-16 px-4 md:px-8 flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-16 relative overflow-hidden cursor-default">
                  <div className="absolute top-0 left-0 h-full w-0 bg-white/[0.02] group-hover:w-full transition-all duration-700 ease-out z-0"></div>
                  <div className="relative z-10 text-5xl md:text-7xl font-black text-white/10 group-hover:text-blue-500 transition-colors duration-500 md:w-32">03</div>
                  <div className="relative z-10 flex-1">
                    <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight group-hover:translate-x-4 transition-transform duration-500">Excellence</h3>
                    <p className="text-lg md:text-xl text-neutral-400 font-light group-hover:translate-x-4 transition-transform duration-500 delay-75 max-w-2xl">
                      Compromise is not in our vocabulary. We are committed to delivering high-quality, robust, and infinitely scalable digital solutions that not only meet today's demands but are engineered to stand the test of time.
                    </p>
                  </div>
                  <div className="relative z-10 hidden md:flex items-center justify-center w-24 h-24 rounded-full border border-white/10 group-hover:border-blue-500 group-hover:-rotate-12 transition-all duration-500 group-hover:scale-110">
                    <FaStar className="w-8 h-8 text-neutral-600 group-hover:text-blue-500 transition-colors duration-500" />
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="w-full mt-24 md:mt-40 relative z-10 hero-text opacity-0">
            <div className="text-center mb-16 md:mb-24">
              <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">Organization Structure</h2>
              <p className="text-neutral-400 text-xl font-light max-w-2xl mx-auto">The core divisions that power the Kh1ev ecosystem.</p>
            </div>

            <div className="hidden md:flex flex-col items-center w-full max-w-5xl mx-auto">
              <div className="relative z-10 bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 w-[600px] text-center group shadow-2xl overflow-hidden cursor-default hover:border-white/20 transition-all duration-700">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
                <h3 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-4 relative z-10 tracking-tight uppercase">Kh1ev Organization</h3>
                <p className="text-lg text-neutral-400 font-light relative z-10">The founding parent organization overseeing all operations and digital divisions.</p>
              </div>

              <div className="flex flex-col items-center relative z-0 -mt-2">
                <div className="w-[1px] h-16 bg-gradient-to-b from-white/20 to-white/10"></div>
                <div className="w-[650px] h-[1px] bg-white/10"></div>
                <div className="flex justify-between w-[650px]">
                  <div className="w-[1px] h-16 bg-gradient-to-b from-white/10 to-white/5"></div>
                  <div className="w-[1px] h-16 bg-gradient-to-b from-white/10 to-white/5"></div>
                </div>
              </div>

              <div className="flex justify-between w-[900px] relative z-10 -mt-2">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 w-[420px] text-center group transition-all duration-700 shadow-2xl overflow-hidden relative cursor-default hover:border-white/20">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 text-red-500 border border-red-500/20 bg-red-500/5 group-hover:bg-red-500/10 transition-all duration-500 shadow-[0_0_20px_rgba(239,68,68,0.15)] group-hover:shadow-[0_0_40px_rgba(239,68,68,0.5)] relative z-10">
                    <FaDiscord className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 relative z-10 tracking-tight uppercase">Kh1ev Community</h3>
                  <p className="text-lg text-neutral-400 font-light relative z-10">Our vibrant Discord server community. A space for networking, tech discussions, collaboration, and gaming.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] p-10 w-[420px] text-center group transition-all duration-700 shadow-2xl overflow-hidden relative cursor-default hover:border-white/20">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 text-blue-500 border border-blue-500/20 bg-blue-500/5 group-hover:bg-blue-500/10 transition-all duration-500 shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_40px_rgba(59,130,246,0.5)] relative z-10">
                    <FaCode className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4 relative z-10 tracking-tight uppercase">Kh1ev Studio</h3>
                  <p className="text-lg text-neutral-400 font-light relative z-10">Our digital development wing. Focused on engineering web applications, mobile app, and innovative IT solutions.</p>
                </div>
              </div>
            </div>

            <div className="md:hidden flex flex-col items-center w-full px-4">
              <div className="relative z-10 bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 w-full max-w-[340px] text-center group overflow-hidden">
                <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-2 relative z-10 uppercase tracking-tight">Kh1ev Organization</h3>
                <p className="text-sm text-neutral-400 font-light relative z-10">The founding parent organization overseeing all operations.</p>
              </div>

              <div className="flex flex-col items-center w-full my-4 relative z-0">
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/20 to-white/5"></div>
              </div>

              <div className="flex flex-col gap-6 w-full max-w-[340px]">
                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 w-full text-center relative overflow-hidden group">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 text-red-500 border border-red-500/20 bg-red-500/5">
                    <FaDiscord className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight uppercase">Kh1ev Community</h3>
                  <p className="text-sm text-neutral-400 font-light">Discord server community for networking, tech discussion, and gaming.</p>
                </div>

                <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 w-full text-center relative overflow-hidden group">
                  <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 text-blue-500 border border-blue-500/20 bg-blue-500/5">
                    <FaCode className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2 tracking-tight uppercase">Kh1ev Studio</h3>
                  <p className="text-sm text-neutral-400 font-light">Digital system development wing focused on web apps and IT solutions.</p>
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
                <a href="/join" className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full transition-colors hover:bg-white/10 w-full sm:w-auto">
                  Join Us
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

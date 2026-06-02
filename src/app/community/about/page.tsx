"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaGamepad, FaComments, FaMusic, FaHeart, FaDiscord, FaTrophy, FaRobot, FaCode, FaMicrophoneAlt, FaUsers } from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function AboutCommunity() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    tl.fromTo(
      ".stat-item",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.5)" },
      "-=0.4"
    );

    gsap.fromTo(
      ".feature-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".role-badge",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".roles-section",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".cta-box",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".cta-section",
          start: "top 85%",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white flex flex-col" ref={containerRef}>
      <Navbar />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[#5865F2]/5 rounded-full blur-[150px] pointer-events-none"></div>

      <div className="flex-1 pt-40 px-4 md:px-8 w-full max-w-6xl mx-auto relative z-10 flex flex-col">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 hero-text leading-[1.1] opacity-0">
            Welcome to <br />
            <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4">Kh1ev Community.</span>
          </h1>
          <p className="text-neutral-400 text-base md:text-xl max-w-2xl mx-auto hero-text leading-relaxed opacity-0">
            While Kh1ev Organization focuses on building top-tier IT projects, 
            <strong className="text-white"> Kh1ev Community</strong> is our living room. 
            A vibrant, casual hub where developers, gamers, and friends hang out without the stress of deadlines.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-20 mb-32 border-y border-white/5 py-10">
          <div className="text-center stat-item opacity-0">
            <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 flex items-center justify-center gap-3">
              <FaUsers className="text-[#5865F2] w-8 h-8 md:w-10 md:h-10" /> 1,500+
            </div>
            <div className="text-neutral-500 text-xs md:text-sm tracking-widest uppercase font-semibold">Active Members</div>
          </div>
          <div className="text-center stat-item opacity-0">
            <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 flex items-center justify-center gap-3">
              <FaMicrophoneAlt className="text-green-500 w-8 h-8 md:w-10 md:h-10" /> 24/7
            </div>
            <div className="text-neutral-500 text-xs md:text-sm tracking-widest uppercase font-semibold">Voice Activity</div>
          </div>
          <div className="text-center stat-item opacity-0">
            <div className="text-3xl md:text-5xl font-extrabold text-white mb-2 flex items-center justify-center gap-3">
              <FaRobot className="text-accent w-8 h-8 md:w-10 md:h-10" /> Custom
            </div>
            <div className="text-neutral-500 text-xs md:text-sm tracking-widest uppercase font-semibold">Server Bots</div>
          </div>
        </div>

        <div className="features-section mb-32">
          <div className="flex flex-col items-center mb-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">What We Do.</h2>
            <p className="text-neutral-400 max-w-2xl">More than just a chatroom. We host events, collaborate on mini-projects, and build lasting friendships.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 md:col-span-2 feature-card opacity-0 bg-gradient-to-br from-[#5865F2]/10 to-transparent border border-[#5865F2]/20 p-8 md:p-10 rounded-[2rem] hover:border-[#5865F2]/40 transition-all duration-500 relative overflow-hidden group">
              <div className="absolute -right-10 -bottom-10 text-[#5865F2] opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                <FaDiscord className="w-64 h-64" />
              </div>
              <div className="w-14 h-14 bg-[#5865F2]/20 rounded-2xl flex items-center justify-center mb-6 text-[#5865F2] relative z-10">
                <FaComments className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Active Chat & Voice</h3>
              <p className="text-neutral-300 text-base md:text-lg leading-relaxed relative z-10 max-w-xl">
                Our main hub for daily conversations. Whether you want to talk about the latest tech news, anime episodes, or just vent about your day, there's always someone online to listen and chat with.
              </p>
            </div>

            <div className="col-span-1 feature-card opacity-0 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 p-8 md:p-10 rounded-[2rem] hover:border-red-500/40 transition-all duration-500 group">
              <div className="w-14 h-14 bg-red-500/20 rounded-2xl flex items-center justify-center mb-6 text-red-500">
                <FaGamepad className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Gaming Nights</h3>
              <p className="text-neutral-400 leading-relaxed">
                Regular community game nights. Valorant, Minecraft, Roblox, etc. It's all about having fun.
              </p>
            </div>

            <div className="col-span-1 feature-card opacity-0 bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20 p-8 md:p-10 rounded-[2rem] hover:border-green-500/40 transition-all duration-500 group">
              <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 text-green-500">
                <FaMusic className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Music & Chill</h3>
              <p className="text-neutral-400 leading-relaxed">
                Hop into our Lo-Fi lounges. Share your Spotify playlists or use our bots to blast tunes while coding.
              </p>
            </div>

            <div className="col-span-1 feature-card opacity-0 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 p-8 md:p-10 rounded-[2rem] hover:border-purple-500/40 transition-all duration-500 group">
              <div className="w-14 h-14 bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6 text-purple-500">
                <FaCode className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Code Collabs</h3>
              <p className="text-neutral-400 leading-relaxed">
                Find partners for your side projects, ask for debugging help, or join our monthly hackathons.
              </p>
            </div>

            <div className="col-span-1 feature-card opacity-0 bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/20 p-8 md:p-10 rounded-[2rem] hover:border-pink-500/40 transition-all duration-500 group">
              <div className="w-14 h-14 bg-pink-500/20 rounded-2xl flex items-center justify-center mb-6 text-pink-500">
                <FaHeart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Safe Space</h3>
              <p className="text-neutral-400 leading-relaxed">
                A heavily moderated, toxic-free environment. We respect everyone regardless of background.
              </p>
            </div>
          </div>
        </div>

        <div className="cta-section mb-32">
          <div className="cta-box opacity-0 bg-gradient-to-r from-[#5865F2] to-[#404eed] rounded-[2rem] p-10 md:p-16 text-center relative overflow-hidden shadow-[0_0_40px_rgba(88,101,242,0.3)]">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-black/20">
                <FaDiscord className="w-12 h-12 text-[#5865F2]" />
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Ready to Join Us?</h2>
              <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
                Become a part of the fastest-growing community of developers, gamers, and creatives. Click the button below to join our Discord server.
              </p>
              <Link href="https://discord.gg/kh1ev" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-[#5865F2] font-extrabold text-lg rounded-xl hover:bg-gray-100 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-3">
                Join Discord Server
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

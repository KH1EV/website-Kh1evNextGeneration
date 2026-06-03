"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaGamepad, FaComments, FaMusic, FaHeart, FaDiscord, FaTrophy, FaRobot, FaCode, FaMicrophoneAlt, FaUsers, FaBookOpen } from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(useGSAP, ScrollTrigger);

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
      ".feature-item",
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
      <div className="flex-1 pt-40 px-4 md:px-8 w-full max-w-6xl mx-auto relative z-10 flex flex-col">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-8 hero-text leading-[1.1] opacity-0">
            Welcome to <br />
            <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4 italic">Kh1ev Community.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto hero-text leading-relaxed opacity-0">
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

        <div className="features-section mb-32 max-w-6xl mx-auto w-full">
          <div className="flex flex-col mb-16 md:mb-24">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white uppercase tracking-tight mb-6">What We Do.</h2>
            <div className="w-24 h-2 bg-accent mb-8"></div>
            <p className="text-neutral-400 max-w-3xl text-lg md:text-2xl leading-relaxed font-light">
              More than just a chatroom. We host events, collaborate on mini-projects, and build lasting friendships.
            </p>
          </div>

          <div className="flex flex-col gap-16 md:gap-32 border-t border-white/10 pt-16 md:pt-24">
            {[
              {
                title: "Active Members",
                desc: "Our main hub for daily conversations. Whether you want to talk about game, anime episodes, or just vent about your day, there's always someone online to listen and chat with.",
                icon: FaComments,
                color: "text-[#5865F2]"
              },
              {
                title: "Gaming Nights",
                desc: "Regular community game nights. Valorant, Minecraft, Roblox, etc. It's all about having fun, strategizing together, and building unforgettable moments in-game.",
                icon: FaGamepad,
                color: "text-red-500"
              },
              {
                title: "Music & Chill",
                desc: "Hop into our Lo-Fi lounges. Share your Spotify playlists or use our bots to blast tunes while coding. A dedicated space to relax and discover new music with friends.",
                icon: FaMusic,
                color: "text-green-500"
              },
              {
                title: "Code Collabs",
                desc: "Find partners for your side projects or ask for debugging help. A collaborative environment designed to elevate your programming skills.",
                icon: FaCode,
                color: "text-purple-500"
              },
              {
                title: "Study Together",
                desc: "We don't just code. Need advice for school or college, or looking for study partners? Hop into a voice channel, share your screen, and tackle homework or assignments together in a supportive environment.",
                icon: FaBookOpen,
                color: "text-yellow-500"
              },
              {
                title: "Safe Space",
                desc: "A heavily moderated, toxic-free environment. We respect everyone regardless of background. Your peace of mind and comfort are our top priorities in the community.",
                icon: FaHeart,
                color: "text-pink-500"
              }
            ].map((feature, index) => (
              <div key={index} className="feature-item opacity-0 flex flex-col md:flex-row gap-8 md:gap-16 items-start group">
                <div className="w-full md:w-1/3 md:sticky md:top-32 flex flex-col">
                  <div className="flex items-center gap-6 mb-6">
                    <div className="text-6xl md:text-8xl font-black text-white/5 transition-colors duration-500 group-hover:text-white/10">
                      0{index + 1}
                    </div>
                    <div className={`w-16 h-16 md:w-20 md:h-20 rounded-[2rem] bg-white/5 flex items-center justify-center ${feature.color} border border-white/5 group-hover:border-white/20 transition-all duration-500`}>
                      <feature.icon className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight uppercase leading-tight">
                    {feature.title}
                  </h3>
                </div>
                <div className="w-full md:w-2/3 md:pt-4">
                  <p className="text-neutral-400 text-xl md:text-3xl font-light leading-relaxed md:leading-snug group-hover:text-neutral-200 transition-colors duration-500">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
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

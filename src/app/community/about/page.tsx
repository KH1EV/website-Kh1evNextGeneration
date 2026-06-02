"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaGamepad, FaComments, FaMusic, FaHeart } from "react-icons/fa";

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
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white flex flex-col" ref={containerRef}>
      <Navbar />

      <div className="flex-1 pt-32 px-4 md:px-8 w-full max-w-6xl mx-auto relative z-10 flex flex-col">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 hero-text leading-tight opacity-0">
            Welcome to <br />
            <span className="text-accent">Kh1ev Community.</span>
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-2xl mx-auto hero-text leading-relaxed opacity-0">
            While Kh1ev Organization focuses on building top-tier IT projects, 
            <strong className="text-white"> Kh1ev Community</strong> is our living room. 
            It's a vibrant, casual hub where developers, gamers, and friends hang out, 
            play games, listen to music, and share memes without the stress of deadlines.
          </p>
        </div>
        <div className="features-section grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          <div className="feature-card bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-[#5865F2]/10 rounded-2xl flex items-center justify-center mb-6 text-[#5865F2] group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <FaComments className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Active Chat</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              24/7 active voice and text channels. Whether you want to talk about tech, anime, or just how your day went, there's always someone to listen.
            </p>
          </div>

          <div className="feature-card bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <FaGamepad className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Gaming Nights</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              We host regular community game nights. Valorant, Minecraft, Party Animals, you name it. It's all about having fun and creating memories.
            </p>
          </div>

          <div className="feature-card bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 text-green-500 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
              <FaMusic className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Music & Chill</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Hop into our Lo-Fi lounges. Share your Spotify playlists or use our custom bots to blast your favorite tunes while working or chilling.
            </p>
          </div>

          <div className="feature-card bg-white/[0.02] border border-white/5 p-8 rounded-3xl hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group">
            <div className="w-14 h-14 bg-pink-500/10 rounded-2xl flex items-center justify-center mb-6 text-pink-500 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
              <FaHeart className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Safe Space</h3>
            <p className="text-neutral-400 text-sm leading-relaxed">
              A heavily moderated, toxic-free environment. We respect everyone regardless of background. Toxicity is left at the door.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

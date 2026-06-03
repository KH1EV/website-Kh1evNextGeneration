"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

interface DiscordMember {
  id: string;
  username: string;
  status: 'online' | 'idle' | 'dnd';
  avatar_url: string;
}

interface DiscordWidget {
  presence_count: number;
  members: DiscordMember[];
}

const ecosystemTags = [
  "Web Development", "Community Events", "UI/UX Design", "Game Nights",
  "Discord Bots", "Open Source", "Cybersecurity", "Public Networking",
  "Artificial Intelligence", "Esports Tournaments", "Cloud Computing",
  "Creative Arts", "Game Development", "Tech Discussions",
  "Data Science", "Collaborative Projects", "Backend Architecture",
  "Hangout Lounge", "System Administration", "Mentorship"
];

const dummyDiscordUsers: DiscordMember[] = Array.from({ length: 40 }).map((_, i) => ({
  id: String(i),
  username: `User${i}`,
  avatar_url: `https://i.pravatar.cc/150?u=${i + 100}`,
  status: ['online', 'idle', 'dnd'][i % 3] as 'online' | 'idle' | 'dnd'
}));

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const discordMarqueeRef = useRef<HTMLDivElement>(null);

  const [discordData, setDiscordData] = useState<DiscordWidget | null>(null);
  const [totalMembers, setTotalMembers] = useState(1550);

  useEffect(() => {
    const fetchDiscord = async () => {
      try {
        const serverId = process.env.NEXT_PUBLIC_DISCORD_SERVER_ID || "1065405418349797417";
        const [widgetRes, statsRes] = await Promise.all([
          fetch(`https://discord.com/api/guilds/${serverId}/widget.json`).catch(() => null),
          fetch('/api/discord-stats').catch(() => null)
        ]);
        
        if (widgetRes && widgetRes.ok) {
          const data = await widgetRes.json();
          setDiscordData({
            presence_count: data.presence_count,
            members: data.members || []
          });
        }
        
        if (statsRes && statsRes.ok) {
          const stats = await statsRes.json();
          if (stats.total) setTotalMembers(stats.total);
        }
      } catch (err) {
        console.error("Error fetching Discord widget:", err);
      }
    };
    fetchDiscord();
  }, []);

  const displayMembers = discordData?.members?.length ? discordData.members : dummyDiscordUsers;
  const onlineCount = discordData ? discordData.presence_count : 375;
  const offlineCount = Math.max(0, totalMembers - onlineCount);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(".preloader-text", 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .to(".preloader-line", 
      { width: 120, duration: 0.8, ease: "power3.inOut" }, 
      "-=0.2"
    )
    .to(".preloader-text", 
      { y: -50, opacity: 0, duration: 0.6, ease: "power3.in" }, 
      "+=0.4"
    )
    .to(".preloader-line", 
      { y: -50, opacity: 0, duration: 0.6, ease: "power3.in" }, 
      "-=0.6"
    )
    .to(".preloader", 
      { yPercent: -100, duration: 1, ease: "power4.inOut" }
    )
    .fromTo(".nav-element",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=0.5"
    )
    .fromTo(".brand-name", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" },
      "-=0.4"
    )
    .fromTo(".headline-line", 
      { y: 100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", stagger: 0.15 },
      "-=0.6"
    )
    .fromTo(".description", 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    )
    .fromTo(".cta-wrapper", 
      { opacity: 0, y: 20 }, 
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    );

    gsap.to(".accent-line", {
      scaleX: 1.2,
      opacity: 0.8,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });
    if (marqueeRef.current) {
      gsap.to(".marquee-content", {
        xPercent: -50,
        ease: "none",
        duration: 80,
        repeat: -1,
      });
    }

    if (discordMarqueeRef.current) {
      gsap.to(".discord-marquee-content", {
        xPercent: -50,
        ease: "none",
        duration: 35,
        repeat: -1,
      });
    }

  }, { scope: container });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white" ref={container}>
      <div className="preloader fixed inset-0 z-[9999] bg-background flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 overflow-hidden py-10">
          <div className="preloader-text text-2xl md:text-4xl font-extrabold tracking-[0.2em] text-white">
            KH1EV
          </div>
          <div className="preloader-line h-[2px] w-0 bg-accent"></div>
        </div>
      </div>
      <Navbar />

      <section className="relative min-h-[80vh] flex flex-col justify-center px-8 md:px-[5%] pt-32 pb-16">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-center text-center gap-10 md:gap-12 relative z-10">
          
          <div className="flex items-center gap-4">
            <div className="accent-line h-[2px] w-[30px] md:w-[50px] bg-accent origin-right"></div>
            <span className="brand-name text-xl md:text-2xl font-extrabold tracking-widest text-foreground">KH1EV</span>
            <div className="accent-line h-[2px] w-[30px] md:w-[50px] bg-accent origin-left"></div>
          </div>

          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col gap-0 md:gap-2">
              <div className="overflow-hidden pb-1 -mb-1">
                <h1 className="headline-line text-4xl sm:text-5xl md:text-[7vw] lg:text-[6rem] font-extrabold leading-[1.1] md:leading-[1] tracking-tight text-foreground m-0">
                  One Unified
                </h1>
              </div>
              <div className="overflow-hidden pb-1 -mb-1">
                <h1 className="headline-line text-4xl sm:text-5xl md:text-[7vw] lg:text-[6rem] font-extrabold leading-[1.1] md:leading-[1] tracking-tight text-foreground m-0">
                  <span className="bg-accent text-white px-3 md:px-6 inline-block italic">Kh1ev Ecosystem.</span>
                </h1>
              </div>
            </div>
            
            <p className="description text-base md:text-lg lg:text-xl text-neutral-400 max-w-[700px] leading-relaxed mt-2">
              A unified network built for the future of tech. The Kh1ev ecosystem is divided into three core pillars. The governing <strong className="text-white">Organization</strong>, our massive <strong className="text-white">Community</strong>, and the development <strong className="text-white">Studio</strong>.
            </p>

            {/* <div className="cta-wrapper mt-6 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <div className="group flex items-center gap-4 px-6 py-3.5 bg-white/[0.02] border border-white/10 rounded-full hover:bg-white/[0.05] hover:border-white/30 transition-all w-full sm:w-auto cursor-default">
                 <div className="w-2 h-2 rounded-full bg-white group-hover:scale-150 transition-transform"></div>
                 <span className="text-white font-bold text-sm tracking-wide">Organization</span>
              </div>
              <Link href="/community/about" className="group flex items-center gap-4 px-6 py-3.5 bg-white/[0.02] border border-white/10 rounded-full hover:bg-accent/10 hover:border-accent/50 transition-all w-full sm:w-auto">
                 <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                 <span className="text-white font-bold text-sm tracking-wide">Community</span>
              </Link>
              <Link href="/studio/about" className="group flex items-center gap-4 px-6 py-3.5 bg-white/[0.02] border border-white/10 rounded-full hover:bg-[#23a559]/10 hover:border-[#23a559]/50 transition-all w-full sm:w-auto">
                 <div className="w-2 h-2 rounded-full bg-[#23a559]"></div>
                 <span className="text-white font-bold text-sm tracking-wide">Studio</span>
              </Link>
            </div> */}
          </div>

        </div>
      </section>

      <section className="py-8 overflow-hidden border-y border-white/5 bg-white/[0.01]" ref={marqueeRef}>
        <div className="flex w-max">
          <div className="marquee-content flex w-max justify-around items-center text-xl md:text-3xl font-extrabold text-white/10 tracking-widest uppercase whitespace-nowrap gap-8 px-4">
            {ecosystemTags.map((field, idx) => [
              <span key={`text-orig-${idx}`}>{field}</span>,
              <span key={`dot-orig-${idx}`} className="text-accent/50">•</span>
            ])}

            {ecosystemTags.map((field, idx) => [
              <span key={`text-dup-${idx}`}>{field}</span>,
              <span key={`dot-dup-${idx}`} className="text-accent/50">•</span>
            ])}
          </div>
        </div>
      </section>

      <section className="py-4 border-b border-white/5 bg-background overflow-hidden flex relative z-10" ref={discordMarqueeRef}>
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-0 w-full">
          <div className="flex flex-wrap items-center gap-3 md:gap-4 shrink-0 z-10 bg-background px-4 md:px-0 md:pl-[5%] md:pr-10 relative w-full md:w-auto">
            <div className="flex items-center gap-2 md:gap-3">
              <span className="text-red-500 font-bold tracking-widest text-sm">LIVE</span>
              <div className="w-2 h-2 rounded-full bg-[#23a559]"></div>
              <span className="text-white font-bold text-base md:text-lg">{totalMembers.toLocaleString('id-ID')} <span className="text-neutral-500 font-normal">anggota</span></span>
            </div>
            
            <div className="flex items-center gap-2 md:gap-3">
              <div className="px-2.5 md:px-3 py-1 rounded-full border border-[#23a559]/30 bg-[#23a559]/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#23a559]"></div>
                <span className="text-[#23a559] text-[10px] md:text-xs font-semibold">{onlineCount.toLocaleString('id-ID')} Online</span>
              </div>
              <div className="px-2.5 md:px-3 py-1 rounded-full border border-neutral-500/30 bg-neutral-500/10 flex items-center gap-2">
                <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-neutral-500"></div>
                <span className="text-neutral-400 text-[10px] md:text-xs font-semibold">{offlineCount.toLocaleString('id-ID')} Offline</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-hidden relative">
            <div className="flex w-max">
              <div className="discord-marquee-content flex w-max items-center gap-3 pr-3">
                {displayMembers.map((user) => (
                  <div key={`orig-${user.id}`} className="relative w-10 h-10 md:w-11 md:h-11 shrink-0">
                    <img src={user.avatar_url} alt={user.username} className="w-full h-full rounded-full object-cover border-[3px] border-background" />
                    <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[3px] border-background ${
                      user.status === 'online' ? 'bg-[#23a559]' : user.status === 'idle' ? 'bg-[#f0b132]' : 'bg-[#f23f42]'
                    }`}></div>
                  </div>
                ))}
                {/* Duplicated for infinite loop */}
                {displayMembers.map((user) => (
                  <div key={`dup-${user.id}`} className="relative w-10 h-10 md:w-11 md:h-11 shrink-0">
                    <img src={user.avatar_url} alt={user.username} className="w-full h-full rounded-full object-cover border-[3px] border-background" />
                    <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-[3px] border-background ${
                      user.status === 'online' ? 'bg-[#23a559]' : user.status === 'idle' ? 'bg-[#f0b132]' : 'bg-[#f23f42]'
                    }`}></div>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

  {/* <section className="py-20 md:py-32 px-6 md:px-[5%] relative z-10">
        <div className="max-w-[1440px] w-full mx-auto flex flex-col gap-12 md:gap-20">
          
          <div className="flex flex-col gap-6 text-center items-center">
            <h2 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight">Everything you need.</h2>
            <p className="text-neutral-400 max-w-2xl text-base md:text-lg">From building high-performance digital systems to just chilling in our community lounge, Kh1ev is built for modern creators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 md:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Software Engineering</h3>
                  <p className="text-neutral-400 text-base leading-relaxed max-w-md">End-to-end development of scalable web applications, powerful mobile apps, and robust enterprise systems.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 md:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Cyber Security</h3>
                  <p className="text-neutral-400 text-base leading-relaxed">Protecting your digital assets with advanced penetration testing and threat mitigation.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 md:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Cloud & Infra</h3>
                  <p className="text-neutral-400 text-base leading-relaxed">Secure server management and high-availability cloud deployments.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 md:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Bot Automation</h3>
                  <p className="text-neutral-400 text-base leading-relaxed">Custom Discord bots to streamline moderation and supercharge your community.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 md:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">UI/UX Design</h3>
                  <p className="text-neutral-400 text-base leading-relaxed">Crafting pixel-perfect, intuitive interfaces that elevate digital experiences.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-8 md:p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center h-full justify-between min-h-[150px]">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 group-hover:text-accent transition-colors duration-300">Kh1ev Community</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed max-w-3xl">Beyond the code, we are a thriving ecosystem. Join our community to network with tech enthusiasts, collaborate on open-source projects, or just chill and play games together.</p>
                </div>
                <div className="hidden lg:flex shrink-0 pl-8">
                  <a href="https://discord.gg/MwNE7Vfb6t" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-white text-black font-bold rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(229,9,20,0.6)]">
                    Join Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* <Footer /> */}
    </main>
  );
}

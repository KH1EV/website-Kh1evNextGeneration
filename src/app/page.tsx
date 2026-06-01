"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaDiscord, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const techFields = [
  "Web Development", "App Development", "Discord Bots", "IT Infrastructure",
  "UI/UX Design", "Cloud Computing", "Cybersecurity", "Data Science",
  "Artificial Intelligence", "Machine Learning", "Game Development",
  "DevOps", "System Administration", "Blockchain", "Backend Architecture",
  "Frontend Engineering", "Penetration Testing", "Game Design"
];

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);

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

  }, { scope: container });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white" ref={container}>
      <div className="preloader fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-4 overflow-hidden py-10">
          <div className="preloader-text text-3xl md:text-5xl font-extrabold tracking-[0.2em] text-white">
            KH1EV.
          </div>
          <div className="preloader-line h-[2px] w-0 bg-accent"></div>
        </div>
      </div>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-3xl px-4">
        <nav className="nav-element flex items-center justify-between backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full px-6 py-3 shadow-2xl">
          <div className="font-extrabold tracking-widest text-lg text-white">KH1EV.</div>
          
          <a href="https://discord.gg/MwNE7Vfb6t" target="_blank" rel="noopener noreferrer" className="group relative px-6 py-2.5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] block">
            <div className="absolute inset-0 w-0 bg-accent transition-all duration-300 ease-out group-hover:w-full"></div>
            <span className="relative flex items-center gap-2 group-hover:text-white transition-colors duration-300 text-sm">
              Join Community
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
          </a>
        </nav>
      </div>

      <section className="relative min-h-screen flex flex-col justify-center px-8 md:px-[5%] pt-20">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1200px] w-full mx-auto flex flex-col gap-16 relative z-10">
          
          <div className="flex items-center gap-4">
            <span className="brand-name text-2xl font-extrabold tracking-widest text-foreground">KH1EV.</span>
            <div className="accent-line h-[2px] w-[60px] bg-accent origin-left"></div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="overflow-hidden pb-1 -mb-1">
              <h1 className="headline-line text-5xl md:text-[8vw] lg:text-[6.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground m-0">
                IT Development
              </h1>
            </div>
            <div className="overflow-hidden pb-1 -mb-1">
              <h1 className="headline-line text-5xl md:text-[8vw] lg:text-[6.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground m-0">
                <span className="text-accent">& Community Hub.</span>
              </h1>
            </div>
            
            <p className="description text-base md:text-lg lg:text-xl text-neutral-400 max-w-[600px] leading-relaxed mt-4">
              Kh1ev Organization is a space focused on IT development and tech projects. Beyond work and code, we are a casual community hub to connect, hang out, and play together.
            </p>

            <div className="cta-wrapper mt-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-full text-sm font-semibold tracking-wider uppercase text-foreground">
                <div className="relative w-2 h-2 bg-accent rounded-full">
                  <div className="absolute inset-0 w-full h-full bg-accent rounded-full animate-ping opacity-75"></div>
                </div>
                Coming Soon
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="py-8 overflow-hidden border-y border-white/5 bg-white/[0.01]" ref={marqueeRef}>
        <div className="flex w-max">
          <div className="marquee-content flex w-max justify-around items-center text-2xl md:text-4xl font-extrabold text-white/10 tracking-widest uppercase whitespace-nowrap gap-8 px-4">
            {techFields.map((field, idx) => [
              <span key={`text-orig-${idx}`}>{field}</span>,
              <span key={`dot-orig-${idx}`} className="text-accent/50">•</span>
            ])}

            {techFields.map((field, idx) => [
              <span key={`text-dup-${idx}`}>{field}</span>,
              <span key={`dot-dup-${idx}`} className="text-accent/50">•</span>
            ])}
          </div>
        </div>
      </section>

      <section className="py-32 px-8 md:px-[5%] relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-20">
          
          <div className="flex flex-col gap-6 text-center items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">Everything you need.</h2>
            <p className="text-neutral-400 max-w-2xl text-lg md:text-xl">From building high-performance digital systems to just chilling in our community lounge, Kh1ev is built for modern creators.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Software Engineering</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed max-w-md">End-to-end development of scalable web applications, powerful mobile apps, and robust enterprise systems.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-bl from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Cyber Security</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">Protecting your digital assets with advanced penetration testing and threat mitigation.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" /></svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Cloud & Infra</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">Secure server management and high-availability cloud deployments.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">Bot Automation</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">Custom Discord bots to streamline moderation and supercharge your community.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-tl from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col h-full justify-between min-h-[300px]">
                <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-6 ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors duration-300">UI/UX Design</h3>
                  <p className="text-neutral-400 text-lg leading-relaxed">Crafting pixel-perfect, intuitive interfaces that elevate digital experiences.</p>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 relative group rounded-[2.5rem] border border-white/5 bg-white/[0.01] p-10 overflow-hidden hover:bg-white/[0.02] transition-colors duration-500">
              <div className="absolute inset-0 bg-gradient-to-t from-accent/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center h-full justify-between min-h-[150px]">
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent ring-1 ring-accent/20 group-hover:scale-110 transition-transform duration-500">
                  <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-4xl font-extrabold text-white mb-4 group-hover:text-accent transition-colors duration-300">The Kh1ev Community</h3>
                  <p className="text-neutral-400 text-xl leading-relaxed max-w-3xl">Beyond the code, we are a thriving ecosystem. Join our community to network with tech enthusiasts, collaborate on open-source projects, or just chill and play games together.</p>
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
      </section>

      <footer className="relative pt-24 pb-8 px-8 md:px-[5%] flex flex-col items-center justify-end overflow-hidden">
        <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-end gap-12 mb-8 z-10">
          <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
            <h3 className="text-3xl font-extrabold text-white tracking-tight">Got an Idea?</h3>
            <p className="text-neutral-400 max-w-sm">Let's build something amazing together. Whether you want to collaborate on a project or join our growing network of developers, we'd love to hear from you.</p>
          </div>
          
          <div className="flex flex-col gap-6 text-center md:text-right items-center md:items-end">
            <h3 className="text-xl font-bold text-white">Connect with us</h3>
            <div className="flex flex-wrap justify-center md:justify-end gap-3">
              {[
                { name: 'Discord', icon: <FaDiscord className="w-4 h-4" />, href: 'https://discord.gg/MwNE7Vfb6t' },
                { name: 'GitHub', icon: <FaGithub className="w-4 h-4" />, href: '#' },
                { name: 'Instagram', icon: <FaInstagram className="w-4 h-4" />, href: '#' },
                { name: 'TikTok', icon: <FaTiktok className="w-4 h-4" />, href: '#' }
              ].map((social) => (
                <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-neutral-400 text-sm font-semibold hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(229,9,20,0.3)]">
                  {social.icon}
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full relative flex justify-center items-center pointer-events-none select-none -mt-4">
          <h1 className="text-[15vw] md:text-[20vw] leading-[0.8] font-extrabold text-white/[0.03] tracking-tighter m-0 w-full text-center">
            KH1EV.
          </h1>
        </div>

        <div className="absolute bottom-8 left-8 md:left-[5%] text-sm text-neutral-600 font-medium z-10">
          &copy; {new Date().getFullYear()} Kh1ev Organization.
        </div>
      </footer>
    </main>
  );
}

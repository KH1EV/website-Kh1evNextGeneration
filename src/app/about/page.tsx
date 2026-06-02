"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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

      <section className="relative min-h-[60vh] flex flex-col justify-center px-8 md:px-[5%] pt-40 pb-16">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-center text-center gap-6 md:gap-8 relative z-10">

          <h1 className="text-5xl md:text-7xl font-extrabold leading-[1.1] tracking-tight text-white max-w-4xl hero-text opacity-0">
            We are <span className="text-accent">Kh1ev.</span><br />
            More than just code.
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-400 max-w-3xl leading-relaxed mt-4 hero-text opacity-0">
            Kh1ev Organization is a dynamic tech community where development meets passion. We started as a small group of enthusiasts and have grown into a space dedicated to building cutting-edge IT solutions, from bots and web apps to robust cloud infrastructures.
          </p>

        </div>
      </section>
      <Footer />
    </main>
  );
}

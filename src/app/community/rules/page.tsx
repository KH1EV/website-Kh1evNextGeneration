"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const rulesList = [
  {
    id: "01",
    title: "Respect & Professionalism",
    description: "Treat all members with respect. We do not tolerate harassment, hate speech, sexism, racism, or toxicity of any kind. Keep discussions civil, especially during technical debates."
  },
  {
    id: "02",
    title: "No Spam or Unsolicited Promotion",
    description: "Do not spam messages, ping roles unnecessarily, or post unsolicited advertisements. Self-promotion is only allowed in designated showcase channels."
  },
  {
    id: "03",
    title: "Help & Collaborate",
    description: "Kh1ev is a community built on shared knowledge. If someone asks for coding help, provide constructive feedback. Do not mock beginners. We were all there once."
  },
  {
    id: "04",
    title: "Keep Content Relevant",
    description: "Use the appropriate channels for your discussions. Technical questions go to development channels, general chat in the lounge, and gaming topics in the gaming category."
  },
  {
    id: "05",
    title: "No Malicious Activities",
    description: "Do not share malicious links, malware, or engage in illegal activities. Discussions about cybersecurity and ethical hacking must remain strictly educational and theoretical."
  },
  {
    id: "06",
    title: "Follow Platform Guidelines",
    description: "In addition to these rules, all members must comply with Discord's Terms of Service and Community Guidelines."
  }
];

export default function Rules() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".rule-card",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white" ref={containerRef}>
      <Navbar />

      <section className="relative pt-40 pb-20 px-8 md:px-[5%]">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-[1000px] mx-auto relative z-10">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 hero-text opacity-0">
              Community <span className="bg-accent text-white px-3 md:px-6 inline-block mt-2 md:mt-0 italic">Rules.</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto hero-text leading-relaxed opacity-0">
              To ensure Kh1ev remains a safe, productive, and fun environment for everyone, we ask all members to strictly adhere to the following guidelines.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            {rulesList.map((rule) => (
              <div key={rule.id} className="rule-card opacity-0 group relative bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent/50 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-start">
                  <div className="text-4xl md:text-5xl font-black text-white/10 group-hover:text-accent/30 transition-colors">
                    {rule.id}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-accent transition-colors">{rule.title}</h2>
                    <p className="text-neutral-400 text-lg leading-relaxed">{rule.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl border border-accent/20 bg-accent/5 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Note from the Admins</h3>
            <p className="text-neutral-300">
              Administrators and moderators reserve the right to enforce these rules, including muting, kicking, or banning members who violate them. If you see someone breaking the rules, please notify staff immediately.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

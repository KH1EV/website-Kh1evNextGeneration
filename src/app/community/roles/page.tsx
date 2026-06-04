"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const roleCategories = [
  {
    id: "staff",
    category: "Staff",
    description: "The core team responsible for managing and maintaining the Kh1ev ecosystem.",
    accent: "text-red-500",
    roles: [
      { name: "Founder", desc: "The original creator and visionary of Kh1ev." },
      { name: "Chief", desc: "The highest authority and leader of the community." },
      { name: "Manager", desc: "Oversees daily operations and staff management." },
      { name: "Head Division", desc: "Leads specific divisions within the organization." },
      { name: "Staff Division", desc: "Dedicated members working within divisions." },
      { name: "Trainee", desc: "New staff members undergoing training." },
      { name: "Kh1ev Studio", desc: "Members of the official development studio." }
    ]
  },
  {
    id: "division",
    category: "Division",
    description: "Specialized teams focusing on different aspects of the community.",
    accent: "text-blue-500",
    roles: [
      { name: "Official Bot", desc: "Verified automated assistants." },
      { name: "Executive", desc: "High-level administrative team." },
      { name: "HRD", desc: "Human Resources Department." },
      { name: "Developer", desc: "Development team members." },
      { name: "Moderator", desc: "Community moderators ensuring safety." },
      { name: "Host", desc: "Event organizers and hosts." },
      { name: "Event Organizer", desc: "Event Organizer division." },
      { name: "Brand Ambassador", desc: "Brand Ambassadors." },
      { name: "Creative", desc: "Design and creative team." }
    ]
  },
  {
    id: "top1",
    category: "Top #1",
    description: "Elite members who have reached the pinnacle of activity.",
    accent: "text-amber-500",
    roles: [
      { name: "#1 Chat", desc: "The most active member in text channels." },
      { name: "#1 Voice", desc: "The most active member in voice channels." }
    ]
  },
  {
    id: "special",
    category: "Special",
    description: "Unique roles awarded for specific achievements or status.",
    accent: "text-purple-500",
    roles: [
      { name: "Special", desc: "Exclusive members with special recognition." }
    ]
  },
  {
    id: "donator",
    category: "Donator",
    description: "Generous supporters who help fund the community.",
    accent: "text-emerald-500",
    roles: [
      { name: "Supreme", desc: "Donated 100k+ to the community." },
      { name: "Contributor", desc: "Donated 50k to the community." },
      { name: "Donator", desc: "Donated 10k to the community." },
      { name: "Booster", desc: "Server boosters supporting our Discord." },
      { name: "Supporter", desc: "Members who support us by putting the Kh1ev link in their bio." }
    ]
  },
  {
    id: "leveling",
    category: "Leveling",
    description: "Roles earned through active participation and leveling up.",
    accent: "text-orange-500",
    roles: [
      { name: "Espresso Lv50", desc: "The highest achievable level tier." },
      { name: "Americano Lvl40", desc: "Master level tier achievement." },
      { name: "Cappuccino Lvl30", desc: "Advanced level tier achievement." },
      { name: "Latte Lvl20", desc: "Intermediate level tier achievement." },
      { name: "Mocha Lvl10", desc: "Beginner level tier achievement." }
    ]
  },
  {
    id: "primary",
    category: "Primary",
    description: "Foundational roles for all community members.",
    accent: "text-indigo-500",
    roles: [
      { name: "Partner", desc: "Official community partners." },
      { name: "She/Her", desc: "Pronoun designation role." },
      { name: "He/Him", desc: "Pronoun designation role." },
      { name: "Member", desc: "Standard verified community members." }
    ]
  },
  // {
  //   id: "developer",
  //   category: "Developer",
  //   description: "Tech enthusiasts and contributors within the Dev Area.",
  //   accent: "text-cyan-500",
  //   roles: [
  //     { name: "Dev Verified", desc: "Verified developers within the Kh1ev ecosystem." },
  //     { name: "Project Manager", desc: "Oversees development projects and timelines." },
  //     { name: "Full Stack Developer", desc: "Handles both frontend and backend development." },
  //     { name: "Frontend Developer", desc: "Specializes in UI/UX and client-side logic." },
  //     { name: "Backend Developer", desc: "Focuses on server-side logic and databases." },
  //     { name: "IOT Engineer", desc: "Internet of Things hardware and software specialist." },
  //     { name: "Mobile Developer", desc: "Creates applications for iOS and Android." },
  //     { name: "Game Developer", desc: "Designs and develops video games." },
  //     { name: "DevOps Engineer", desc: "Manages deployment, scaling, and infrastructure." },
  //     { name: "Cloud Engineer", desc: "Cloud computing and architecture specialist." },
  //     { name: "System Administrator", desc: "Maintains and operates computer systems and networks." },
  //     { name: "Network Engineer", desc: "Designs and implements computer networks." },
  //     { name: "Cybersecurity", desc: "Focuses on protecting systems and networks." },
  //     { name: "Data Analyst", desc: "Analyzes data to help make informed decisions." },
  //     { name: "Data Scientist", desc: "Extracts insights and knowledge from complex data." },
  //     { name: "Data Engineer", desc: "Builds systems for collecting and storing data." },
  //     { name: "UI/UX Designer", desc: "Designs user interfaces and experiences." },
  //     { name: "Graphic Designer", desc: "Creates visual concepts and digital assets." }
  //   ]
  // },
  {
    id: "limited",
    category: "Limited",
    description: "Rare roles that are no longer obtainable.",
    accent: "text-pink-500",
    roles: [
      { name: "Active 2023", desc: "Active community member during 2023." },
      { name: "Active 2024", desc: "Active community member during 2024." },
      { name: "Active 2025", desc: "Active community member during 2025." },
      { name: "Blockcraft", desc: "Exclusive role from the Blockcraft Minecraft Server era." },
      { name: "Voxnetwork", desc: "Exclusive role from the Voxnetwork Minecraft Server era." },
      { name: "Sneef", desc: "Exclusive role from the Sneef Minecraft Server era." }
    ]
  }
];

export default function RolesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    const sections = gsap.utils.toArray(".role-section") as HTMLElement[];
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
          },
        }
      );
    });

  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-[#050505] relative selection:bg-accent selection:text-white overflow-x-hidden" ref={containerRef}>
      <Navbar />
      <section className="relative pt-40 pb-20 px-8 md:px-[5%]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-center gap-6 md:gap-8 relative z-10">
          <div className="text-center w-full flex flex-col items-center mb-8 md:mb-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter leading-[1.1] tracking-tight text-white max-w-7xl hero-text opacity-0">
              Community <span className="bg-accent text-white px-3 md:px-6 inline-block mt-2 md:mt-0 italic md:whitespace-nowrap">Roles.</span><br />
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-4xl leading-relaxed mt-6 hero-text opacity-0">
              Explore the hierarchy, special divisions, and exclusive recognitions that make up the <span className="text-white font-semibold">Kh1ev</span> ecosystem.
            </p>
          </div>
        </div>
      </section>

      <section className="relative z-10 pb-40 px-4 md:px-[5%] max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-24 md:gap-40">
          {roleCategories.map((cat, index) => (
            <div 
              key={cat.id} 
              className="role-section flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="w-full md:w-1/3 md:sticky md:top-32">
                <div className="flex items-center gap-4 mb-4">
                  <div className="text-4xl md:text-6xl font-black text-accent">
                    {(index + 1).toString().padStart(2, '0')}
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight uppercase">
                    {cat.category}
                  </h2>
                </div>
                <p className="text-neutral-400 text-lg font-light leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="w-full md:w-2/3 border-t border-white/10 pt-8">
                <div className="flex flex-col">
                  {cat.roles.map((role, rIndex) => {
                    const bgMap: Record<string, string> = {
                      "text-red-500": "bg-red-500",
                      "text-blue-500": "bg-blue-500",
                      "text-amber-500": "bg-amber-500",
                      "text-purple-500": "bg-purple-500",
                      "text-emerald-500": "bg-emerald-500",
                      "text-orange-500": "bg-orange-500",
                      "text-indigo-500": "bg-indigo-500",
                      "text-pink-500": "bg-pink-500"
                    };
                    const dotBgClass = bgMap[cat.accent] || "bg-white";

                    return (
                    <div 
                      key={rIndex}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 border-b border-white/5 hover:border-white/20 transition-colors duration-300">
                      <div className="flex items-center gap-4 mb-2 sm:mb-0">
                        <div className={`w-2 h-2 rounded-full ${dotBgClass} shadow-[0_0_10px_currentColor] opacity-50 group-hover:opacity-100 transition-opacity`}></div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:pl-2 transition-all duration-300">
                          {role.name}
                        </h3>
                      </div>
                      <p className="text-sm md:text-base text-neutral-500 font-light sm:text-right max-w-xs group-hover:text-neutral-300 transition-colors duration-300">
                        {role.desc}
                      </p>
                    </div>
                  )})}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

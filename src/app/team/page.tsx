"use client";

import { useEffect, useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaGithub, FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  system_role?: string;
  image_url: string;
  bio: string;
  github_url: string;
  instagram_url: string;
  linkedin_url: string;
  tiktok_url: string;
  tags?: string;
  organization?: string;
}

const ROLE_HIERARCHY: Record<string, number> = {
  'Founder': 1,
  'Chief': 2,
  'Manager': 3,
  'Head Staff': 4,
  'Staff': 5,
  'Trainee': 6
};

const ROLE_COLORS: Record<string, string> = {
  'Founder': 'bg-pink-500',
  'Chief': 'bg-red-500',
  'Manager': 'bg-purple-500',
  'Head Staff': 'bg-yellow-500',
  'Staff': 'bg-orange-500',
  'Trainee': 'bg-teal-400'
};

const TAG_STYLES: Record<string, string> = {
  'Executive': 'bg-neutral-500/10 text-neutral-300 border-neutral-500/20',
  'HRD': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Developer': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Host': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Event Organizer': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Brand Ambassador': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'Partner Manager': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Creative': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
  'Project Manager': 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
  'Full Stack Developer': 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Frontend Developer': 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  'Backend Developer': 'bg-stone-500/10 text-stone-400 border-stone-500/20',
  'IOT Engineer': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Mobile Developer': 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  'Game Developer': 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  'DevOps Engineer': 'bg-violet-500/10 text-violet-400 border-violet-500/20',
  'Cloud Engineer': 'bg-fuchsia-500/10 text-fuchsia-400 border-fuchsia-500/20',
  'System Administrator': 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  'Network Engineer': 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20',
  'Cybersecurity': 'bg-red-600/10 text-red-500 border-red-600/20',
  'Data Analyst': 'bg-blue-600/10 text-blue-500 border-blue-600/20',
  'Data Scientist': 'bg-teal-600/10 text-teal-500 border-teal-600/20',
  'Data Engineer': 'bg-orange-600/10 text-orange-500 border-orange-600/20',
  'UI/UX Designer': 'bg-pink-600/10 text-pink-500 border-pink-600/20',
  'Graphic Designer': 'bg-purple-600/10 text-purple-500 border-purple-600/20'
};

const MemberCard = ({ member }: { member: TeamMember }) => (
  <div key={member.id} className="team-card opacity-0 translate-y-10 relative rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden flex flex-col">
    <div className="p-8 relative z-10 flex flex-col items-center text-center h-full">
      <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-xl mb-6 relative shrink-0">
        <img src={member.image_url || `https://ui-avatars.com/api/?name=${member.name}&background=random`} alt={member.name} className="w-full h-full object-cover" />
      </div>
      
      <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
      <p className="text-accent font-medium mb-4 text-sm uppercase tracking-wider">{member.role}</p>
      
      <p className="text-neutral-400 text-sm leading-relaxed mb-6 flex-grow">
        {member.bio}
      </p>

      {member.tags && (
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {member.tags.split(',').filter(Boolean).map(tag => {
            const trimmedTag = tag.trim();
            const style = TAG_STYLES[trimmedTag] || 'bg-white/5 text-neutral-400 border-white/10';
            return (
              <span key={trimmedTag} className={`text-[10px] md:text-xs font-semibold px-2.5 py-1 rounded-md border ${style}`}>
                {trimmedTag}
              </span>
            );
          })}
        </div>
      )}
      
      <div className="flex items-center gap-4 mt-auto">
        {member.github_url && member.github_url !== '#' && (
          <a href={member.github_url} className="text-neutral-500 hover:text-white transition-colors">
            <FaGithub className="w-5 h-5" />
          </a>
        )}
        {member.tiktok_url && member.tiktok_url !== '#' && (
          <a href={member.tiktok_url} className="text-neutral-500 hover:text-white transition-colors">
            <FaTiktok className="w-5 h-5" />
          </a>
        )}
        {member.instagram_url && member.instagram_url !== '#' && (
          <a href={member.instagram_url} className="text-neutral-500 hover:text-accent transition-colors">
            <FaInstagram className="w-5 h-5" />
          </a>
        )}
        {member.linkedin_url && member.linkedin_url !== '#' && (
          <a href={member.linkedin_url} className="text-neutral-500 hover:text-[#0a66c2] transition-colors">
            <FaLinkedin className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  </div>
);

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Kh1ev Community');
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  useGSAP(() => {
    if (!loading && teamMembers.length > 0) {
      gsap.fromTo(".team-card", 
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power3.out"
        }
      );
    }
  }, { dependencies: [loading, teamMembers, activeTab], scope: containerRef });

  useEffect(() => {
    async function fetchTeam() {
      const { data, error } = await supabase
        .from('team_members')
        .select('*')
        .order('sort_order', { ascending: true });
      
      if (error) {
        console.error("Error fetching team members:", error);
      } else if (data) {
        const sortedData = [...data].sort((a, b) => {
          const rankA = ROLE_HIERARCHY[a.system_role] || 99;
          const rankB = ROLE_HIERARCHY[b.system_role] || 99;
          return rankA - rankB;
        });
        setTeamMembers(sortedData);
      }
      setLoading(false);
    }
    fetchTeam();
  }, []);
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white" ref={containerRef}>
      <Navbar />

      <section className="relative pt-40 pb-20 px-8 md:px-[5%]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center text-center mb-16">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 hero-text opacity-0">
            Meet Our <span className="bg-accent text-white px-3 md:px-6 inline-block mt-2 md:mt-0 italic">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto hero-text leading-relaxed opacity-0">
            A collective of passionate developers, designers, and tech enthusiasts working together to build amazing digital experiences.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row gap-4 mb-20 relative z-10 hero-text opacity-0">
          {['Kh1ev Organization', 'Kh1ev Community', 'Kh1ev Studio'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-4 px-6 rounded-2xl border transition-all duration-300 font-bold text-center flex items-center justify-center gap-3 ${
                activeTab === tab
                  ? 'bg-accent/10 border-accent text-accent shadow-[0_0_20px_rgba(229,9,20,0.2)] scale-105'
                  : 'bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white hover:border-white/20 hover:scale-105'
              }`}
            >
              {tab === 'Kh1ev Community' && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              )}
              {tab === 'Kh1ev Studio' && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
              )}
              {tab === 'Kh1ev Organization' && (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              )}
              {tab}
            </button>
          ))}
        </div>

        <div className="max-w-[1440px] mx-auto flex flex-col gap-32 min-h-[500px]">
          {loading ? (
            <div className="text-center py-20 text-neutral-400 w-full">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              Loading team members...
            </div>
          ) : (
            (() => {
              const orgName = activeTab;
              const orgMembers = teamMembers.filter(m => (m.organization || 'Kh1ev Community') === orgName);
              
              if (orgMembers.length === 0) return (
                <div className="text-center py-20 text-neutral-500 bg-white/[0.02] border border-white/5 rounded-3xl w-full max-w-2xl mx-auto">
                  <svg className="w-16 h-16 mx-auto mb-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-lg">No members found for {orgName} yet.</p>
                </div>
              );

              return (
                <div key={orgName} className="flex flex-col gap-12 w-full">
                  <div className="text-center md:text-left border-b border-accent/20 pb-6 mb-4">
                    <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                      {orgName}
                    </h2>
                    <p className="text-neutral-400 mt-2">Meet the people behind {orgName}.</p>
                  </div>
                  
                  <div className="flex flex-col gap-20">
                    {orgName === 'Kh1ev Community' ? (
                      Object.entries(ROLE_HIERARCHY)
                        .sort(([, rankA], [, rankB]) => rankA - rankB)
                        .map(([roleName]) => {
                          const membersInRole = orgMembers.filter(m => (m.system_role || 'Staff') === roleName);
                          
                          if (membersInRole.length === 0) return null;

                          return (
                            <div key={roleName} className="flex flex-col gap-8 w-full">
                              <div className="flex flex-row items-center md:items-end justify-between border-b border-white/5 pb-4 gap-4">
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-xl md:text-2xl font-extrabold text-white flex items-center gap-3 truncate">
                                    <div className={`w-3 h-3 rounded-full shrink-0 ${ROLE_COLORS[roleName] || 'bg-neutral-500'}`}></div>
                                    <span className="truncate">{roleName}</span>
                                  </h3>
                                  <p className="text-neutral-500 text-xs md:text-sm mt-2 line-clamp-2 md:line-clamp-none">{roleName} of {orgName}.</p>
                                </div>
                                <div className="shrink-0 whitespace-nowrap px-3 py-1 md:px-4 md:py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-xs md:text-sm font-semibold text-neutral-400 flex items-center gap-1.5 md:gap-2">
                                  <svg className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                  <span>{membersInRole.length} People</span>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {membersInRole.map((member) => (
                                  <MemberCard key={member.id} member={member} />
                                ))}
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {orgMembers.map((member) => (
                          <MemberCard key={member.id} member={member} />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

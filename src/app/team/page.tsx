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
}

const ROLE_HIERARCHY: Record<string, number> = {
  'Chief': 1,
  'Manager': 2,
  'Head Staff': 3,
  'Staff': 4,
  'Trainee Barista': 5,
  'KH1EV.org member': 6
};

const ROLE_COLORS: Record<string, string> = {
  'Chief': 'bg-red-500',
  'Manager': 'bg-purple-500',
  'Head Staff': 'bg-yellow-500',
  'Staff': 'bg-orange-500',
  'Trainee Barista': 'bg-teal-400',
  'KH1EV.org member': 'bg-pink-500'
};

const TAG_STYLES: Record<string, string> = {
  'KH1EV.org members': 'bg-pink-500/10 text-pink-500 border-pink-500/20',
  'Executive': 'bg-neutral-500/10 text-neutral-300 border-neutral-500/20',
  'HRD': 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Developer': 'bg-green-500/10 text-green-400 border-green-500/20',
  'Host': 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  'Event Organizer': 'bg-orange-500/10 text-orange-400 border-orange-500/20',
  'Brand Ambassador': 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  'Partner Manager': 'bg-red-500/10 text-red-400 border-red-500/20',
  'Creative': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
};

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

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
        
        <div className="max-w-[1440px] mx-auto relative z-10 flex flex-col items-center text-center mb-20">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 hero-text opacity-0">
            Meet Our <span className="text-accent">Team</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl hero-text opacity-0">
            A collective of passionate developers, designers, and tech enthusiasts working together to build amazing digital experiences.
          </p>
        </div>

        <div className="max-w-[1440px] mx-auto flex flex-col gap-20">
          {loading ? (
            <div className="text-center py-20 text-neutral-400 w-full">
              <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              Loading team members...
            </div>
          ) : (
            Object.entries(ROLE_HIERARCHY)
              .sort(([, rankA], [, rankB]) => rankA - rankB)
              .map(([roleName]) => {
                const membersInRole = teamMembers.filter(m => (m.system_role || 'Staff') === roleName);
                
                if (membersInRole.length === 0) return null;

                return (
                  <div key={roleName} className="flex flex-col gap-8 w-full">
                    <div className="flex items-end justify-between border-b border-white/5 pb-4">
                      <div>
                        <h2 className="text-3xl font-extrabold text-white flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${ROLE_COLORS[roleName] || 'bg-neutral-500'}`}></div>
                          {roleName}
                        </h2>
                        <p className="text-neutral-500 text-sm mt-2">{roleName} team of Kh1ev Community.</p>
                      </div>
                      <div className="px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-full text-sm font-semibold text-neutral-400 flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        {membersInRole.length} staff
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {membersInRole.map((member) => (
                        <div key={member.id} className="group relative rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(229,9,20,0.1)] flex flex-col">
                          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                          
                          <div className="p-8 relative z-10 flex flex-col items-center text-center h-full">
                            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-background shadow-xl mb-6 relative group-hover:scale-110 transition-transform duration-500 shrink-0">
                              <div className="absolute inset-0 bg-accent/20 z-10 group-hover:opacity-0 transition-opacity duration-300"></div>
                              <img src={member.image_url || `https://ui-avatars.com/api/?name=${member.name}&background=random`} alt={member.name} className="w-full h-full object-cover" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{member.name}</h3>
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
                      ))}
                    </div>
                  </div>
                );
              })
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

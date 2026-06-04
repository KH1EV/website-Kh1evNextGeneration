"use client";

import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

import { supabase } from "@/lib/supabaseClient";

interface StudioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string | null;
  tags: string[];
  link: string;
  is_active: boolean;
}

export default function StudioProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [projects, setProjects] = useState<StudioProject[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('studio_projects')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true });
        
        if (data && !error) {
          setProjects(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: containerRef });

  useGSAP(() => {
    if (!loading && projects.length > 0) {
      gsap.fromTo(
        ".project-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.1 }
      );
    }
  }, { scope: containerRef, dependencies: [loading, projects] });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white" ref={containerRef}>
      <Navbar />

      <section className="relative min-h-[40vh] flex flex-col justify-center px-8 md:px-[5%] pt-40 pb-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-[1440px] w-full mx-auto flex flex-col items-center gap-6 relative z-10">
          <div className="text-center w-full flex flex-col items-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter leading-[1.1] tracking-tight text-white max-w-7xl hero-text opacity-0">
              Our <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-0 md:ml-4 italic md:whitespace-nowrap">Projects.</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-4xl leading-relaxed mt-6 hero-text opacity-0">
              A collection of digital solutions, web applications, and interactive experiences engineered by Kh1ev Studio.
            </p>
          </div>
        </div>
      </section>

      <section className="relative px-8 md:px-[5%] pb-32">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col gap-12 md:gap-20">
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : projects.length > 0 ? (
              projects.map((project, idx) => (
                <div key={idx} className="project-card opacity-0 group flex flex-col md:flex-row gap-8 items-center bg-[#111] border border-white/5 rounded-3xl p-6 md:p-8 hover:border-accent/30 transition-colors duration-500">
                  <div className="w-full md:w-1/2 aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden border border-white/10 relative">
                    {project.image ? (
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 bg-gradient-to-br from-[#111] to-[#0a0a0a]">
                        <svg className="w-12 h-12 mb-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        <span className="font-semibold tracking-widest text-sm uppercase">Coming Soon</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs font-bold text-white">
                      {project.category}
                    </div>
                  </div>
                  
                  <div className="w-full md:w-1/2 flex flex-col justify-center text-left">
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-accent transition-colors">{project.title}</h3>
                    <p className="text-neutral-400 leading-relaxed mb-6">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags?.map((tag, tagIdx) => (
                        <span key={tagIdx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-semibold text-neutral-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <div>
                      <Link href={project.link || '#'} className="inline-flex items-center gap-2 text-white font-bold hover:text-accent transition-colors group/link">
                        View Details
                        <svg className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
                <p className="text-neutral-400">Check back later for new projects and digital solutions.</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}

"use client";

import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image_url: string;
  created_at: string;
  admin_users?: {
    username: string;
  };
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*, admin_users(username)')
        .eq('published', true)
        .order('created_at', { ascending: false });

      if (data && !error) {
        setBlogs(data);
      }
      setLoading(false);
    };

    fetchBlogs();
  }, []);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    if (!loading) {
      gsap.fromTo(
        ".blog-card",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, { scope: containerRef, dependencies: [loading] });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white flex flex-col" ref={containerRef}>
      <Navbar />

      <div className="flex-1 pt-32 px-4 md:px-8 w-full max-w-6xl mx-auto relative z-10 flex flex-col mb-32">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 hero-text opacity-0">
            Kh1ev <span className="bg-accent text-white px-3 md:px-6 inline-block mt-2 md:mt-0 italic">Blog.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed hero-text opacity-0">
            Latest updates, patch notes, announcements, and tech insights from the Kh1ev team.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : blogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <a href={`/community/blog/${blog.slug}`} key={blog.id} className="blog-card block group">
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 hover:bg-white/[0.04] transition-all duration-300 h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden bg-neutral-900">
                    <img 
                      src={blog.image_url || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop'} 
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs text-neutral-500 mb-3 font-semibold tracking-wider uppercase">
                      <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      <span>•</span>
                      <span>{blog.admin_users?.username || 'Kh1ev Admin'}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-accent transition-colors line-clamp-2">
                      {blog.title}
                    </h3>
                    <p className="text-neutral-400 text-sm line-clamp-3 mb-6 flex-1">
                      {blog.excerpt}
                    </p>
                    <div className="text-accent font-semibold text-sm flex items-center gap-1">
                      Read Article
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-2">No posts yet</h3>
            <p className="text-neutral-400">Check back later for new updates and articles.</p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

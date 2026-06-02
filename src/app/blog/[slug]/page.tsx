"use client";

import { useEffect, useState, useRef, use } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  created_at: string;
  admin_users?: {
    username: string;
  };
}

function BlogSkeleton() {
  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden flex flex-col">
      <Navbar />
      <div className="flex-1 pt-32 px-4 md:px-8 w-full max-w-4xl mx-auto relative z-10 flex flex-col mb-32">
        <div className="w-32 h-5 bg-white/5 rounded-full mb-8 animate-pulse" />

        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-24 h-4 bg-white/5 rounded-full animate-pulse" />
            <div className="w-1 h-1 bg-white/10 rounded-full" />
            <div className="w-20 h-4 bg-white/5 rounded-full animate-pulse" />
          </div>
          <div className="space-y-3 mb-6">
            <div className="w-full h-10 bg-white/5 rounded-xl animate-pulse" />
            <div className="w-3/4 h-10 bg-white/5 rounded-xl animate-pulse" />
          </div>
        </div>

        <div className="w-full h-64 md:h-96 rounded-3xl bg-white/5 mb-12 animate-pulse" />

        <div className="space-y-4">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-4 bg-white/5 rounded-full animate-pulse"
              style={{ width: `${65 + (i % 4) * 10}%`, animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [timedOut, setTimedOut] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const timeout = setTimeout(() => {
        setTimedOut(true);
        setLoading(false);
      }, 10000);

      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*, admin_users(username)')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        clearTimeout(timeout);

        if (error || !data) {
          notFound();
        } else {
          setBlog(data);
        }
      } catch {
        clearTimeout(timeout);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useGSAP(() => {
    if (!loading && blog) {
      gsap.fromTo(
        ".article-element",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, { scope: containerRef, dependencies: [loading, blog] });

  if (loading) return <BlogSkeleton />;

  if (timedOut) {
    return (
      <main className="min-h-screen bg-background flex flex-col items-center justify-center gap-4">
        <p className="text-white font-bold text-lg">Gagal memuat artikel</p>
        <p className="text-neutral-500 text-sm">Server tidak merespons. Coba refresh halaman.</p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-accent text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
          Refresh
        </button>
      </main>
    );
  }

  if (!blog) return null;

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white flex flex-col" ref={containerRef}>
      <Navbar />

      <div className="flex-1 pt-32 px-4 md:px-8 w-full max-w-4xl mx-auto relative z-10 flex flex-col mb-32">
        <Link href="/blog" className="inline-flex items-center gap-2 text-neutral-400 hover:text-white transition-colors mb-8 w-fit article-element">
          <FaArrowLeft className="w-4 h-4" />
          <span>Back to Blog</span>
        </Link>

        <div className="mb-10 article-element">
          <div className="flex items-center gap-2 text-sm text-neutral-500 mb-4 font-semibold tracking-wider uppercase">
            <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span>•</span>
            <span className="text-accent">{blog.admin_users?.username || 'Kh1ev Admin'}</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {blog.title}
          </h1>
        </div>

        {blog.image_url && (
          <div className="w-full h-64 md:h-96 rounded-3xl overflow-hidden mb-12 article-element border border-white/10 bg-neutral-900">
            <img
              src={blog.image_url}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none article-element">
          {blog.content.split('\n').map((paragraph, idx) => (
            <p key={idx} className="text-neutral-300 leading-relaxed mb-6">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

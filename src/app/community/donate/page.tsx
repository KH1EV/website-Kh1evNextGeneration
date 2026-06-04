"use client";

import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaDiscord, FaCheckCircle, FaStar, FaCrown, FaHeart, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

gsap.registerPlugin(useGSAP);

export default function DonatePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data, error } = await supabase
          .from('donations')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        
        if (data && data.length > 0) {
          setRecentDonations(data);
          const sum = data.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
          setTotalAmount(sum);
        } else {
          const dummies = [
            { supporter_name: "Alex Chen", amount: 50000, message: "Keep up the great work guys!", created_at: new Date(Date.now() - 2 * 3600000).toISOString() },
            { supporter_name: "Sarah M.", amount: 100000, message: "For the new bot hosting ❤️", created_at: new Date(Date.now() - 5 * 3600000).toISOString() },
            { supporter_name: "Anonymous", amount: 10000, message: "", created_at: new Date(Date.now() - 24 * 3600000).toISOString() },
            { supporter_name: "Rizky Pratama", amount: 25000, message: "Semangat terus Kh1ev!", created_at: new Date(Date.now() - 48 * 3600000).toISOString() },
          ];
          setRecentDonations(dummies);
          setTotalAmount(dummies.reduce((acc, curr) => acc + curr.amount, 0));
        }
      } catch (err) {
        console.error("Error fetching donations:", err);
        const fallback = [
          { supporter_name: "Alex Chen", amount: 50000, message: "Keep up the great work guys!", created_at: new Date().toISOString() },
        ];
        setRecentDonations(fallback);
        setTotalAmount(50000);
      }
    };

    fetchDonations();
  }, []);

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    tl.fromTo(
      ".tier-row",
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
      "-=0.4"
    );
    
    tl.fromTo(
      ".recent-text",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
      "-=0.2"
    );

    tl.fromTo(
      ".recent-card",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white flex flex-col" ref={containerRef}>
      <Navbar />

      <div className="flex-1 pt-32 px-4 md:px-8 w-full max-w-7xl mx-auto relative z-10 flex flex-col mb-32">
        <div className="text-center mb-24 mt-8">
          <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter text-white tracking-tight leading-[1.1] mb-6 hero-text opacity-0">
            Help Keep The <br />
            <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 italic md:whitespace-nowrap">Community Alive.</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-4xl mx-auto leading-relaxed hero-text opacity-0">
            Server hosting, bot maintenance, and community events require resources. 
            Choose a tier below to support our infrastructure and get exclusive perks in return.
          </p>
        </div>

        <div className="flex flex-col gap-12 max-w-6xl mx-auto w-full mb-32">
          
          {/* Donatur Tier */}
          <div className="tier-row opacity-0 flex flex-col lg:flex-row bg-[#0a0a0a] border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden group hover:border-white/10 transition-colors">
            <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-white/5 bg-white/[0.02]">
              <div className="flex items-center gap-4 mb-6">
                <FaStar className="w-8 h-8 text-neutral-400" />
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Donatur</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">10K</span>
                <span className="text-neutral-500 font-bold uppercase tracking-widest text-sm">IDR</span>
              </div>
              <p className="text-neutral-500 text-sm">One-time payment</p>
            </div>
            <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-between">
              <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed mb-10">
                A simple token of appreciation to buy the devs a coffee. Every bit helps us keep the servers running.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end justify-between">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-neutral-300">
                    <FaCheckCircle className="text-neutral-500 w-5 h-5 shrink-0" />
                    <span className="text-lg">Exclusive <strong>Donatur Role</strong></span>
                  </li>
                  <li className="flex items-center gap-4 text-neutral-300">
                    <FaCheckCircle className="text-neutral-500 w-5 h-5 shrink-0" />
                    <span className="text-lg">VIP Chat Access</span>
                  </li>
                </ul>
                <a href="https://sociabuzz.com/phionne" target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-3 bg-white/10 hover:bg-white text-white hover:text-black font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 text-sm whitespace-nowrap">
                  Donate <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Contributor Tier - Highlighted */}
          <div className="tier-row opacity-0 flex flex-col lg:flex-row bg-accent/5 border border-accent/20 rounded-[2rem] md:rounded-[3rem] overflow-hidden group relative shadow-[0_0_50px_rgba(229,9,20,0.1)]">
            <div className="absolute top-0 right-10 bg-accent text-white font-black text-xs px-6 py-2 rounded-b-xl uppercase tracking-widest">Most Popular</div>
            
            <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-accent/10 bg-accent/[0.03]">
              <div className="flex items-center gap-4 mb-6">
                <FaCrown className="w-8 h-8 text-accent" />
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Contributor</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-black text-accent tracking-tighter">50K</span>
                <span className="text-accent/50 font-bold uppercase tracking-widest text-sm">IDR</span>
              </div>
              <p className="text-neutral-500 text-sm">One-time payment</p>
            </div>
            <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-between">
              <p className="text-xl md:text-2xl text-white font-light leading-relaxed mb-10">
                For those who want to significantly support our large-scale infrastructure and get premium perks.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end justify-between">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-neutral-200">
                    <FaCheckCircle className="text-accent w-5 h-5 shrink-0" />
                    <span className="text-lg">Exclusive <strong>Contributor Role</strong></span>
                  </li>
                  <li className="flex items-center gap-4 text-neutral-200">
                    <FaCheckCircle className="text-accent w-5 h-5 shrink-0" />
                    <span className="text-lg">Custom name color in Discord</span>
                  </li>
                </ul>
                <a href="https://sociabuzz.com/phionne" target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-3 bg-accent hover:bg-white text-white hover:text-black font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 shadow-lg shadow-accent/20 text-sm whitespace-nowrap">
                  Contribute <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Booster Tier */}
          <div className="tier-row opacity-0 flex flex-col lg:flex-row bg-[#5865F2]/5 border border-[#5865F2]/20 rounded-[2rem] md:rounded-[3rem] overflow-hidden group hover:border-[#5865F2]/40 transition-colors">
            <div className="lg:w-2/5 p-10 md:p-16 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#5865F2]/10 bg-[#5865F2]/[0.02]">
              <div className="flex items-center gap-4 mb-6">
                <FaDiscord className="w-9 h-9 text-[#5865F2]" />
                <h3 className="text-3xl font-bold text-white uppercase tracking-tight">Nitro Boost</h3>
              </div>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl md:text-6xl font-black text-[#5865F2] tracking-tighter">Boost</span>
              </div>
              <p className="text-neutral-500 text-sm">Free with Discord Nitro</p>
            </div>
            <div className="lg:w-3/5 p-10 md:p-16 flex flex-col justify-between">
              <p className="text-xl md:text-2xl text-neutral-300 font-light leading-relaxed mb-10">
                Have Discord Nitro? Use your free server boost on Kh1ev to unlock high-quality voice and more emote slots!
              </p>
              <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-end justify-between">
                <ul className="space-y-4">
                  <li className="flex items-center gap-4 text-neutral-300">
                    <FaCheckCircle className="text-[#5865F2] w-5 h-5 shrink-0" />
                    <span className="text-lg">Pink <strong>Booster Role</strong></span>
                  </li>
                  <li className="flex items-center gap-4 text-neutral-300">
                    <FaCheckCircle className="text-[#5865F2] w-5 h-5 shrink-0" />
                    <span className="text-lg">Stream in 1080p 60FPS</span>
                  </li>
                </ul>
                <a href="https://discord.gg/MwNE7Vfb6t" target="_blank" rel="noopener noreferrer" className="group/btn inline-flex items-center gap-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-black uppercase tracking-widest px-8 py-4 rounded-full transition-all duration-300 text-sm whitespace-nowrap">
                  Boost Now <FaDiscord className="w-5 h-5 ml-1" />
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="w-full max-w-5xl mx-auto pt-16 border-t border-white/5">
          <div className="text-center mb-12 flex flex-col items-center">
            <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tight mb-4 recent-text opacity-0">
              Our <span className="text-accent italic">Supporters</span>
            </h2>
            <p className="text-xl text-neutral-400 recent-text opacity-0 mb-8 max-w-2xl font-light">
              A massive thank you to everyone who helps keep our community running!
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-[2rem] relative overflow-hidden recent-card opacity-0 transform translate-y-10 flex flex-col shadow-2xl">
            <style jsx>{`
              .custom-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.01);
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb:hover {
                background: rgba(229, 9, 20, 0.5);
              }
            `}</style>

            <div className="p-8 md:p-10 border-b border-white/5 bg-white/[0.01]">
              <h3 className="text-2xl font-black text-white uppercase tracking-tight">Recent Donations</h3>
              <p className="text-neutral-400 mt-2 font-light">Live updates from our generous supporters.</p>
            </div>
            
            <div className="p-4 md:p-6 bg-white/[0.005]">
              <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 custom-scroll">
                {recentDonations.map((donation, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] hover:border-white/10 transition-all gap-4">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(229,9,20,0.2)]">
                        <FaHeart className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-lg">{donation.supporter_name}</p>
                        {donation.message && (
                          <p className="text-neutral-400 text-sm mt-1 italic font-light">"{donation.message}"</p>
                        )}
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0 sm:ml-0 mt-2 sm:mt-0 bg-black/40 px-5 py-3 rounded-xl border border-white/5">
                      <p className="font-black text-accent text-xl">{formatRupiah(Number(donation.amount))}</p>
                      <p className="text-neutral-500 text-xs mt-1 font-medium tracking-wide uppercase">{getRelativeTime(donation.created_at)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

"use client";

import { useRef, useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FaDiscord, FaCheckCircle, FaStar, FaCrown, FaHeart } from "react-icons/fa";

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
      ".tier-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" },
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
        <div className="text-center mb-16 mt-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 hero-text opacity-0">
            Help Keep The <br />
            <span className="bg-accent text-white px-3 md:px-6 inline-block mt-2 italic">Community Alive.</span>
          </h1>
          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed hero-text opacity-0">
            Server hosting, bot maintenance, and community events require resources. 
            Choose a tier below to support our infrastructure and get exclusive perks in return!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto w-full">
          <div className="tier-card bg-white/[0.02] border border-white/5 rounded-3xl p-8 flex flex-col hover:border-accent/30 transition-colors duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white">
                <FaStar className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Donatur</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">Rp 10.000</span>
                <span className="text-neutral-500 text-sm">/one-time</span>
              </div>
              <p className="text-neutral-400 text-sm mb-8 flex-1">
                A simple token of appreciation to buy the devs a coffee. Every bit helps us keep the servers running.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-accent mt-0.5 shrink-0" />
                  <span>Exclusive <strong>Donatur Role</strong> on Discord</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-accent mt-0.5 shrink-0" />
                  <span>Access to secret VIP chat channels</span>
                </li>
              </ul>
              <a href="https://sociabuzz.com/phionne" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors block text-center">
                Donate Now
              </a>
            </div>
          </div>
          <div className="tier-card bg-accent/5 border border-accent/20 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-[0_0_40px_rgba(229,9,20,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-accent text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-widest">
              Most Popular
            </div>
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6 text-accent">
                <FaCrown className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Contributor</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">Rp 50.000</span>
                <span className="text-neutral-500 text-sm">/one-time</span>
              </div>
              <p className="text-neutral-400 text-sm mb-8 flex-1">
                For those who want to significantly support our large-scale infrastructure and get premium perks.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-accent mt-0.5 shrink-0" />
                  <span>Exclusive <strong>Contributor Role</strong></span>
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-accent mt-0.5 shrink-0" />
                  <span>Access to secret VIP chat channels</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-accent mt-0.5 shrink-0" />
                  <span>Custom name color in Discord</span>
                </li>
              </ul>
              <a href="https://sociabuzz.com/phionne" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-accent hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg shadow-accent/20 block text-center">
                Become Contributor
              </a>
            </div>
          </div>
          <div className="tier-card bg-[#5865F2]/5 border border-[#5865F2]/20 rounded-3xl p-8 flex flex-col hover:border-[#5865F2]/40 transition-colors duration-300 relative group">
            <div className="absolute inset-0 bg-gradient-to-b from-[#5865F2]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>
            <div className="relative z-10 flex-1 flex flex-col">
              <div className="w-12 h-12 bg-[#5865F2]/20 rounded-xl flex items-center justify-center mb-6 text-[#5865F2]">
                <FaDiscord className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Server Booster</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-3xl font-extrabold text-[#5865F2]">Boost Us</span>
              </div>
              <p className="text-neutral-400 text-sm mb-8 flex-1">
                Have Discord Nitro? Use your free server boost on Kh1ev to unlock high-quality voice and more emote slots!
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-[#5865F2] mt-0.5 shrink-0" />
                  <span>Pink <strong>Server Booster Role</strong></span>
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-[#5865F2] mt-0.5 shrink-0" />
                  <span>Stream in 1080p 60FPS</span>
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-300">
                  <FaCheckCircle className="text-[#5865F2] mt-0.5 shrink-0" />
                  <span>Custom role icon & badge</span>
                </li>
              </ul>
              <a href="https://discord.gg/MwNE7Vfb6t" target="_blank" rel="noopener noreferrer" className="w-full py-3 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                <FaDiscord className="w-5 h-5" /> Boost Server
              </a>
            </div>
          </div>

        </div>

        <div className="mt-32 w-full max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4 recent-text opacity-0">
              Our <span className="text-accent italic">Supporters</span>
            </h2>
            <p className="text-neutral-400 recent-text opacity-0 mb-8">
              A massive thank you to everyone who helps keep our community running!
            </p>
          </div>

          <div className="bg-[#0a0a0a] border border-white/5 rounded-3xl relative overflow-hidden recent-card opacity-0 transform translate-y-10 flex flex-col">
            <style jsx>{`
              .custom-scroll::-webkit-scrollbar {
                width: 6px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.01);
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
              }
              .custom-scroll::-webkit-scrollbar-thumb:hover {
                background: rgba(229, 9, 20, 0.5);
              }
            `}</style>

            <div className="p-6 md:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 bg-white/[0.01]">
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white">Donation History</h3>
                <p className="text-sm text-neutral-400 mt-1">Live updates from our supporters</p>
              </div>
            </div>
            
            <div className="p-2 md:p-4">
              <div className="space-y-1 max-h-[500px] overflow-y-auto pr-2 custom-scroll">
                {recentDonations.map((donation, idx) => (
                  <div key={idx} className="flex items-start sm:items-center justify-between p-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors gap-4 flex-col sm:flex-row rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <FaHeart className="w-4 h-4 text-accent" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-base">{donation.supporter_name}</p>
                        {donation.message && (
                          <p className="text-neutral-400 text-sm mt-0.5 italic">"{donation.message}"</p>
                        )}
                      </div>
                    </div>
                    <div className="text-left sm:text-right shrink-0 ml-[3.5rem] sm:ml-0">
                      <p className="font-bold text-accent text-lg">{formatRupiah(Number(donation.amount))}</p>
                      <p className="text-neutral-500 text-xs mt-0.5">{getRelativeTime(donation.created_at)}</p>
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

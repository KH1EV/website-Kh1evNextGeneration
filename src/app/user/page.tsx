"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { FaDiscord, FaSignOutAlt, FaHome, FaCalendarAlt, FaShieldAlt, FaUsers } from "react-icons/fa";
import { User } from "@supabase/supabase-js";
import Link from "next/link";

function snowflakeToDate(id: string): Date {
  try {
    const DISCORD_EPOCH = 1420070400000;
    const ms = Math.floor(parseInt(id) / 4194304) + DISCORD_EPOCH; // / 2^22
    return new Date(ms);
  } catch {
    return new Date();
  }
}


interface DiscordProfile {
  id: string;
  username: string;
  global_name: string | null;
  avatar: string | null;
  banner: string | null;
  banner_color: string | null;
  accent_color: number | null;
  public_flags: number;
  avatar_decoration_data: { asset: string; sku_id?: string } | null;
  premium_type?: number;
}

function getAvatarUrl(profile: DiscordProfile) {
  if (!profile.avatar) {
    const defaultIndex = (Math.floor(parseInt(profile.id) / 4194304)) % 6;
    return `https://cdn.discordapp.com/embed/avatars/${defaultIndex}.png`;
  }
  const isAnimated = profile.avatar.startsWith('a_');
  return `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${isAnimated ? 'gif' : 'webp'}?size=256`;
}

function getBannerUrl(profile: DiscordProfile) {
  if (!profile.banner) return null;
  const isAnimated = profile.banner.startsWith('a_');
  return `https://cdn.discordapp.com/banners/${profile.id}/${profile.banner}.${isAnimated ? 'gif' : 'webp'}?size=600`;
}

function getDecorationUrl(asset: string) {
  return `https://cdn.discordapp.com/avatar-decoration-presets/${asset}.png?size=256&passthrough=true`;
}

function accentToHex(accent: number | null): string {
  if (!accent) return '#5865F2';
  return '#' + accent.toString(16).padStart(6, '0');
}

export default function UserDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [discordProfile, setDiscordProfile] = useState<DiscordProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          window.location.replace('/');
          return;
        }
        setUser(session.user);

        const discordId = session.user.user_metadata?.provider_id || session.user.identities?.[0]?.id;
        if (discordId) {
          // Check admin
          const { data: adminData } = await supabase.from('admin_users').select('id').eq('discord_id', discordId).single();
          if (adminData) setIsAdmin(true);

          // Read stored Discord profile from discord_users (populated at login time in /login page)
          const { data: storedProfile } = await supabase
            .from('discord_users')
            .select('*')
            .eq('discord_id', discordId)
            .single();

          if (storedProfile) {
            // Map stored DB fields to DiscordProfile shape
            setDiscordProfile({
              id: discordId,
              username: storedProfile.username,
              global_name: session.user.user_metadata?.custom_claims?.global_name || session.user.user_metadata?.full_name || null,
              avatar: null, // use avatar_url from storedProfile directly
              banner: storedProfile.banner_hash ?? null,
              banner_color: storedProfile.banner_color ?? null,
              accent_color: null,
              public_flags: storedProfile.public_flags ?? 0,
              avatar_decoration_data: storedProfile.avatar_decoration_asset
                ? { asset: storedProfile.avatar_decoration_asset }
                : null,
            });
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    init();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        window.location.replace('/');
      } else if (session?.user) {
        setUser(session.user);
      }
    });

    return () => authListener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut({ scope: 'local' });
      localStorage.clear();
      sessionStorage.clear();
      window.location.replace('/');
    } catch {
      setIsSigningOut(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-[#5865F2]/20 border-t-[#5865F2] animate-spin" />
            <FaDiscord className="absolute inset-0 m-auto w-6 h-6 text-[#5865F2]/60" />
          </div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-mono">Loading Profile</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const displayName = discordProfile?.global_name || user.user_metadata?.full_name || user.user_metadata?.custom_claims?.global_name || user.user_metadata?.name || 'User';
  const username = discordProfile?.username || user.user_metadata?.preferred_username || user.user_metadata?.name || '';
  const discordId = discordProfile?.id || user.user_metadata?.provider_id || user.identities?.[0]?.id || '';
  // avatarUrl: prefer Supabase OAuth metadata (always reliable), discordProfile.avatar only if it has a hash
  const avatarUrl = user.user_metadata?.avatar_url
    || (discordProfile?.avatar ? getAvatarUrl(discordProfile) : null);
  const bannerUrl = discordProfile ? getBannerUrl(discordProfile) : null;
  const bannerColor = discordProfile?.banner_color || (discordProfile?.accent_color ? accentToHex(discordProfile.accent_color) : null);
  const decorationAsset = discordProfile?.avatar_decoration_data?.asset;
  const accountCreated = discordId ? snowflakeToDate(discordId) : null;

  return (
    <main className="min-h-screen bg-[#0d0d10] relative overflow-x-hidden selection:bg-[#5865F2]/40 selection:text-white">
      <Navbar />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16">
        <div className="w-full max-w-[680px] flex flex-col gap-4">
          <div className="rounded-3xl overflow-hidden border border-white/[0.06] shadow-2xl shadow-black/60">
            <div className="h-40 relative overflow-hidden">
              {bannerUrl ? (
                <img src={bannerUrl} alt="Banner" className="w-full h-full object-cover" />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    background: bannerColor
                      ? `linear-gradient(135deg, ${bannerColor}cc 0%, ${bannerColor}44 60%, #0d0d10 100%)`
                      : 'linear-gradient(135deg, #1f1f23 0%, #131317 50%, #09090b 100%)'
                  }}>
                  <div className="absolute inset-0 opacity-[0.03]"
                    style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
                </div>
              )}
            </div>

            <div className="bg-[#111116] px-7 pb-7">
              <div className="flex items-end justify-between -mt-[52px] mb-5">
                <div className="relative w-[104px] h-[104px]">
                  <div className="w-[104px] h-[104px] rounded-full border-[5px] border-[#111116] overflow-hidden bg-[#1e1f26] shadow-xl">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt={displayName} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-[#5865F2]/20">
                        <FaDiscord className="w-12 h-12 text-[#5865F2]" />
                      </div>
                    )}
                  </div>
                  {decorationAsset && (
                    <img
                      src={getDecorationUrl(decorationAsset)}
                      alt="Avatar Decoration"
                      className="absolute inset-0 w-full h-full pointer-events-none"
                      style={{ filter: 'drop-shadow(0 0 4px rgba(0,0,0,0.6))' }}
                    />
                  )}
                  <div className="absolute bottom-1.5 right-1.5 w-[22px] h-[22px] rounded-full bg-[#23a55a] border-[3px] border-[#111116]" />
                </div>
                <div className="flex items-center gap-2 mb-1">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-accent/10 hover:bg-accent/20 border border-accent/20 text-accent text-xs font-bold transition-all">
                      <FaShieldAlt className="w-3 h-3" />
                      Admin
                    </Link>
                  )}
                  <button
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/[0.04] hover:bg-red-500/10 border border-white/[0.08] hover:border-red-500/25 text-neutral-400 hover:text-red-400 text-xs font-bold transition-all disabled:opacity-50">
                    {isSigningOut
                      ? <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin" />
                      : <FaSignOutAlt className="w-3 h-3" />
                    }
                    {isSigningOut ? 'Signing out…' : 'Sign Out'}
                  </button>
                </div>
              </div>
              <div className="mb-1">
                <h1 className="text-[28px] font-black text-white tracking-tight leading-none">{displayName}</h1>
                {username && (
                  <p className="text-[#72767d] text-sm font-medium mt-1 font-mono">@{username}</p>
                )}
              </div>
              <div className="h-px bg-white/[0.06] my-5" />

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#1e1f26] rounded-2xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#72767d] mb-2 flex items-center gap-1.5">
                    <FaCalendarAlt className="w-2.5 h-2.5" />
                    Discord Member Since
                  </p>
                  <p className="text-white font-bold text-sm">
                    {accountCreated
                      ? accountCreated.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                      : '—'}
                  </p>
                  {accountCreated && (
                    <p className="text-[#72767d] text-xs mt-0.5">
                      {Math.floor((Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365))} year{Math.floor((Date.now() - accountCreated.getTime()) / (1000 * 60 * 60 * 24 * 365)) !== 1 ? 's' : ''} ago
                    </p>
                  )}
                </div>
                <div className="bg-[#1e1f26] rounded-2xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#72767d] mb-2 flex items-center gap-1.5">
                    <FaDiscord className="w-2.5 h-2.5" />
                    Discord ID
                  </p>
                  <p className="text-white font-mono font-bold text-sm truncate">{discordId || '—'}</p>
                  <p className="text-[#72767d] text-xs mt-0.5">Unique identifier</p>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-3 bg-[#1e1f26] rounded-2xl p-4">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${isAdmin ? 'bg-accent/15' : 'bg-white/[0.05]'}`}>
                  {isAdmin
                    ? <FaShieldAlt className="w-4 h-4 text-accent" />
                    : <FaUsers className="w-4 h-4 text-neutral-400" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-bold">Kh1ev Community Member</p>
                  <p className="text-[#72767d] text-xs mt-0.5">
                    {isAdmin ? 'You have administrator privileges on this portal.' : 'Regular member · No admin access on this portal.'}
                  </p>
                </div>
                <div className={`w-2 h-2 rounded-full shrink-0 ${isAdmin ? 'bg-accent' : 'bg-[#72767d]'}`} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-white font-bold text-sm transition-all hover:border-white/[0.14]">
              <FaHome className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href="https://discord.gg/MwNE7Vfb6t"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold text-sm transition-all shadow-lg shadow-[#5865F2]/25 hover:shadow-[#5865F2]/40">
              <FaDiscord className="w-4 h-4" />
              Open Discord Server
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}

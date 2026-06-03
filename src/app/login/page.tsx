"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { FaDiscord, FaShieldAlt } from "react-icons/fa";

type Stage = 'idle' | 'loading' | 'redirecting';

export default function LoginPage() {
  const [stage, setStage] = useState<Stage>('loading');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const init = async () => {
      const url = new URL(window.location.href);
      const isOAuthCallback = url.searchParams.has('code');

      if (isOAuthCallback) {
        setStage('redirecting');
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setStage('redirecting');
        await routeUser(session.user, null); 
        return;
      }

      setStage('idle');
    };

    init();

    const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setStage('redirecting');
        await routeUser(session.user, session.provider_token ?? null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const routeUser = async (user: any, providerToken: string | null) => {
    const discordId = user.user_metadata?.provider_id || user.identities?.[0]?.id;
    if (!discordId) {
      window.location.replace('/');
      return;
    }

    let extraData: Record<string, any> = {};
    if (providerToken) {
      try {
        const res = await fetch('/api/discord-profile', {
          headers: { Authorization: `Bearer ${providerToken}` }
        });
        if (res.ok) {
          const d = await res.json();
          extraData = {
            public_flags: d.public_flags ?? 0,
            banner_color: d.banner_color ?? null,
            banner_hash: d.banner ?? null,
            avatar_decoration_asset: d.avatar_decoration_data?.asset ?? null,
          };
        }
      } catch { /* non-critical */ }
    }

    const username = user.user_metadata?.full_name
      || user.user_metadata?.custom_claims?.global_name
      || user.user_metadata?.name
      || 'Unknown';
    const avatarUrl = user.user_metadata?.avatar_url || '';

    try {
      await supabase.from('discord_users').upsert({
        discord_id: discordId,
        username,
        avatar_url: avatarUrl,
        last_login: new Date().toISOString(),
        ...extraData,
      }, { onConflict: 'discord_id' });
    } catch (err) {
      console.error("Failed to update user profile in DB:", err);
    } finally {
      window.location.replace('/user');
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    await supabase.auth.signInWithOAuth({
      provider: 'discord',
      options: {
        redirectTo: `${window.location.origin}/login`,
        scopes: 'identify',
      }
    });
  };

  if (stage === 'loading' || stage === 'redirecting') {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <div className="relative">
            <div className="w-14 h-14 rounded-full border-2 border-[#5865F2]/20 border-t-[#5865F2] animate-spin" />
            <FaDiscord className="absolute inset-0 m-auto w-5 h-5 text-[#5865F2]/60" />
          </div>
          <p className="text-white/30 text-xs tracking-[0.3em] uppercase font-mono">
            {stage === 'redirecting' ? 'Routing...' : 'Checking session...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] relative overflow-hidden selection:bg-[#5865F2]/30 selection:text-white flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20 relative">
        <div className="text-center relative z-10 mb-12">
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
            Connect to <br />
            <span className="bg-[#e50914] text-white px-4 py-1 italic inline-block mt-3 tracking-tight">Kh1ev.</span>
          </h1>
          <p className="text-neutral-400 text-lg leading-relaxed max-w-md mx-auto">
            Securely connect your Discord account to access community features, manage your profile, and explore the organization dashboard.
          </p>
        </div>

        <div className="w-full max-w-sm relative z-10">
          <button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full flex items-center justify-center gap-3 py-4 rounded-xl bg-[#5865F2] hover:bg-[#4752C4] active:scale-[0.98] text-white font-bold text-[15px] transition-all duration-200 shadow-xl shadow-[#5865F2]/20 disabled:opacity-60 disabled:cursor-not-allowed border border-white/10">
            {isLoggingIn ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <FaDiscord className="w-5 h-5" />
            )}
            {isLoggingIn ? 'Establishing Connection...' : 'Continue with Discord'}
          </button>

          <div className="mt-8 pt-8 border-t border-white/[0.06] flex flex-col items-center text-center">
            <p className="text-white text-xs font-bold tracking-wide uppercase mb-1">Privacy Assured</p>
            <p className="text-neutral-500 text-[11px] leading-relaxed max-w-[280px]">
              We only request read-only access to your public Discord profile (username & avatar).
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

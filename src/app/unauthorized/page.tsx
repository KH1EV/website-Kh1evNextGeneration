"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import { FaDiscord, FaSignOutAlt, FaShieldAlt } from "react-icons/fa";
import { User } from "@supabase/supabase-js";

export default function UnauthorizedPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isSigningOut, setIsSigningOut] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await supabase.auth.signOut({ scope: 'local' });
      if (typeof window !== 'undefined') {
        localStorage.clear();
        sessionStorage.clear();
      }
    } finally {
      window.location.replace('/');
    }
  };

  const discordId = user?.user_metadata?.provider_id;
  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    "Unknown User";
  const userAvatar = user?.user_metadata?.avatar_url;
  const discordTag = user?.user_metadata?.preferred_username;

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden flex flex-col items-center justify-center p-6">
      <Navbar />

      <div
        style={{
          position: "fixed",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(229,9,20,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="max-w-md w-full relative z-10">
        <div
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "24px",
            padding: "40px 32px",
            textAlign: "center",
            boxShadow: "0 25px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(239,68,68,0.05)",
          }}>
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "rgba(239,68,68,0.08)",
              border: "1px solid rgba(239,68,68,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}>
            <FaShieldAlt style={{ width: "32px", height: "32px", color: "#ef4444" }} />
          </div>

          <h1 className="text-3xl font-extrabold text-white mb-3">Access Denied</h1>
          <p className="text-neutral-400 text-sm leading-relaxed mb-6">
            Akun Discord kamu berhasil terdeteksi, tetapi{" "}
            <span className="text-white font-semibold">tidak terdaftar</span> sebagai
            admin KH1EV. Hubungi founder untuk mendapatkan akses.
          </p>

          {user && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: "16px",
                padding: "16px",
                marginBottom: "24px",
                display: "flex",
                alignItems: "center",
                gap: "12px",
                textAlign: "left",
              }}>
              {userAvatar ? (
                <img
                  src={userAvatar}
                  alt={userName}
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid rgba(239,68,68,0.3)",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    background: "rgba(239,68,68,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}>
                  <span style={{ color: "#ef4444", fontWeight: 700, fontSize: "1.1rem" }}>
                    {userName[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>
                  {userName}
                </p>
                {discordTag && (
                  <p
                    style={{
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "0.75rem",
                      margin: "2px 0",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}>
                    <FaDiscord style={{ color: "#5865F2", flexShrink: 0 }} />
                    @{discordTag}
                  </p>
                )}
                {discordId && (
                  <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.7rem", margin: 0, fontFamily: "monospace" }}>
                    ID: {discordId}
                  </p>
                )}
              </div>
              <div
                style={{
                  background: "rgba(239,68,68,0.1)",
                  border: "1px solid rgba(239,68,68,0.2)",
                  borderRadius: "8px",
                  padding: "4px 8px",
                  flexShrink: 0,
                }}>
                <span style={{ color: "#ef4444", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.08em" }}>
                  UNAUTHORIZED
                </span>
              </div>
            </div>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Link
              href="/"
              style={{
                display: "block",
                padding: "13px 24px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "12px",
                color: "white",
                fontWeight: 600,
                fontSize: "0.9rem",
                textDecoration: "none",
              }}>
              ← Back to Home
            </Link>
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                padding: "13px 24px",
                background: isSigningOut ? "rgba(239,68,68,0.03)" : "rgba(239,68,68,0.06)",
                border: "1px solid rgba(239,68,68,0.15)",
                borderRadius: "12px",
                color: "#ef4444",
                fontWeight: 600,
                fontSize: "0.9rem",
                cursor: isSigningOut ? "not-allowed" : "pointer",
                opacity: isSigningOut ? 0.7 : 1,
                transition: "all 0.2s",
                width: "100%",
              }}>
              {isSigningOut ? (
                <>
                  <div style={{ width: "14px", height: "14px", border: "2px solid rgba(239,68,68,0.3)", borderTopColor: "#ef4444", borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                  Signing out...
                </>
              ) : (
                <>
                  <FaSignOutAlt />
                  Sign Out from Discord
                </>
              )}
            </button>
          </div>

          <p style={{ color: "rgba(255,255,255,0.2)", fontSize: "0.72rem", marginTop: "20px", lineHeight: 1.6 }}>
            Jika kamu adalah admin KH1EV, minta Discord ID kamu ditambahkan ke whitelist oleh Founder.
          </p>
        </div>
      </div>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes, FaShieldAlt, FaSignOutAlt, FaDiscord } from "react-icons/fa";
import { supabase } from "@/lib/supabaseClient";
import { User } from "@supabase/supabase-js";

const navSections = [
  {
    label: "ABOUT US",
    links: [
      { href: "/about", text: "About Us" },
      { href: "/team", text: "Our Team" },
    ],
  },
  {
    label: "COMMUNITY",
    links: [
      { href: "/community/about", text: "About Community" },
      { href: "/rules", text: "Community Rules" },
      { href: "/blog", text: "Community Blog" },
      { href: "/donate", text: "Donate" },
    ],
  },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setIsUserDropdownOpen(false);
  };

  const userName =
    user?.user_metadata?.full_name ||
    user?.user_metadata?.custom_claims?.global_name ||
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "User";

  const userAvatar = user?.user_metadata?.avatar_url;
  const userEmail = user?.email || "";
  const discordTag = user?.user_metadata?.preferred_username || "";

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-full max-w-5xl px-4 pointer-events-none">
        <nav className="nav-element flex items-center justify-between backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-full px-8 py-3 shadow-2xl pointer-events-auto">
          <Link
            href="/"
            className="font-extrabold tracking-widest text-lg text-white hover:text-accent transition-colors">
            KH1EV.
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <button className="text-white text-sm font-semibold hover:text-accent transition-colors flex items-center gap-1 py-2">
                About Us
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 py-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Link href="/about" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">About Us</Link>
                <Link href="/team" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">Our Team</Link>
              </div>
            </div>

            <div className="relative group">
              <button className="text-white text-sm font-semibold hover:text-accent transition-colors flex items-center gap-1 py-2">
                Community
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 py-2 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <Link href="/community/about" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">About Community</Link>
                <Link href="/rules" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">Community Rules</Link>
                <Link href="/blog" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">Blog</Link>
                <Link href="/donate" className="block px-4 py-2 text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors">Donate</Link>
              </div>
            </div>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-white/30 transition-all duration-200 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  aria-label="User menu">
                  {userAvatar ? (
                    <img
                      src={userAvatar}
                      alt={userName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">{userName[0]?.toUpperCase()}</span>
                    </div>
                  )}
                  <svg
                    className={`w-3 h-3 text-neutral-400 mr-1 transition-transform duration-200 ${isUserDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`absolute top-full right-0 mt-3 w-64 bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all duration-200 ${
                    isUserDropdownOpen
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}>
                  <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                      {userAvatar ? (
                        <img src={userAvatar} alt={userName} className="w-10 h-10 rounded-full object-cover ring-2 ring-accent/30" />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center ring-2 ring-accent/30">
                          <span className="text-accent font-bold">{userName[0]?.toUpperCase()}</span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-bold text-sm truncate">{userName}</p>
                        {discordTag && (
                          <p className="text-neutral-500 text-xs flex items-center gap-1 mt-0.5">
                            <FaDiscord className="text-[#5865F2] shrink-0" />
                            <span className="truncate">@{discordTag}</span>
                          </p>
                        )}
                        {!discordTag && userEmail && (
                          <p className="text-neutral-500 text-xs truncate mt-0.5">{userEmail}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      href="/admin"
                      onClick={() => setIsUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-neutral-300 hover:text-white hover:bg-white/5 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <FaShieldAlt className="w-3.5 h-3.5 text-accent" />
                      </div>
                      <div>
                        <p className="font-semibold">Admin Dashboard</p>
                        <p className="text-xs text-neutral-500">Manage content & settings</p>
                      </div>
                    </Link>
                  </div>

                  <div className="p-2 border-t border-white/5">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-white hover:bg-red-500/10 transition-colors group">
                      <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                        <FaSignOutAlt className="w-3.5 h-3.5 text-red-400" />
                      </div>
                      <span className="font-semibold">Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <a
                href="https://discord.gg/MwNE7Vfb6t"
                target="_blank"
                rel="noopener noreferrer"
                className="group/btn relative px-6 py-2.5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(229,9,20,0.4)] block">
                <div className="absolute inset-0 w-0 bg-accent transition-all duration-300 ease-out group-hover/btn:w-full"></div>
                <span className="relative flex items-center gap-2 group-hover/btn:text-white transition-colors duration-300 text-sm">
                  Join Community
                  <svg className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            )}
          </div>

          <button
            className="md:hidden text-white p-2 z-[110] relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu">
            {isMobileMenuOpen ? (
              <FaTimes className="w-5 h-5" />
            ) : (
              <FaBars className="w-5 h-5" />
            )}
          </button>
        </nav>
      </div>

      {mounted && (
        <>
          <div
            onClick={closeMenu}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              zIndex: 150,
              opacity: isMobileMenuOpen ? 1 : 0,
              pointerEvents: isMobileMenuOpen ? "auto" : "none",
              transition: "opacity 0.35s ease",
            }}
          />

          <div
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "100vw",
              backgroundColor: "#080808",
              borderLeft: "1px solid rgba(255,255,255,0.08)",
              zIndex: 160,
              transform: isMobileMenuOpen ? "translateX(0)" : "translateX(100%)",
              transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "24px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
              <Link href="/" onClick={closeMenu} style={{ fontWeight: 900, letterSpacing: "0.15em", fontSize: "1.2rem", color: "white", textDecoration: "none" }}>
                KH1EV.
              </Link>
              <button
                onClick={closeMenu}
                style={{ color: "white", background: "rgba(255,255,255,0.06)", border: "none", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                aria-label="Close menu">
                <FaTimes style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            {user && (
              <div style={{ margin: "16px 28px 0", padding: "16px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  {userAvatar ? (
                    <img src={userAvatar} alt={userName} style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(229,9,20,0.4)" }} />
                  ) : (
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "rgba(229,9,20,0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "2px solid rgba(229,9,20,0.4)" }}>
                      <span style={{ color: "#e50914", fontWeight: 700, fontSize: "1.1rem" }}>{userName[0]?.toUpperCase()}</span>
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ color: "white", fontWeight: 700, fontSize: "0.95rem", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{userName}</p>
                    {discordTag && (
                      <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.75rem", margin: "2px 0 0", display: "flex", alignItems: "center", gap: "4px" }}>
                        @{discordTag}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "8px" }}>
                  <Link
                    href="/admin"
                    onClick={closeMenu}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "rgba(229,9,20,0.08)", border: "1px solid rgba(229,9,20,0.15)", borderRadius: "12px", color: "#e50914", textDecoration: "none", fontWeight: 600, fontSize: "0.875rem" }}>
                    <FaShieldAlt style={{ width: "14px", height: "14px" }} />
                    Admin Dashboard
                  </Link>
                  <button
                    onClick={() => { handleSignOut(); closeMenu(); }}
                    style={{ display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", color: "rgba(255,255,255,0.6)", fontWeight: 600, fontSize: "0.875rem", cursor: "pointer", width: "100%" }}>
                    <FaSignOutAlt style={{ width: "14px", height: "14px" }} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            <div style={{ flex: 1, padding: "32px 28px", display: "flex", flexDirection: "column", gap: "36px" }}>
              {navSections.map((section, sectionIdx) => (
                <div key={sectionIdx}>
                  <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: "16px" }}>
                    {section.label}
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    {section.links.map((link, linkIdx) => (
                      <Link
                        key={linkIdx}
                        href={link.href}
                        onClick={closeMenu}
                        style={{ color: "white", textDecoration: "none", fontSize: "1.25rem", fontWeight: 600, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "space-between", transition: "color 0.2s, padding-left 0.2s" }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent, #e50914)";
                          (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "8px";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.color = "white";
                          (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0px";
                        }}>
                        {link.text}
                        <svg style={{ width: "18px", height: "18px", opacity: 0.3 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: "24px 28px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              {user ? (
                <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)", fontSize: "0.75rem" }}>
                  Logged in as <span style={{ color: "white", fontWeight: 600 }}>{userName}</span>
                </div>
              ) : (
                <a
                  href="https://discord.gg/MwNE7Vfb6t"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  style={{ display: "block", width: "100%", textAlign: "center", padding: "16px", background: "white", color: "black", fontWeight: 700, fontSize: "1rem", borderRadius: "100px", textDecoration: "none", transition: "transform 0.15s, box-shadow 0.15s" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 0 30px rgba(229,9,20,0.4)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
                    (e.currentTarget as HTMLAnchorElement).style.boxShadow = "none";
                  }}>
                  Join Community
                </a>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

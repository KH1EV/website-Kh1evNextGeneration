"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Privacy() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );

    gsap.fromTo(
      ".content-section",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out", delay: 0.2 }
    );
  }, { scope: containerRef });

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden selection:bg-accent selection:text-white" ref={containerRef}>
      <Navbar />

      <section className="relative pt-40 pb-20 px-8 md:px-[5%]">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black text-white tracking-tighter leading-[1.1] mb-6 hero-text opacity-0">
              Privacy <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4 italic md:whitespace-nowrap">Policy.</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-4xl mx-auto hero-text leading-relaxed opacity-0">
              Last updated: June 4, 2026
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-10 text-neutral-300 leading-relaxed">
            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
              <p>
                When you log in to Kh1ev using your Discord account, we collect strictly the basic profile information provided by the Discord API. This includes your Discord ID, username, and avatar URL. We do not have access to your private messages, email address (unless specifically requested and authorized), or password.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
              <p>
                The information we collect is used solely to provide and improve our services. Specifically, we use your Discord profile to authenticate your identity, display your avatar and username within the community portal, and manage your roles or permissions within our organization.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">3. Data Storage and Security</h2>
              <p>
                We prioritize the security of your data. Your information is securely stored in our databases with industry-standard encryption and security measures. We only retain your data for as long as your account is active or as needed to provide you services.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">4. Third-Party Sharing</h2>
              <p>
                Kh1ev does not sell, trade, or rent your personal information to third parties. We may share generic aggregated demographic information not linked to any personal identification information with our business partners and trusted affiliates for the purposes outlined above.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
              <p>
                You have the right to request access to the personal data we hold about you and to ask that your personal data be corrected, updated, or deleted. If you wish to exercise this right, please contact our support team via our Discord server or the contact information provided on our website.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">6. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

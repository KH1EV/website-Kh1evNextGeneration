"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Terms() {
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
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="mb-16 text-center">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black text-white tracking-tighter leading-[1.1] mb-6 hero-text opacity-0">
              Terms of <span className="bg-accent text-white px-4 md:px-6 py-1 md:py-2 inline-block mt-2 md:mt-4 italic md:whitespace-nowrap">Service.</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-neutral-400 max-w-4xl mx-auto hero-text leading-relaxed opacity-0">
              Last updated: June 4, 2026
            </p>
          </div>

          <div className="max-w-4xl mx-auto flex flex-col gap-10 text-neutral-300 leading-relaxed">
            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the Kh1ev website, services, and community platforms (including our Discord server), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">2. User Accounts</h2>
              <p>
                To access certain features, you may be required to authenticate using your Discord account. You are responsible for maintaining the security of your account and for all activities that occur under your account. We reserve the right to suspend or terminate accounts that violate our community guidelines or these terms.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">3. Acceptable Use</h2>
              <p>
                You agree not to use our services for any unlawful purpose or in any way that could damage, disable, overburden, or impair our servers or networks. This includes, but is not limited to, unauthorized access, distributing malware, or engaging in harassment.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">4. Intellectual Property</h2>
              <p>
                All content, branding, and original materials provided on the Kh1ev platform are the property of Kh1ev Organization unless otherwise stated. You may not reproduce, distribute, or create derivative works without explicit permission.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">5. Modifications to Service</h2>
              <p>
                Kh1ev reserves the right to modify, suspend, or discontinue any part of the service at any time without prior notice. We will not be liable to you or to any third party for any modification, suspension, or discontinuance of the service.
              </p>
            </div>

            <div className="content-section opacity-0">
              <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall Kh1ev be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

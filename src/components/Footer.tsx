import { FaDiscord, FaGithub, FaInstagram, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative pt-24 pb-8 px-8 md:px-[5%] flex flex-col items-center justify-end overflow-hidden bg-background">
      <div className="w-full max-w-[1200px] flex flex-col md:flex-row justify-between items-end gap-12 mb-8 z-10">
        <div className="flex flex-col gap-4 text-center md:text-left items-center md:items-start">
          <h3 className="text-3xl font-extrabold text-white tracking-tight">Got an Idea?</h3>
          <p className="text-neutral-400 max-w-sm">Let&apos;s build something amazing together. Whether you want to collaborate on a project or join our growing network of developers, we&apos;d love to hear from you.</p>
        </div>
        
        <div className="flex flex-col gap-6 text-center md:text-right items-center md:items-end">
          <h3 className="text-xl font-bold text-white">Connect with us</h3>
          <div className="flex flex-wrap justify-center md:justify-end gap-3">
            {[
              { name: 'Discord', icon: <FaDiscord className="w-4 h-4" />, href: 'https://discord.gg/MwNE7Vfb6t' },
              { name: 'GitHub', icon: <FaGithub className="w-4 h-4" />, href: 'https://github.com/KH1EV' },
              { name: 'Instagram', icon: <FaInstagram className="w-4 h-4" />, href: 'https://instagram.com/kh1ev.community' },
              { name: 'TikTok', icon: <FaTiktok className="w-4 h-4" />, href: 'https://tiktok.com/@kh1ev' }
            ].map((social) => (
              <a key={social.name} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/[0.02] text-neutral-400 text-sm font-semibold hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_5px_20px_rgba(229,9,20,0.3)]">
                {social.icon}
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full relative flex justify-center items-center pointer-events-none select-none -mt-4">
        <h1 className="text-[15vw] md:text-[20vw] leading-[0.8] font-extrabold text-white/[0.03] tracking-tighter m-0 w-full text-center">
          KH1EV.
        </h1>
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center text-sm text-neutral-600 font-medium z-10">
        &copy; 2023 Kh1ev Organization.
      </div>
    </footer>
  );
}

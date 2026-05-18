export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#333333] py-16 relative z-10 w-full">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display font-bold text-lg tracking-wide text-white">
            Dev<span className="text-[#CC3366]">Port</span>
          </span>
          <span className="text-[#D0D0D0] text-[12px]">
            Full Stack Developer &amp; Geologist
          </span>
        </div>

        <div className="text-[#D0D0D0] text-[12px]">
          © {new Date().getFullYear()} Narongrit Sornjai
        </div>

        <div className="flex gap-4">
          <a
            href="https://github.com/Lepidocodie"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[44px] h-[44px] rounded-full border border-white/19 flex items-center justify-center text-white hover:text-[#00EDFF] hover:border-[#00EDFF] hover:bg-white/5 transition-all duration-300 text-base"
          >
            <i className="bi bi-github"></i>
          </a>
          <a
            href="https://linkedin.com/in/narongrit-sornjai-53289b179"
            target="_blank"
            rel="noopener noreferrer"
            className="w-[44px] h-[44px] rounded-full border border-white/19 flex items-center justify-center text-white hover:text-[#00EDFF] hover:border-[#00EDFF] hover:bg-white/5 transition-all duration-300 text-base"
          >
            <i className="bi bi-linkedin"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}
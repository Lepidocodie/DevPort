export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-background-dark py-12 relative z-10 w-full">
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-col items-center md:items-start gap-2">
                    <span className="text-white font-display font-bold text-xl tracking-tight uppercase">DevPort</span>
                    <span className="text-primary font-display text-[10px] tracking-[0.3em] uppercase opacity-60">System Version 2026.04</span>
                </div>

                <div className="text-gray-500 font-body text-xs tracking-wide">
                    © {new Date().getFullYear()} Narongrit Sornjai. Built with structural integrity.
                </div>

                <div className="flex gap-6">
                    <a href="https://github.com/Lepidocodie" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-all duration-300 text-lg hover:-translate-y-1"><i className="bi bi-github"></i></a>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-secondary transition-all duration-300 text-lg hover:-translate-y-1"><i className="bi bi-linkedin"></i></a>
                </div>
            </div>
        </footer>
    );
}
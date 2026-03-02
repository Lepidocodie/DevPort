export function Footer() {
    return (
        <footer className="border-t border-gray-800 bg-black/40 backdrop-blur-sm py-8 relative z-10 w-full">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-background-dark font-bold font-display text-xs">
                        DP
                    </div>
                    <span className="text-white font-bold text-lg">DevPortfolio</span>
                </div>

                <div className="text-gray-500 text-sm">
                    © Copyright DevPortfolio. All rights reserved.
                </div>

                <div className="flex gap-4">
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl"><i className="bi bi-discord"></i></a>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors text-xl"><i className="bi bi-github"></i></a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl"><i className="bi bi-controller"></i></a>
                    <a href="#" className="text-gray-400 hover:text-primary transition-colors text-xl"><i className="bi bi-instagram"></i></a>
                </div>
            </div>
        </footer>
    );
}
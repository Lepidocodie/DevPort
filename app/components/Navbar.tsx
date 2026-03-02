"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="shrink-0 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-linear-to-br from-primary to-secondary flex items-center justify-center text-background-dark font-bold font-display text-lg shadow-neon-green">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="w-full h-full p-1" fill="white">
                  <path d="M240-360h96q19 0 32.5-13.5T382-406v-148q0-19-13.5-32.5T336-600h-96v240Zm46-46v-148h50v148h-50Zm149 46h98v-46h-82v-52h52v-46h-52v-50h82v-46h-98q-13 0-21.5 8.5T405-570v180q0 13 8.5 21.5T435-360Zm228.5-9.5Q673-378 676-391l56-209h-48l-43 164-43-164h-48l56 209q3 13 12.5 21.5T641-361q13 0 22.5-8.5ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/>
                </svg>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-wider">DevPortfolio</span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/#home" className="text-white hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">Home</Link>
              <Link href="/#skills" className="text-gray-300 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">Skills</Link>
              <Link href="/#projects" className="text-gray-300 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">Projects</Link>
              <Link href="/#about" className="text-gray-300 hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.8)]">About</Link>
            </div>
          </div>

          <div className="hidden md:block">
            <Link href="/#about" className="group relative px-6 py-2 bg-transparent overflow-hidden rounded-full font-display font-bold text-primary border border-primary hover:text-background-dark hover:bg-primary transition-all duration-300 shadow-[0_0_10px_rgba(74,222,128,0.3)] hover:shadow-[0_0_20px_rgba(74,222,128,0.6)]">
              <span className="relative z-10">CONTACT ME</span>
            </Link>
          </div>

          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass-nav absolute top-full left-0 w-full border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <Link href="/#home" onClick={() => setIsMobileMenuOpen(false)} className="text-white hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Home</Link>
            <Link href="/#skills" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Skills</Link>
            <Link href="/#projects" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">Projects</Link>
            <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-gray-300 hover:text-primary block px-3 py-2 rounded-md text-base font-medium">About</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
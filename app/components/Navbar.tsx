"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { GlassNavButton } from "@/app/components/GlassNavButton";
import { ChromaButton } from "@/app/components/ChromaButton";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#home", label: "Home" },
    { href: "/#skills", label: "Skills" },
    { href: "/#projects", label: "Projects" },
    { href: "/#certificates", label: "Certificates" },
    { href: "/#about", label: "About" },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "glass-nav py-1" : "bg-transparent py-3"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
        <div className="flex items-center justify-between h-[60px]">
          <Link href="/" className="flex items-center group">
            <span className="font-display font-bold text-xl tracking-wide text-white transition-colors duration-200 group-hover:text-[#00DEFF]">
              Dev<span className="text-[#CC3366]">Port</span>
            </span>
          </Link>

          {/* Desktop Nav — Glass 3D links */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <GlassNavButton
                key={link.href}
                label={link.label}
                href={link.href}
              />
            ))}
          </div>

          <div className="hidden md:block">
            <ChromaButton href="/#about" label="Contact Me" />
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex md:hidden items-center justify-center w-[44px] h-[44px] rounded-full text-[#D6D6D6] hover:text-white hover:bg-white/10 transition-all duration-200 active:scale-90"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu — simple links (no 3D on touch) */}
      <div
        className={`md:hidden absolute top-full left-0 w-full border-t border-white/10 transition-all duration-[400ms] ease-[var(--ease-out-quint)] overflow-hidden ${
          isMobileMenuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-4 space-y-1 bg-[#444444]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-[15px] text-base font-normal text-white hover:text-[#00EDFF] hover:bg-white/5 transition-all duration-200"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 border-t border-white/10 flex justify-center">
            <ChromaButton
              href="/#about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center"
              label="Contact Me"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
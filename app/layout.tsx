import type { Metadata } from "next";
import { Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

// Configure Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ["latin"], variable: "--font-share-tech-mono" });

export const metadata: Metadata = {
  title: "DevPortfolio - Frontend Developer & Geologist",
  description: "A modern cybernetic portfolio website showcasing my work.",
  icons: {
    icon: "icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      {/* We add both font variables here, which allows Tailwind's font-display and font-body to pick them up via CSS vars or global classes if correctly configured in layout */}
      <body className={`${inter.variable} ${shareTechMono.variable}`} suppressHydrationWarning>
        {/* Ambient Backgrounds */}
        <div className="fixed inset-0 z-[-2] bg-background-dark"></div>
        <div className="fixed inset-0 z-[-1] tech-grid opacity-30"></div>
        
        {/* Subtle Ambient Lights */}
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none z-0"></div>
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/10 blur-[120px] pointer-events-none z-0"></div>
        
        <div className="scanlines"></div>
        <div className="relative z-10">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

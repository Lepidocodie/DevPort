import type { Metadata } from "next";
import { Inter, Share_Tech_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";

// Configure Fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const shareTechMono = Share_Tech_Mono({ weight: '400', subsets: ["latin"], variable: "--font-share-tech-mono" });

export const metadata: Metadata = {
  title: "DevPortfolio - Fullstack Developer & Geologist",
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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css" />
      </head>
      {/* We add both font variables here, which allows Tailwind's font-display and font-body to pick them up via CSS vars or global classes if correctly configured in layout */}
      <body className={`${inter.variable} ${shareTechMono.variable}`}>
        <div className="scanlines"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}

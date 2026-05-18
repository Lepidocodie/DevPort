"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/app/lib/animations";
import { portfolioData, SKILL_CATEGORIES } from "@/app/lib/data";
import { ProjectCard } from "@/app/components/ProjectCard";
import { MiniProjectCard } from "@/app/components/MiniProjectCard";
import { CertificateCard } from "@/app/components/CertificateCard";
import { CertificateModal } from "@/app/components/CertificateModal";
import { BlindsTextReveal } from "@/app/components/BlindsTextReveal";
import type { Certificate } from "@/app/lib/types";


import { ChromaButton } from "@/app/components/ChromaButton";
import { GlassNavButton } from "@/app/components/GlassNavButton";

const LightRays = dynamic(() => import("@/app/components/LightRays").then(m => m.LightRays), { ssr: false });
const InteractiveGrid = dynamic(() => import("@/app/components/InteractiveGrid").then(m => m.InteractiveGrid), { ssr: false });

export default function Home() {
  const [activeCert, setActiveCert] = React.useState<Certificate | null>(null);
  const [activeTag, setActiveTag] = React.useState("All");

  const projects = portfolioData.getProjects();
  const miniProjects = portfolioData.getMiniProjects();
  const certificateTags = portfolioData.getCertificateTags();
  const filteredCertificates = portfolioData.filterCertificates(activeTag);

  const leadSkills = SKILL_CATEGORIES.filter((c) => c.size === "large");
  const supportSkills = SKILL_CATEGORIES.filter((c) => c.size === "compact");

  return (
    <main className="relative z-10 w-full overflow-hidden">

      {/* ══════════ HERO — LightRays background ══════════ */}
      <motion.section
        initial="hidden" animate="visible" variants={staggerContainer}
        id="home" className="relative min-h-screen flex items-center justify-center px-6 lg:px-10"
      >
        <LightRays
          color1="#00EDFF" color2="#CC3366"
          backgroundColor="#333333"
          intensity={50} rays={30} reach={40} speed={10} position={80}
          className="absolute inset-0 z-0"
        />

        <div className="max-w-[1440px] w-full mx-auto relative z-10">
          <div className="max-w-3xl">
            <motion.p variants={fadeUp} className="text-[#CC3366] font-display text-[14px] mb-8">
              Portfolio 2026
            </motion.p>

            <motion.div variants={fadeUp} className="mb-8">
              <BlindsTextReveal
                text="FULL STACK DEVELOPER & GEOLOGIST"
                blindsColor="#CC3366"
                textColor="#FFFFFF"
                tag="h1"
                trigger="appear"
                direction="left-to-right"
                stagger={0.1}
                duration={0.6}
              />
            </motion.div>

            <motion.p variants={fadeUp} className="text-[#D6D6D6] text-[18px] font-bold leading-[24px] mb-12 max-w-xl">
              Applying structural logic to web interfaces. Meticulously designed, thoroughly engineered.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
              <ChromaButton
                href="#projects"
                label={<>View Work <i className="bi bi-arrow-down"></i></>}
              />
              <GlassNavButton
                href="https://github.com/Lepidocodie"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-nav-lg"
                label={<><i className="bi bi-github"></i> GitHub</>}
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ══════════ SKILLS — InteractiveGrid background ══════════ */}
      <motion.section
        id="skills" initial="hidden" whileInView="visible"
        viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="py-[96px] px-6 lg:px-10 relative"
      >
        <InteractiveGrid
          gridColor="#FFFFFF" dotColor="#FFFFFF" hoverColor="#00EDFF"
          gridSize={60} repulsionStrength={-0.65} radius={290}
          dotSize={1.5} gridThickness={0.5} baseOpacity={0.06}
        />

        <div className="max-w-[1440px] mx-auto relative z-10">
          <motion.div variants={fadeUp} className="mb-[40px]">
            <BlindsTextReveal
              text="Technical Arsenal"
              blindsColor="#00EDFF"
              textColor="#FFFFFF"
              tag="h2"
              trigger="scroll"
              stagger={0.08}
            />
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 gap-[24px] mb-[32px]">
            {leadSkills.map((cat) => (
              <div key={cat.title} className={`bg-[#444444] p-[28px] rounded-[15px] border border-white/19 group transition-all duration-400 ease-out hover:-translate-y-1 ${cat.accent === "cyan" ? "hover:shadow-[0_0_8px_rgba(0,237,255,0.3)]" : "hover:shadow-[0_0_8px_rgba(204,51,102,0.3)]"
                }`}>
                <div className="flex items-center gap-3 mb-[20px]">
                  <span className="text-xl" aria-hidden="true">{cat.icon}</span>
                  <span className={`font-display font-bold text-[14px] transition-colors duration-300 ${cat.accent === "cyan" ? "text-[#D6D6D6] group-hover:text-[#00DEFF]" : "text-[#D6D6D6] group-hover:text-[#CC3366]"
                    }`}>{cat.title}</span>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {cat.skills.map((skill) => (
                    <span key={skill} className={`px-[12px] py-[4px] text-[12px] font-medium rounded-[25px] border transition-colors duration-300 ${cat.accent === "cyan"
                      ? "bg-[#00EDFF]/10 border-[#00EDFF]/30 text-[#C5F8FF] group-hover:border-[#00EDFF]/60"
                      : "bg-[#CC3366]/10 border-[#CC3366]/30 text-[#CC3366] group-hover:border-[#CC3366]/60"
                      }`}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-[16px]">
            {supportSkills.map((cat) => (
              <div key={cat.title} className="bg-[#444444] px-[24px] py-[16px] rounded-[15px] border border-white/19 flex flex-col sm:flex-row sm:items-center gap-[12px] group transition-all duration-300 hover:border-white/30">
                <div className="flex items-center gap-2 shrink-0 min-w-[160px]">
                  <span className="text-base" aria-hidden="true">{cat.icon}</span>
                  <span className={`font-display font-bold text-[14px] transition-colors duration-300 ${cat.accent === "cyan" ? "text-[#D6D6D6] group-hover:text-[#00DEFF]" : "text-[#D6D6D6] group-hover:text-[#CC3366]"
                    }`}>{cat.title}</span>
                </div>
                <div className="flex flex-wrap gap-[8px]">
                  {cat.skills.map((skill) => (
                    <span key={skill} className="text-[14px] text-[#D6D6D6] leading-[24px]">
                      {skill}{cat.skills.indexOf(skill) < cat.skills.length - 1 && <span className="text-[#ABB8C3] ml-[8px]">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════ PROJECTS ══════════ */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        id="projects" className="py-[96px] px-6 lg:px-10"
      >
        <div className="max-w-[1440px] mx-auto">
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4 mb-[40px]">
            <BlindsTextReveal text="Personal Projects & Works" blindsColor="#CC3366" textColor="#FFFFFF" tag="h2" trigger="scroll" />
            <div className="flex items-center gap-3 bg-[#CC3366]/10 border border-[#CC3366]/30 text-[#CC3366] px-4 py-1.5 rounded-full font-display font-medium text-[14px] shadow-[0_0_12px_rgba(204,51,102,0.15)] backdrop-blur-sm self-end sm:self-auto">
              <div className="w-2 h-2 rounded-full bg-[#CC3366] animate-pulse"></div>
              {projects.length} Projects
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-[24px]">
            {projects.map((proj) => (
              <ProjectCard key={proj.id} id={proj.id} title={proj.name} description={proj.description}
                tags={proj.tag} demoUrl={proj.link} repoUrl={proj.github} image={proj.cover} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════ MINI PROJECTS ══════════ */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="py-[56px] px-6 lg:px-10"
      >
        <div className="max-w-[1440px] mx-auto">
          <motion.div variants={fadeUp} className="mb-[32px]">
            <BlindsTextReveal text="Laboratory & Mini Projects" blindsColor="#00EDFF" textColor="#FFFFFF" tag="h2" trigger="scroll" />
          </motion.div>
          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-[24px]">
            {miniProjects.map((mp) => (
              <MiniProjectCard key={mp.id} id={mp.id} title={mp.name} description={mp.description}
                tags={mp.tag} demoUrl={mp.link} repoUrl={mp.github} image={mp.cover} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ══════════ CERTIFICATES ══════════ */}
      <motion.section id="certificates" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        className="py-[96px] px-6 lg:px-10"
      >
        <div className="max-w-[1440px] mx-auto">
          <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-between gap-4 mb-[24px]">
            <BlindsTextReveal text="Certificates & Badges" blindsColor="#CC3366" textColor="#FFFFFF" tag="h2" trigger="scroll" />
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 text-[#D6D6D6] px-4 py-1.5 rounded-full font-display font-medium text-[14px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] backdrop-blur-sm self-end sm:self-auto">
              <div className="w-2 h-2 rounded-full bg-[#00EDFF] shadow-[0_0_8px_#00EDFF] animate-pulse"></div>
              {filteredCertificates.length} Verified
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-[8px] mb-[32px] pb-4 overflow-x-auto">
            {certificateTags.map((tag) => (
              <button key={tag} onClick={() => setActiveTag(tag)}
                className={`px-[12px] py-[8px] text-[14px] whitespace-nowrap rounded-[100px] border transition-all duration-300 min-h-[42px] ${activeTag === tag
                  ? "bg-[#CC3366] text-white border-[#CC3366] font-bold"
                  : "bg-transparent text-[#D6D6D6] border-white/19 hover:bg-white/8 hover:border-white/30"
                  }`}>{tag}</button>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-[24px]">
            {filteredCertificates.map((cert) => (
              <CertificateCard key={cert.id} name={cert.name} issuingOrganization={cert.issuingOrganization}
                year={cert.year} cover={cert.cover} tags={cert.tag}
                onClick={() => setActiveCert(cert as Certificate)} />
            ))}
          </motion.div>
        </div>
      </motion.section>

      <CertificateModal certificate={activeCert} onClose={() => setActiveCert(null)} />

      {/* ══════════ ABOUT ══════════ */}
      <motion.section initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
        id="about" className="py-[96px] px-6 lg:px-10"
      >
        <div className="max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row gap-[40px] items-start">
            <motion.div variants={fadeUp} className="relative w-[256px] h-[256px] shrink-0 mx-auto md:mx-0">
              <div className="absolute inset-0 rounded-full border border-[#00EDFF]/30"></div>
              <Image src="/data/image/proflie/profile1.webp" alt="Narongrit Sornjai" fill className="rounded-full object-cover p-3" />
            </motion.div>

            <motion.div variants={fadeUp} className="flex-1 max-w-2xl">
              <BlindsTextReveal text="Narongrit Sornjai" blindsColor="#CC3366" textColor="#FFFFFF" tag="h2" trigger="scroll" />
              <p className="text-[#CC3366] text-[14px] mb-[24px] mt-[8px]">Geologist turned Developer</p>

              <div className="space-y-[16px] text-[18px] text-[#D6D6D6] font-bold leading-[24px] mb-[32px]">
                <p>Former prospector applying the precision of geological mapping to complex digital landscapes.</p>
                <p>Specializing in Full-Stack Development with a focus on building scalable and maintainable web applications.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px] py-[24px] border-t border-white/19 mb-[32px]">
                <div className="flex items-center gap-3">
                  <i className="bi bi-envelope text-[#00DEFF]"></i>
                  <a href="mailto:sonjainarongrit15@gmail.com" className="text-[#D6D6D6] hover:text-[#00DEFF] transition-colors text-[14px]">sonjainarongrit15@gmail.com</a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="bi bi-geo-alt text-[#00DEFF]"></i>
                  <span className="text-[#D6D6D6] text-[14px]">Bangkok, TH</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-[16px] items-center">
                <ChromaButton
                  href="/data/Resume_Narongrit_Sornjai.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  label="Download Resume"
                />
                <div className="flex gap-[8px]">
                  <a href="https://www.facebook.com/nar.ngrit.s.njai.cr" target="_blank" rel="noopener noreferrer"
                    className="w-[44px] h-[44px] rounded-full border border-white/19 flex items-center justify-center text-white hover:text-[#00EDFF] hover:border-[#00EDFF] transition-all duration-300">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="https://linkedin.com/in/narongrit-sornjai-53289b179" target="_blank" rel="noopener noreferrer"
                    className="w-[44px] h-[44px] rounded-full border border-white/19 flex items-center justify-center text-white hover:text-[#00EDFF] hover:border-[#00EDFF] transition-all duration-300">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
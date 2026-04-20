"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ProjectCard } from "@/app/components/ProjectCard";
import { MiniProjectCard } from "@/app/components/MiniProjectCard";
import { CertificateCard } from "@/app/components/CertificateCard";
import { CertificateModal } from "@/app/components/CertificateModal";
import data from "@/public/data/data.json";

export default function Home() {
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1]
      }
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const [activeCert, setActiveCert] = React.useState<typeof data.certificate[0] | null>(null);

  const skillCategories = [
    {
      icon: "🎨",
      title: "Front-end",
      color: "primary" as const,
      skills: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Vue", "Nuxt.js", "TailwindCSS", "Bootstrap"],
    },
    {
      icon: "⚙️",
      title: "Back-end",
      color: "secondary" as const,
      skills: ["Node.js", "Python", "RESTful API", "Web Authentication", "JWT", "Passport.js"],
    },
    {
      icon: "🗄️",
      title: "Database",
      color: "primary" as const,
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "TypeORM", "ODM", "Database Design", "ER Diagram"],
    },
    {
      icon: "☁️",
      title: "DevOps & Cloud",
      color: "secondary" as const,
      skills: ["Docker", "Kubernetes", "Google Cloud", "AWS EC2", "Nginx", "GitHub Actions CI/CD"],
    },
    {
      icon: "🧪",
      title: "Testing & QA",
      color: "primary" as const,
      skills: ["Unit Testing", "Integration Testing", "Performance Testing", "Selenium", "Supertest", "SonarQube"],
    },
    {
      icon: "🛠️",
      title: "Tools",
      color: "secondary" as const,
      skills: ["GitHub", "GitHub Desktop", "VSCode", "Vite", "Postman", "Figma"],
    },
    {
      icon: "🔒",
      title: "Security",
      color: "primary" as const,
      skills: ["OWASP Top 10"],
    },
  ];

  return (
    <main className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-24 relative z-10 w-full overflow-hidden">

      {/* =========================================
          Hero Section
          ========================================= */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        id="home"
        className="relative min-h-[85vh] flex items-center justify-center mt-12 md:mt-0"
      >
        <motion.div
          variants={fadeUp}
          className="glass-panel rounded-3xl p-10 md:p-14 lg:p-16 border border-white/5 shadow-2xl relative overflow-hidden group max-w-4xl w-full text-center"
        >
          <div className="relative z-10 flex flex-col items-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
              FULL STACK DEVELOPER
              <br />
              <span className="text-gray-500 font-light">&amp;</span> <span className="text-primary italic">GEOLOGIST</span>
            </h1>

            <motion.p variants={fadeUp} className="text-gray-400 text-lg md:text-xl mb-10 leading-relaxed max-w-2xl font-body">
              Applying structural logic to web interfaces. Meticulously designed, thoroughly engineered.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center w-full max-w-md mx-auto">
              <Link href="#projects" className="btn-clean w-full sm:w-1/2 flex items-center justify-center px-6 py-4 border border-primary text-background-dark bg-primary font-bold rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.1)] font-display uppercase tracking-wider hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all duration-300 active:scale-95">
                <span className="flex items-center gap-2">View Work <i className="bi bi-arrow-down"></i></span>
              </Link>
              <a href="https://github.com/Lepidocodie" target="_blank" rel="noopener noreferrer" className="btn-clean w-full sm:w-1/2 flex items-center justify-center px-6 py-4 border border-white/20 text-white bg-white/5 hover:bg-white/10 hover:border-white/30 rounded-lg font-display uppercase tracking-wider transition-all duration-300 active:scale-95">
                <i className="bi bi-github mr-2"></i> GitHub
              </a>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>

      {/* =========================================
          Skills Section — 7 Categories
          ========================================= */}
      <motion.section
        id="skills"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white uppercase tracking-widest">Technical Arsenal</h2>
          <div className="h-[2px] w-24 bg-primary mx-auto mt-6 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.3)]"></div>
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat, idx) => (
            <div
              key={cat.title}
              className={`glass-panel p-7 rounded-2xl border border-white/5 transition-all duration-[400ms] ease-[var(--ease-out-quart)] group ${cat.color === "primary"
                  ? "hover:border-primary/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.08)]"
                  : "hover:border-secondary/40 hover:shadow-[0_0_20px_rgba(14,165,233,0.08)]"
                } ${idx === 6 ? "md:col-span-2 lg:col-span-1" : ""}`}
            >
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/5">
                <span className="text-xl" aria-hidden="true">{cat.icon}</span>
                <h3 className={`font-display font-bold text-xs uppercase tracking-[0.25em] transition-colors ${cat.color === "primary" ? "text-gray-500 group-hover:text-primary" : "text-gray-500 group-hover:text-secondary"
                  }`}>
                  {cat.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md border transition-colors duration-300 ${cat.color === "primary"
                        ? "bg-primary/5 border-primary/15 text-gray-300 group-hover:border-primary/30 group-hover:text-white"
                        : "bg-secondary/5 border-secondary/15 text-gray-300 group-hover:border-secondary/30 group-hover:text-white"
                      }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* =========================================
          Projects Section
          ========================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        id="projects"
        className="pt-24 relative"
      >
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-secondary font-display tracking-widest text-sm uppercase">Case Studies</span>
              <div className="h-[1px] w-12 bg-secondary"></div>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white uppercase tracking-widest">
              Featured Work
            </h2>
          </div>
          <p className="text-gray-400 max-w-sm font-body font-light text-base leading-relaxed opacity-80">
            Structural logic met with clean UI execution.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full relative z-10">
          {data.project.map((proj) => (
            <div key={proj.id} className="w-full">
              <ProjectCard
                id={proj.id}
                title={proj.name}
                description={proj.description}
                tags={proj.tag}
                demoUrl={proj.link}
                repoUrl={proj.github}
                image={proj.cover}
              />
            </div>
          ))}
        </motion.div>
      </motion.section>

      {/* =========================================
          Mini Projects / Laboratory
          ========================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="text-left mb-12 border-b border-white/10 pb-6 relative">
          <div className="absolute bottom-0 left-0 w-32 h-[2px] bg-secondary"></div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-widest">Laboratory</h2>
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.miniproject.map((miniProj) => (
            <MiniProjectCard
              key={miniProj.id}
              id={miniProj.id}
              title={miniProj.name}
              description={miniProj.description}
              tags={miniProj.tag}
              demoUrl={miniProj.link}
              repoUrl={miniProj.github}
              image={miniProj.cover}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* =========================================
          Certificates & Skill Badges
          ========================================= */}
      <motion.section
        id="certificates"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <span className="text-primary font-display tracking-widest text-sm uppercase">Verified</span>
              <div className="h-[1px] w-12 bg-primary"></div>
            </div>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white uppercase tracking-widest">
              Certificates &amp; Badges
            </h2>
          </div>
          <p className="text-gray-400 max-w-xs font-body font-light text-sm leading-relaxed opacity-80">
            {data.certificate.length} verified skill badges from Google Cloud.
          </p>
        </motion.div>
        <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {data.certificate.map((cert) => (
            <CertificateCard
              key={cert.id}
              name={cert.name}
              issuingOrganization={cert.issuingOrganization}
              year={cert.year}
              cover={cert.cover}
              tags={cert.tag}
              onClick={() => setActiveCert(cert)}
            />
          ))}
        </motion.div>
      </motion.section>

      {/* Certificate Detail Modal */}
      <CertificateModal
        certificate={activeCert}
        onClose={() => setActiveCert(null)}
      />

      {/* =========================================
          About Me / Logbook
          ========================================= */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        id="about"
        className="pb-20"
      >
        <motion.div variants={fadeUp} className="text-center md:text-left mb-16 border-b border-white/5 pb-8 relative">
          <div className="absolute bottom-[-1px] left-0 w-32 h-[1px] bg-primary"></div>
          <h2 className="text-3xl lg:text-4xl font-display font-bold text-white uppercase tracking-[0.4em] opacity-50">Logbook</h2>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center lg:px-8">
          <motion.div variants={fadeUp} className="relative w-72 h-72 shrink-0 group">
            <div className="absolute inset-[-10px] rounded-full bg-gradient-to-r from-primary via-secondary to-primary opacity-30 group-hover:opacity-60 blur-xl transition-opacity duration-700 animate-[spin_4s_linear_infinite]"></div>
            <div className="absolute inset-0 rounded-full border border-primary/50 shadow-[0_0_30px_rgba(74,222,128,0.3)] animate-[pulse_3s_ease-in-out_infinite]"></div>
            <div className="absolute inset-3 rounded-full border border-white/10 backdrop-blur-sm z-10"></div>
            <Image
              src="/data/image/proflie/profile1.webp"
              alt="Narongrit Sornjai Profile"
              fill
              className="rounded-full object-cover p-4 relative z-20 group-hover:scale-105 transition-transform duration-500"
            />
          </motion.div>

          <motion.div variants={fadeUp} className="glass-panel p-10 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors w-full max-w-2xl shadow-2xl relative group overflow-hidden">
            <div className="space-y-8 relative z-10">
              <div className="flex items-start gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl text-white font-display font-bold tracking-tight">Narongrit Sornjai</h3>
                  <p className="text-primary font-display text-sm tracking-widest uppercase mt-2">Geologist turned Developer</p>
                </div>
              </div>

              <div className="space-y-4 font-body text-gray-400 leading-relaxed text-lg">
                <p>Former prospector applying the precision of geological mapping to complex digital landscapes.</p>
                <p>Specializing in React systems with high structural integrity and meticulously defined logic.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                  <i className="bi bi-envelope text-primary"></i>
                  <a href="mailto:sonjainarongrit15@gmail.com" className="text-gray-300 hover:text-white transition-colors">Email</a>
                </div>
                <div className="flex items-center gap-3">
                  <i className="bi bi-geo-alt text-primary"></i>
                  <span className="text-gray-400">Bangkok, TH</span>
                </div>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap gap-5 items-center justify-between relative z-10">
              <a href="/data/Resume_Narongrit_Sornjai.pdf" target="_blank" rel="noopener noreferrer" download="Resume_Narongrit_Sornjai.pdf" className="w-full sm:w-auto text-center px-8 py-3.5 bg-primary text-background-dark font-bold font-display uppercase tracking-widest rounded-lg shadow-[0_0_15px_rgba(74,222,128,0.4)] hover:shadow-[0_0_25px_rgba(74,222,128,0.6)] hover:bg-white transition-all transform hover:-translate-y-1">
                DOWNLOAD RESUME
              </a>
              <div className="flex gap-4 w-full sm:w-auto justify-center sm:justify-end">
                <a href="https://www.facebook.com/nar.ngrit.s.njai.cr" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary text-xl hover:bg-secondary hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer"><i className="bi bi-facebook"></i></a>
                <a href="https://linkedin.com/in/narongrit-sornjai-53289b179" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary text-xl hover:bg-secondary hover:text-white hover:scale-110 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all cursor-pointer"><i className="bi bi-linkedin"></i></a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </main>
  );
}
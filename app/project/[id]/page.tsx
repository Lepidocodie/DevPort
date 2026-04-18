import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Calendar, User } from "lucide-react";
import { Button } from "@/app/components/ui/button";
import { ProjectCarousel } from "@/app/components/ProjectCarousel";
import data from "@/public/data/data.json";

interface ProjectPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export function generateStaticParams() {
  const projects = data.project.map((p) => ({ id: String(p.id) }));
  const miniprojects = data.miniproject.map((p) => ({ id: String(p.id) }));
  return [...projects, ...miniprojects];
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  //ฟังก์ชันตรวจสอบและดึงข้อมูลว่าเป็น Project หรือ Mini Project 
  const getProjectData = (id: string) => {
    // หา Project หลักก่อน
    const foundInProject = data.project.find((p) => String(p.id) === String(id));
    if (foundInProject) return foundInProject;

    //ถ้าไม่เจอ ให้ค้นหาใน Mini Project
    const foundInMiniProject = data.miniproject.find((p) => String(p.id) === String(id));
    if (foundInMiniProject) return foundInMiniProject;

    //ถ้าไม่เจอเลยในทั้ง 2 ที่ คืนค่า null
    return null;
  };

  const project = getProjectData(projectId);

  // 404
  if (!project) {
    notFound();
  }

  let carouselImages: string[] = [];
  if (project.image && project.image.length > 0) {
    // ลูปเพื่อคลีน Path รูปภาพทุกรูปให้ถูกต้อง
    carouselImages = project.image.map(img => 
      img.startsWith('/') ? img : `/${img.replace('my-portfolio/', '')}`
    );
  } else if (project.cover) {
    // ถ้าไม่มี array image ให้ใช้ cover รูปเดียว
    carouselImages = [
      project.cover.startsWith('/') ? project.cover : `/${project.cover.replace('my-portfolio/', '')}`
    ];
  } else {
    carouselImages = ['/placeholder.jpg'];
  }

  return (
    <div className="min-h-screen flex flex-col bg-background-dark text-white font-body selection:bg-primary/30">
      <main className="flex-1">
        <section className="pt-32 pb-16 relative">
          <div className="container mx-auto px-6 max-w-6xl">
            <Link 
              href="/#projects" 
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-all duration-300 mb-12 font-display text-xs uppercase tracking-widest group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> 
              <span>Back to Systems</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <div className="space-y-8">
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-secondary font-display tracking-[0.2em] text-[10px] uppercase">
                      {projectId.startsWith('M') ? 'Laboratory' : 'Case Study'}
                    </span>
                    <div className="h-[1px] w-8 bg-secondary/30"></div>
                  </div>

                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white tracking-tight leading-tight">
                    {project.name}
                  </h1>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tag.map((t) => (
                    <span key={t} className="px-3 py-1 bg-white/5 text-gray-400 border border-white/10 rounded-sm text-[10px] font-bold uppercase tracking-widest">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-lg md:text-xl text-gray-400 leading-relaxed font-body opacity-90 max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4 pt-4">
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="btn-clean px-8 py-4 bg-primary text-background-dark font-display font-bold uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all flex items-center gap-2">
                       Launch Project <ExternalLink size={18} />
                    </a>
                  )}
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-clean px-8 py-4 border border-white/20 text-white hover:bg-white/5 font-display font-bold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2">
                       View Source <Github size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Carousel */}
              <div className="w-full lg:sticky lg:top-32 h-fit">
                <div className="p-1 bg-white/5 rounded-3xl border border-white/10 overflow-hidden shadow-2xl">
                  <ProjectCarousel images={carouselImages} projectName={project.name} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- ส่วนรายละเอียดเนื้อหาด้านล่าง --- */}
        <section className="py-24 container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-16">
            
            <div className="md:col-span-2 space-y-20">
              <div>
                <h2 className="text-sm font-display font-bold text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                  <span className="w-12 h-[1px] bg-primary"></span>
                  Logic & Execution
                </h2>
                <div className="grid gap-4">
                  {project.features.map((feature, index) => (
                    <div key={index} className="glass-panel p-6 rounded-xl border border-white/5 flex items-start gap-4 group hover:border-primary/30 transition-colors">
                      <div className="w-6 h-6 rounded bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
                        <CheckCircle2 size={14} />
                      </div>
                      <span className="text-gray-300 leading-relaxed font-body">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gallery */}
              {project.image && project.image.length > 0 && (
                <div>
                  <h2 className="text-sm font-display font-bold text-white uppercase tracking-[0.3em] mb-8 flex items-center gap-4">
                    <span className="w-12 h-[1px] bg-primary"></span>
                    Field Observations
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-6">
                    {project.image.map((imgSrc, index) => {
                      const cleanPath = imgSrc.startsWith('/') ? imgSrc : `/${imgSrc.replace('my-portfolio/', '')}`;
                      return (
                        <div key={index} className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/5 shadow-xl group">
                          <Image 
                            src={cleanPath} 
                            alt={`${project.name} preview ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[var(--ease-out-quart)] opacity-80 group-hover:opacity-100"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <div className="glass-panel border border-white/5 rounded-2xl p-8 sticky top-32">
                <h3 className="text-xs font-display font-bold text-gray-500 uppercase tracking-widest mb-8 border-b border-white/5 pb-4">Classification</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <User size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Role</p>
                      <p className="text-white font-display font-bold">{project.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Calendar size={16} className="text-primary mt-1" />
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Epoch</p>
                      <p className="text-white font-display font-bold">{project.year}</p>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-4">Core Components</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tag.map((t) => (
                        <span key={t} className="px-2 py-1 bg-white/5 text-gray-400 text-[10px] font-bold uppercase tracking-widest border border-white/5 rounded-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>
      </main>
    </div>
  );
}
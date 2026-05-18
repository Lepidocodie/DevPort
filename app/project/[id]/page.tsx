import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink, CheckCircle2, Calendar, User } from "lucide-react";
import { ProjectCarousel } from "@/app/components/ProjectCarousel";
import { portfolioData, ImageNormalizer } from "@/app/lib/data";
import { GlassNavButton } from "@/app/components/GlassNavButton";


interface ProjectPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export function generateStaticParams() {
  return [
    ...portfolioData.getProjects().map((p) => ({ id: String(p.id) })),
    ...portfolioData.getMiniProjects().map((p) => ({ id: String(p.id) })),
  ];
}

export default async function ProjectDetail({ params }: ProjectPageProps) {
  const resolvedParams = await params;
  const projectId = resolvedParams.id;

  const project = portfolioData.getProjectById(projectId);
  if (!project) notFound();

  const carouselImages = ImageNormalizer.normalizeImageArray(project.image, project.cover);

  return (
    <div className="min-h-screen flex flex-col bg-[#333333] text-white selection:bg-[#00EDFF]/20">
      <main className="flex-1">
        {/* Hero */}
        <section className="pt-[100px] pb-[56px]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-[8px] text-[#D6D6D6] hover:text-[#00DEFF] transition-colors duration-300 mb-[40px] text-[14px] group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform duration-300" />
              Back to Projects
            </Link>

            <div className="grid lg:grid-cols-2 gap-[40px] items-start">
              {/* Content */}
              <div className="space-y-[24px]">
                <h1 className="!text-[28px] font-display font-bold text-white leading-[28px]">
                  {project.name}
                </h1>

                <div className="flex flex-wrap gap-[8px]">
                  {project.tag.map((t) => (
                    <span key={t} className="tag-ghost">{t}</span>
                  ))}
                </div>

                <p className="text-[18px] text-[#D6D6D6] font-bold leading-[24px] max-w-xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-[16px] pt-[16px]">
                  {project.link && (
                    <GlassNavButton
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-nav-lg"
                      label={<>Launch Project <ExternalLink size={16} /></>}
                    />
                  )}
                  {project.github && (
                    <GlassNavButton
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="glass-nav-lg"
                      label={<>View Source <Github size={16} /></>}
                    />
                  )}
                </div>
              </div>

              {/* Carousel */}
              <div className="w-full lg:sticky lg:top-[100px] h-fit">
                <div className="p-[4px] bg-[#444444] rounded-[15px] border border-white/19 overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.5)]">
                  <ProjectCarousel images={carouselImages} projectName={project.name} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detail */}
        <section className="py-[56px]">
          <div className="max-w-[1440px] mx-auto px-6 lg:px-10">
            <div className="grid md:grid-cols-3 gap-[40px]">
              {/* Features & Gallery */}
              <div className="md:col-span-2 space-y-[56px]">
                <div>
                  <h2 className="!text-[16px] font-normal text-white mb-[24px]">
                    Key Features
                  </h2>
                  <div className="grid gap-[16px]">
                    {project.features.map((feature, index) => (
                      <div
                        key={index}
                        className="bg-[#444444] p-[24px] rounded-[15px] border border-white/19 flex items-start gap-[16px] group hover:border-white/30 transition-colors duration-300"
                      >
                        <div className="w-[24px] h-[24px] rounded-[25px] bg-[#00EDFF]/20 flex items-center justify-center text-[#00EDFF] shrink-0 mt-0.5">
                          <CheckCircle2 size={14} />
                        </div>
                        <span className="text-[#D6D6D6] leading-[24px] text-[14px]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {project.image && project.image.length > 0 && (
                  <div>
                    <h2 className="!text-[16px] font-normal text-white mb-[24px]">
                      Screenshots
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-[24px]">
                      {project.image.map((imgSrc, index) => (
                        <div key={index} className="relative w-full aspect-video rounded-[15px] overflow-hidden border border-white/19 shadow-[0_4px_12px_rgba(0,0,0,0.3)] group">
                          <Image
                            src={ImageNormalizer.normalizeImagePath(imgSrc)}
                            alt={`${project.name} preview ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-80 group-hover:opacity-100"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-[24px]">
                <div className="bg-[#444444] border border-white/19 rounded-[15px] p-[28px] sticky top-[100px]">
                  <h3 className="text-[12px] font-display font-bold text-[#ABB8C3] uppercase tracking-wider mb-[24px] border-b border-white/19 pb-[16px]">
                    Project Info
                  </h3>

                  <div className="space-y-[24px]">
                    <div className="flex items-start gap-[16px]">
                      <User size={16} className="text-[#00DEFF] mt-1" />
                      <div>
                        <p className="text-[12px] text-[#ABB8C3] uppercase tracking-wider mb-[4px]">Role</p>
                        <p className="text-white font-display font-bold text-[14px]">{project.role}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-[16px]">
                      <Calendar size={16} className="text-[#00DEFF] mt-1" />
                      <div>
                        <p className="text-[12px] text-[#ABB8C3] uppercase tracking-wider mb-[4px]">Period</p>
                        <p className="text-white font-display font-bold text-[14px]">{project.year}</p>
                      </div>
                    </div>

                    <div className="pt-[24px] border-t border-white/19">
                      <p className="text-[12px] text-[#ABB8C3] uppercase tracking-wider mb-[12px]">Tech Stack</p>
                      <div className="flex flex-wrap gap-[8px]">
                        {project.tag.map((t) => (
                          <span key={t} className="tag-cyan !text-[10px] !py-[4px] !px-[8px]">{t}</span>
                        ))}
                      </div>
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
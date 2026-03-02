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
    <div className="min-h-screen flex flex-col bg-background font-sans text-foreground">
      <main className="flex-1">
        <section className="pt-24 pb-12 bg-secondary/5 border-b border-border">
          <div className="container mx-auto px-4 max-w-6xl">
            <Link 
              href="/#projects" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6 font-medium"
            >
              <ArrowLeft size={18} /> Back to Home
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {/* แสดง Badge ว่าเป็น Project หรือ Mini Project*/}
                <div className="mb-4">
                  <span className="px-3 py-1 bg-secondary text-secondary-foreground border border-border rounded-full text-xs font-semibold uppercase tracking-wider">
                    {projectId.startsWith('M') ? 'Mini Project' : 'Main Project'}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                  {project.name}
                </h1>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tag.map((t) => (
                    <span key={t} className="px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-semibold">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  {project.link && (
                    <Button size="lg" className="gap-2 bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20" asChild>
                      <a href={project.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={18} /> Live
                      </a>
                    </Button>
                  )}
                  {project.github && (
                    <Button variant="outline" size="lg" className="gap-2 border-border hover:bg-secondary/10" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={18} /> Code
                        </a>
                    </Button>
                  )}
                </div>
              </div>

              {/* Carousel */}
              <div className="w-full">
                <ProjectCarousel images={carouselImages} projectName={project.name} />
              </div>

            </div>
          </div>
        </section>

        {/* --- ส่วนรายละเอียดเนื้อหาด้านล่าง --- */}
        <section className="py-16 container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="md:col-span-2 space-y-12">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <span className="w-8 h-1 bg-primary rounded-full"></span>
                  Key Features
                </h2>
                <ul className="space-y-4 bg-card p-6 rounded-2xl border border-border shadow-sm">
                  {project.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="text-primary shrink-0 mt-0.5" size={20} />
                      <span className="text-foreground/80 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Gallery */}
              {project.image && project.image.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                    <span className="w-8 h-1 bg-primary rounded-full"></span>
                    Gallery
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {project.image.map((imgSrc, index) => {
                      const cleanPath = imgSrc.startsWith('/') ? imgSrc : `/${imgSrc.replace('my-portfolio/', '')}`;
                      return (
                        <div key={index} className="relative w-full aspect-video rounded-xl overflow-hidden border border-border shadow-sm group">
                          <Image 
                            src={cleanPath} 
                            alt={`${project.name} preview ${index + 1}`}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
                <h3 className="text-lg font-bold mb-4 border-b border-border pb-2">Project Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Role</p>
                      <p className="font-medium">{project.role}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-primary">
                      <Calendar size={18} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Development Year</p>
                      <p className="font-medium">{project.year}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <p className="text-sm text-muted-foreground mb-3">Stack Technologies</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tag.map((t) => (
                      <span key={t} className="px-2.5 py-1 bg-secondary/10 text-secondary-foreground text-xs font-medium rounded-md">
                        {t}
                      </span>
                    ))}
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
import Image from "next/image"
import Link from "next/link"

interface ProjectCardProps {
    id: string
    title: string
    description: string
    tags: string[]
    demoUrl?: string
    repoUrl?: string
    image?: string
}

export function ProjectCard({
    id,
    title,
    description,
    tags,
    demoUrl,
    repoUrl,
    image,
}: ProjectCardProps) {
    const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAYey_5MbtnWRUzasKHUA_qDW9IrdWU3mPnU_ySeHQP89WX0CxFRmar9fxGKz5TgjOhtyt0FcfO1wUiaEUVPPFibhlNk5RS7gxVmv2Ny5qY4Xqth93P07qFLbQEKzjhU9xX4LodikXGj-NBJS4bqLzeFFEdYnP3lo1TwfDEJsVMvBqtS6ertafQJg3uH1gKHVsULyKD8Ztto6D66sfk5r8bduyDPsCBPUEyFHbR4gYeJp2KdI0_KPyLHYE6i5hy9GtYLFvHLreJYMcE";
    const srcPath = image?.replace('my-portfolio/', '');
    const src = srcPath ? (srcPath.startsWith('/') ? srcPath : `/${srcPath}`) : defaultImage;

    return (
        <div className="glass-panel rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform duration-500 ease-smooth border border-white/5 hover:border-primary/50 hover:shadow-neon-green group flex flex-col h-full bg-card-dark/40 backdrop-blur-xl">
            <Link href={`/project/${id}`} className="block h-52 bg-gray-900 relative overflow-hidden shrink-0">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700 ease-out"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-80"></div>
                
                <div className="absolute bottom-3 right-3 flex gap-2 flex-wrap justify-end z-10">
                    {tags.slice(0, 3).map((tag, i) => {
                        const colors = [
                            "text-primary border-primary/40 bg-primary/10",
                            "text-cyan-400 border-cyan-400/40 bg-cyan-400/10",
                            "text-purple-400 border-purple-400/40 bg-purple-400/10"
                        ];
                        const colorClass = colors[i % colors.length];
                        return (
                            <span key={tag} className={`backdrop-blur-md ${colorClass} text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-sm border shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                                {tag}
                            </span>
                        )
                    })}
                </div>
            </Link>

            <div className="p-6 flex flex-col flex-grow relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
                <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed font-light">
                    {description}
                </p>
                <div className="flex gap-4 mt-auto">
                    <Link href={`/project/${id}`} className="btn-clean flex-1 py-3.5 rounded-sm border border-primary text-primary hover:bg-primary hover:text-background-dark text-center text-[13px] font-bold font-display uppercase tracking-widest bg-primary/10 hover:shadow-neon-green">
                        <span className="flex items-center justify-center gap-2">Details <i className="bi bi-arrow-up-right group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"></i></span>
                    </Link>
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="btn-clean flex-1 py-3.5 rounded-sm border border-secondary text-secondary hover:bg-secondary hover:text-white text-center text-[13px] font-bold font-display uppercase tracking-widest bg-secondary/10 hover:shadow-neon-blue">
                           <span className="flex items-center justify-center gap-2">Live Demo <i className="bi bi-box-arrow-up-right"></i></span>
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}
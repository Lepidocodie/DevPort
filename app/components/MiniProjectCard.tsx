import Image from "next/image"
import Link from "next/link"

interface MiniProjectCardProps {
    id: string
    title: string
    description: string
    tags: string[]
    demoUrl?: string
    repoUrl?: string
    image?: string
}

export function MiniProjectCard({
    id,
    title,
    description,
    tags,
    demoUrl,
    repoUrl,
    image,
}: MiniProjectCardProps) {
    const defaultImage = "https://lh3.googleusercontent.com/aida-public/AB6AXuAYey_5MbtnWRUzasKHUA_qDW9IrdWU3mPnU_ySeHQP89WX0CxFRmar9fxGKz5TgjOhtyt0FcfO1wUiaEUVPPFibhlNk5RS7gxVmv2Ny5qY4Xqth93P07qFLbQEKzjhU9xX4LodikXGj-NBJS4bqLzeFFEdYnP3lo1TwfDEJsVMvBqtS6ertafQJg3uH1gKHVsULyKD8Ztto6D66sfk5r8bduyDPsCBPUEyFHbR4gYeJp2KdI0_KPyLHYE6i5hy9GtYLFvHLreJYMcE";
    const srcPath = image?.replace('my-portfolio/', '');
    const src = srcPath ? (srcPath.startsWith('/') ? srcPath : `/${srcPath}`) : defaultImage;

    return (
        <div className="glass-panel rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 ease-smooth border border-white/5 hover:border-secondary/50 hover:shadow-neon-blue group flex flex-col h-full bg-card-dark/40 backdrop-blur-xl">
            <Link href={`/project/${id}`} className="block h-44 bg-gray-900 relative overflow-hidden shrink-0">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform duration-500 ease-smooth"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent opacity-90"></div>
                
                <div className="absolute bottom-3 right-3 flex gap-2 flex-wrap justify-end z-10">
                    {tags.slice(0, 3).map((tag, i) => {
                         const colors = [
                            "text-secondary border-secondary/40 bg-secondary/10",
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

            <div className="p-5 flex flex-col flex-grow relative z-10">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-secondary transition-colors">{title}</h3>
                <p className="text-gray-400 text-xs mb-5 line-clamp-2 flex-grow leading-relaxed font-light">
                    {description}
                </p>
                <div className="flex gap-3 mt-auto">
                    <Link href={`/project/${id}`} className="btn-clean flex-1 py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-background-dark text-center text-xs font-bold font-display uppercase tracking-widest shadow-[0_0_10px_rgba(74,222,128,0.1)] hover:shadow-neon-green">
                        DETAILS
                    </Link>
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="btn-clean flex-1 py-2 rounded-lg border border-secondary text-secondary hover:bg-secondary hover:text-white text-center text-xs font-bold font-display uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.1)] hover:shadow-neon-blue">
                            LIVE
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

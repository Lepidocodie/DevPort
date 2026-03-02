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
        <div className="glass-panel rounded-xl overflow-hidden hover:scale-[1.02] transition-transform duration-300 border border-primary/20 hover:border-primary/50 group flex flex-col h-full">
            <Link href={`/project/${id}`} className="block h-48 bg-gray-800 relative overflow-hidden shrink-0">
                <Image
                    src={src}
                    alt={title}
                    fill
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                />
                <div className="absolute bottom-2 right-2 flex gap-1 flex-wrap justify-end">
                    {tags.slice(0, 3).map((tag, i) => {
                        const colors = [
                            "text-primary border-primary/30",
                            "text-blue-400 border-blue-400/30",
                            "text-red-400 border-red-400/30"
                        ];
                        const colorClass = colors[i % colors.length];
                        return (
                            <span key={tag} className={`bg-black/70 backdrop-blur-sm ${colorClass} text-xs px-2 py-1 rounded border`}>
                                {tag}
                            </span>
                        )
                    })}
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                    {description}
                </p>
                <div className="flex gap-3 mt-auto">
                    <Link href={`/project/${id}`} className="flex-1 py-2 rounded border border-primary text-primary hover:bg-primary hover:text-background-dark text-center text-sm font-display transition-colors">
                        DETAILS
                    </Link>
                    {demoUrl && (
                        <a href={demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded border border-secondary text-secondary hover:bg-secondary hover:text-white text-center text-sm font-display transition-colors">
                            LIVE
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

import Image from "next/image";
import Link from "next/link";
import { ImageNormalizer } from "@/app/lib/data";

import { GlassNavButton } from "@/app/components/GlassNavButton";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  repoUrl?: string;
  image?: string;
}

export function ProjectCard({ id, title, description, tags, demoUrl, image }: ProjectCardProps) {
  const src = ImageNormalizer.normalizeImagePath(image);

  return (
    <div className="card-aeruk group flex flex-col h-full">
      <Link href={`/project/${id}`} className="block h-56 relative overflow-hidden shrink-0">
        <Image
          src={src}
          alt={title}
          fill
          className="w-full h-full object-cover opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-[#333333]/30 to-transparent opacity-80"></div>
        <div className="absolute bottom-3 right-3 flex gap-2 flex-wrap justify-end z-10">
          {tags.slice(0, 3).map((tag, i) => (
            <span key={tag} className={`${i % 2 === 0 ? "tag-cyan" : "tag-magenta"} !py-1 !px-2.5 !text-[10px]`}>
              {tag}
            </span>
          ))}
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[28px] font-bold text-white mb-3 line-clamp-1 group-hover:text-[#00DEFF] transition-colors duration-300 font-display">
          {title}
        </h3>
        <p className="text-[#D6D6D6] text-[14px] mb-6 line-clamp-3 flex-grow leading-[24px]">
          {description}
        </p>
        <div className="flex gap-3 mt-auto">
          <GlassNavButton
            href={`/project/${id}`}
            className="flex-1"
            label={<>Details <i className="bi bi-arrow-up-right text-[10px]"></i></>}
          />
          {demoUrl && (
            <GlassNavButton
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              label={<>Live Demo <i className="bi bi-box-arrow-up-right text-[10px]"></i></>}
            />
          )}
        </div>
      </div>
    </div>
  );
}
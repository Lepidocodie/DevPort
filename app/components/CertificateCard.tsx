"use client";

import type { Certificate } from "@/app/lib/types";

interface CertificateCardProps {
  name: string;
  issuingOrganization: string;
  year: string;
  cover: string;
  tags: string[];
  onClick: () => void;
}

export function CertificateCard({ name, issuingOrganization, year, cover, tags, onClick }: CertificateCardProps) {
  const srcPath = cover?.replace("my-portfolio/", "");
  const src = srcPath ? (srcPath.startsWith("/") ? srcPath : `/${srcPath}`) : "";

  return (
    <button
      onClick={onClick}
      className="card-aeruk group flex flex-col h-full text-left w-full cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00EDFF] focus-visible:outline-offset-2"
    >
      <div className="relative w-full aspect-square bg-[#444444] overflow-hidden shrink-0 flex items-center justify-center">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="w-full h-full object-contain p-6 opacity-75 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.nextElementSibling as HTMLElement;
              if (fb) fb.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ display: src ? "none" : "flex" }}
        >
          <span className="text-[12px] font-display font-bold tracking-widest uppercase text-[#ABB8C3]">
            {issuingOrganization}
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[12px] font-display font-bold uppercase tracking-wider text-[#CC3366] mb-2">
          {issuingOrganization} · {year}
        </span>
        <h3 className="text-[14px] font-display font-bold text-white leading-[24px] line-clamp-2 group-hover:text-[#00DEFF] transition-colors duration-300 mb-3">
          {name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag-ghost !py-0.5 !px-2 !text-[10px]">
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[10px] font-bold text-[#ABB8C3] px-1 py-0.5">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

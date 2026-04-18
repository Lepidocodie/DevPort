"use client";

interface CertificateCardProps {
  name: string;
  issuingOrganization: string;
  year: string;
  cover: string;
  tags: string[];
  onClick: () => void;
}

// Google Cloud SVG icon for fallback
function GCloudIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.19 2.5a7.5 7.5 0 0 1 7.19 5.3H22l-3.68 6.38-3.68-6.38h2.56a5.5 5.5 0 1 0 .94 5.5H20.2a7.5 7.5 0 1 1-8.01-10.8Z" fill="#4285F4" />
      <path d="M4.46 14.52 2 18.88h16.54l-2.45-4.36H4.46Z" fill="#EA4335" />
      <path d="m16.09 14.52-2.45-4.36H6.36L3.91 14.52h12.18Z" fill="#FBBC04" />
      <circle cx="12" cy="12" r="2.5" fill="#34A853" />
    </svg>
  );
}

export function CertificateCard({
  name,
  issuingOrganization,
  year,
  cover,
  tags,
  onClick,
}: CertificateCardProps) {
  const srcPath = cover?.replace("my-portfolio/", "");
  const src = srcPath
    ? srcPath.startsWith("/")
      ? srcPath
      : `/${srcPath}`
    : "";

  return (
    <button
      onClick={onClick}
      className="glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-primary/40 transition-all duration-[400ms] ease-[var(--ease-out-quart)] group flex flex-col h-full text-left w-full cursor-pointer hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background-dark"
    >
      {/* Badge image / fallback */}
      <div className="relative w-full aspect-square bg-gradient-to-br from-gray-900 to-[#0a0f1e] overflow-hidden shrink-0 flex items-center justify-center">
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            className="w-full h-full object-contain p-6 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-[var(--ease-out-quart)]"
            onError={(e) => {
              // On 404, hide the img and show the fallback
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextElementSibling as HTMLElement;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}
        {/* Fallback: always rendered, hidden when real image loads */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ display: src ? "none" : "flex" }}
        >
          <GCloudIcon className="w-12 h-12 opacity-50 group-hover:opacity-80 transition-opacity" />
          <span className="text-[9px] font-display font-bold tracking-[0.2em] uppercase text-gray-600">
            Google Cloud
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-primary mb-2">
          {issuingOrganization} · {year}
        </span>
        <h3 className="text-sm font-display font-bold text-white leading-snug line-clamp-2 group-hover:text-primary transition-colors mb-3">
          {name}
        </h3>
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-[9px] font-bold uppercase tracking-wider text-gray-500 bg-white/5 border border-white/5 px-2 py-0.5 rounded-sm"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-[9px] font-bold text-gray-600 px-1 py-0.5">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";

interface CertificateData {
  id: string;
  name: string;
  issuingOrganization: string;
  credentialID: string;
  description: string;
  year: string;
  cover: string;
  tag: string[];
  image: string[];
  link: string;
}

interface CertificateModalProps {
  certificate: CertificateData | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!certificate) return;

    // Focus the close button when modal opens
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Lock body scroll
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const coverPath = certificate.cover?.replace("my-portfolio/", "");
  const coverSrc = coverPath
    ? coverPath.startsWith("/")
      ? coverPath
      : `/${coverPath}`
    : "";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative glass-panel border border-white/10 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-[scaleIn_300ms_var(--ease-out-quart)]"
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-all"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Badge image */}
        {coverSrc && (
          <div className="relative w-full aspect-square bg-gradient-to-br from-gray-900 to-[#0a0f1e] rounded-t-3xl overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverSrc}
              alt={certificate.name}
              className="w-full h-full object-contain p-8"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fb = e.currentTarget.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = "flex";
              }}
            />
            <div className="absolute inset-0 hidden items-center justify-center text-gray-600 text-sm font-display tracking-widest uppercase">
              No Preview Available
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-8 space-y-6">
          {/* Header */}
          <div>
            <span className="text-[10px] font-display font-bold uppercase tracking-[0.2em] text-primary">
              {certificate.issuingOrganization} · {certificate.year}
            </span>
            <h2
              id="cert-modal-title"
              className="text-xl md:text-2xl font-display font-bold text-white mt-2 leading-tight tracking-tight"
            >
              {certificate.name}
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-400 font-body leading-relaxed text-sm">
            {certificate.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {certificate.tag.map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-bold uppercase tracking-wider text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Credential ID */}
          <div className="pt-4 border-t border-white/5">
            <span className="text-[10px] text-gray-500 uppercase tracking-wider block mb-1">
              Credential ID
            </span>
            <span className="text-xs text-gray-400 font-mono break-all">
              {certificate.credentialID}
            </span>
          </div>

          {/* Action */}
          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-clean inline-flex items-center gap-2 px-6 py-3.5 bg-primary text-background-dark font-display font-bold uppercase tracking-wider rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] transition-all text-sm active:scale-95"
          >
            Verify Credential <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

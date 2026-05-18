"use client";

import { useEffect, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import type { Certificate } from "@/app/lib/types";


interface CertificateModalProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export function CertificateModal({ certificate, onClose }: CertificateModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!certificate) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  const coverPath = certificate.cover?.replace("my-portfolio/", "");
  const coverSrc = coverPath ? (coverPath.startsWith("/") ? coverPath : `/${coverPath}`) : "";

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

      {/* Modal */}
      <div className="relative bg-[#444444] border border-white/19 rounded-[15px] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_12px_32px_rgba(0,0,0,0.7)] animate-[scaleIn_300ms_var(--ease-out-quart)]">
        {/* Close */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          className="absolute top-[16px] right-[16px] z-20 w-[44px] h-[44px] rounded-full bg-white/10 border border-white/19 flex items-center justify-center text-white hover:bg-white/20 hover:border-[#00EDFF] transition-all duration-200"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Badge image */}
        {coverSrc && (
          <div className="relative w-full aspect-square bg-[#333333] rounded-t-[15px] overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverSrc}
              alt={certificate.name}
              className="w-full h-full object-contain p-[32px]"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                const fb = e.currentTarget.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 hidden items-center justify-center text-[#ABB8C3] text-[12px] font-display tracking-widest uppercase"
            >
              No Preview Available
            </div>
          </div>
        )}

        {/* Body */}
        <div className="p-[28px] space-y-[24px]">
          <div>
            <span className="text-[12px] font-display font-bold uppercase tracking-wider text-[#CC3366]">
              {certificate.issuingOrganization} · {certificate.year}
            </span>
            <h2
              id="cert-modal-title"
              className="text-[28px] font-display font-bold text-white mt-[8px] leading-[28px]"
            >
              {certificate.name}
            </h2>
          </div>

          <p className="text-[#D6D6D6] leading-[24px] text-[14px]">
            {certificate.description}
          </p>

          <div className="flex flex-wrap gap-[8px]">
            {certificate.tag.map((tag) => (
              <span key={tag} className="tag-ghost">{tag}</span>
            ))}
          </div>

          <div className="pt-[16px] border-t border-white/19">
            <span className="text-[12px] text-[#ABB8C3] uppercase tracking-wider block mb-[4px]">
              Credential ID
            </span>
            <span className="text-[12px] text-[#D6D6D6] break-all">
              {certificate.credentialID}
            </span>
          </div>

          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-[8px]"
          >
            Verify Credential <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import Link from "next/link";

interface ChromaButtonProps {
  label: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

/**
 * Chroma Button — Ported from Framer's Chroma-Button-IAx7.
 * Dark pill with animated rainbow gradient border, dark overlay, and glow.
 * Polymorphic: renders Link, <a>, or <button> based on props.
 */
export function ChromaButton({
  label,
  href,
  onClick,
  className = "",
  target,
  rel,
  download,
}: ChromaButtonProps) {
  const content = (
    <span className="chroma-btn-wrap">
      {/* Animated spinning rainbow gradient — the border effect */}
      <span className="chroma-gradient" aria-hidden="true" />
      {/* Top-down dark gradient overlay for depth */}
      <span className="chroma-overlay" aria-hidden="true" />
      {/* Dark inner fill */}
      <span className="chroma-inner" aria-hidden="true" />
      {/* Blurred rainbow glow underneath */}
      <span className="chroma-glow" aria-hidden="true" />
      {/* Text label */}
      <span className="chroma-label">{label}</span>
    </span>
  );

  const cls = `chroma-btn ${className}`.trim();

  if (href) {
    const isInternal = href.startsWith("/") || href.startsWith("#");
    if (isInternal && !download) {
      return (
        <Link href={href} className={cls}>
          {content}
        </Link>
      );
    }
    return (
      <a href={href} target={target} rel={rel} download={download} className={cls}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

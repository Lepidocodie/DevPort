"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface GlassNavButtonProps {
  label: React.ReactNode;
  href: string;
  onClick?: () => void;
  className?: string;
  target?: string;
  rel?: string;
}

/**
 * Glass Nav Button — Ported from Framer's Glass-button-mk64.
 * 3D skeuomorphic frosted glass pill with perspective tilt on hover,
 * highlight shine, and spring animations. Polymorphic rendering support.
 */
export function GlassNavButton({
  label,
  href,
  onClick,
  className = "",
  target,
  rel,
}: GlassNavButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <motion.span
      className="glass-nav-pill w-full"
      animate={{
        rotateX: isHovered ? 12 : 0,
        scale: isHovered ? 0.96 : 1,
      }}
      transition={{ type: "spring", damping: 44, mass: 0.3, stiffness: 273 }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Glass surface gradient */}
      <span className="glass-nav-surface" />
      {/* Diagonal highlight shine */}
      <motion.span
        className="glass-nav-shine"
        animate={{
          opacity: isHovered ? 0.7 : 0.3,
          x: isHovered ? 20 : 0,
        }}
        transition={{ type: "spring", damping: 44, mass: 0.3, stiffness: 273 }}
      />
      {/* 3D depth layer behind */}
      <motion.span
        className="glass-nav-depth"
        animate={{
          rotateX: isHovered ? 14 : 0,
          scale: isHovered ? 0.95 : 1,
        }}
        transition={{ type: "spring", damping: 44, mass: 0.3, stiffness: 273 }}
      />
      {/* Label text */}
      <span className="glass-nav-text flex items-center justify-center gap-2">{label}</span>
    </motion.span>
  );

  const cls = `glass-nav-link ${className}`.trim();
  const isInternal = href.startsWith("/") || href.startsWith("#");

  if (isInternal && !target) {
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cls}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ perspective: 800 }}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      href={href}
      onClick={onClick}
      target={target}
      rel={rel}
      className={cls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ perspective: 800 }}
    >
      {content}
    </a>
  );
}

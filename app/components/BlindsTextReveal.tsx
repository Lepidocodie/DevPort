"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";

interface BlindsTextRevealProps {
  text: string;
  blindsColor?: string;
  textColor?: string;
  tag?: "h1" | "h2" | "h3" | "p";
  trigger?: "appear" | "scroll";
  direction?: "left-to-right" | "right-to-left";
  stagger?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Text reveal with colored blind overlays per line.
 * Ported from Framer's BlindsTextReveal, rewritten with Framer Motion.
 */
export function BlindsTextReveal({
  text,
  blindsColor = "#CC3366",
  textColor = "#FFFFFF",
  tag = "h2",
  trigger = "scroll",
  direction = "left-to-right",
  stagger = 0.08,
  duration = 0.5,
  className = "",
  style,
}: BlindsTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<string[]>([]);
  const [measured, setMeasured] = useState(false);
  const isInView = useInView(containerRef, {
    once: true,
    margin: "-10% 0px",
  });

  const shouldAnimate = trigger === "appear" || isInView;

  // Split text into visual lines by measuring DOM
  useEffect(() => {
    if (!containerRef.current) return;

    const measure = () => {
      const el = containerRef.current;
      if (!el) return;

      // Create a hidden clone to measure line breaks
      const clone = document.createElement("div");
      clone.style.cssText = window.getComputedStyle(el).cssText;
      clone.style.position = "absolute";
      clone.style.visibility = "hidden";
      clone.style.height = "auto";
      clone.style.width = `${el.offsetWidth}px`;
      clone.style.whiteSpace = "normal";
      clone.style.wordBreak = "break-word";

      // Add words one by one to detect line breaks
      const words = text.split(" ");
      const detectedLines: string[] = [];
      let currentLine = "";
      let lastTop = -1;

      document.body.appendChild(clone);

      words.forEach((word, i) => {
        const testLine = currentLine ? `${currentLine} ${word}` : word;
        clone.textContent = testLine;
        const span = document.createElement("span");
        span.textContent = testLine;
        clone.innerHTML = "";
        clone.appendChild(span);
        const rect = span.getBoundingClientRect();

        if (lastTop === -1) {
          lastTop = rect.top;
          currentLine = testLine;
        } else if (rect.height > (parseFloat(window.getComputedStyle(clone).lineHeight) || 24) * 1.5) {
          // Line break detected
          detectedLines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      });

      if (currentLine) detectedLines.push(currentLine);
      document.body.removeChild(clone);

      // Fallback: if detection fails, split by ~60 chars
      if (detectedLines.length === 0) {
        const fallback: string[] = [];
        for (let i = 0; i < text.length; i += 60) {
          fallback.push(text.slice(i, i + 60));
        }
        setLines(fallback.length > 0 ? fallback : [text]);
      } else {
        setLines(detectedLines);
      }
      setMeasured(true);
    };

    // Delay to ensure layout is ready
    const timer = setTimeout(measure, 100);
    return () => clearTimeout(timer);
  }, [text]);

  const getTranslateFrom = () => {
    return direction === "left-to-right" ? "0%" : "0%";
  };

  const getTranslateTo = () => {
    return direction === "left-to-right" ? "-101%" : "101%";
  };

  const Tag = tag;

  return (
    <div ref={containerRef} className={`blinds-text-reveal ${className}`} style={{ width: "100%", ...style }}>
      {!measured ? (
        // Invisible placeholder while measuring
        <Tag style={{ color: textColor, margin: 0, visibility: "hidden" }}>{text}</Tag>
      ) : (
        lines.map((line, i) => (
          <div
            key={i}
            className="relative overflow-hidden inline-block w-full"
            style={{ display: "block" }}
          >
            {/* Actual text */}
            <Tag style={{ color: textColor, margin: 0, display: "block" }}>{line}</Tag>

            {/* Blind overlay */}
            <motion.div
              className="absolute inset-0"
              style={{ backgroundColor: blindsColor }}
              initial={{ x: getTranslateFrom() }}
              animate={shouldAnimate ? { x: getTranslateTo() } : { x: getTranslateFrom() }}
              transition={{
                duration,
                delay: i * stagger,
                ease: [0.25, 1, 0.5, 1],
              }}
            />
          </div>
        ))
      )}
    </div>
  );
}

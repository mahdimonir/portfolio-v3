"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LineRevealProps {
  lines: string[];
  className?: string;
  lineWrapperClassName?: string;
  lineClassName?: string;
  triggerStart?: string;
  triggerEnd?: string;
  stagger?: number;
  scrub?: boolean | number;
}

export default function LineReveal({
  lines,
  className = "",
  lineWrapperClassName = "",
  lineClassName = "",
  triggerStart = "top 85%",
  triggerEnd = "bottom 55%",
  stagger = 0.12,
  scrub = 1.2,
}: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      const validRefs = lineRefs.current.filter(Boolean);
      if (validRefs.length === 0 || !containerRef.current) return;

      gsap.fromTo(
        validRefs,
        {
          yPercent: 120,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          stagger,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            end: triggerEnd,
            scrub,
          },
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [lines, triggerStart, triggerEnd, stagger, scrub],
    }
  );

  return (
    <div ref={containerRef} className={`reveal-group ${className}`}>
      {lines.map((line, idx) => (
        <span
          key={idx}
          className={`reveal-line block overflow-hidden leading-[1.3] ${lineWrapperClassName}`}
        >
          <span
            ref={(el) => {
              lineRefs.current[idx] = el;
            }}
            className={`inline-block will-change-transform ${lineClassName}`}
            style={{ willChange: "transform, opacity" }}
          >
            {line}
          </span>
        </span>
      ))}
    </div>
  );
}

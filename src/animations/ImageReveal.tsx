"use client";

import { useRef } from "react";
import { motion, useInView, type Easing } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageRevealProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  imageClassName?: string;
  once?: boolean;
  duration?: number;
  delay?: number;
  easing?: Easing | Easing[];
  priority?: boolean;
  scrub?: boolean;
  triggerStart?: string;
  triggerEnd?: string;
  offset?: [string, string];
}

const ImageReveal = ({
  src,
  alt,
  className = "",
  imageClassName = "object-cover object-center",
  once = false,
  duration = 0.8,
  delay = 0,
  easing = [0.22, 1, 0.36, 1],
  priority = false,
  scrub = false,
  triggerStart = "top 85%",
  triggerEnd = "bottom 45%",
}: ImageRevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const clipLayerRef = useRef<HTMLDivElement>(null);

  // GSAP scroll scrub: smoothly streams open from top to bottom with scroll, undoes on reverse
  useGSAP(
    () => {
      if (!scrub || !containerRef.current || !clipLayerRef.current) return;

      gsap.fromTo(
        clipLayerRef.current,
        {
          clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
          scale: 1.15,
        },
        {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: triggerStart,
            end: triggerEnd,
            scrub: 1.2,
          },
        }
      );
    },
    {
      scope: containerRef,
      dependencies: [scrub, triggerStart, triggerEnd],
    }
  );

  // In-view entrance for non-scrub mode (Hero)
  const isInView = useInView(containerRef, {
    once,
    margin: "-10% 0px",
  });

  if (scrub) {
    return (
      <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
        <div
          ref={clipLayerRef}
          className="relative w-full h-full will-change-[clip-path,transform]"
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            transform: "scale(1.15)",
          }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={imageClassName}
          />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
        animate={
          isInView
            ? { clipPath: "inset(0% 0% 0% 0%)" }
            : { clipPath: "inset(0% 0% 100% 0%)" }
        }
        transition={{
          duration,
          delay,
          ease: easing,
        }}
        className="relative w-full h-full will-change-[clip-path]"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 50vw"
          className={imageClassName}
        />
      </motion.div>
    </div>
  );
};

export default ImageReveal;
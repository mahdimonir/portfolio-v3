"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform, type Easing } from "framer-motion";
import Image, { StaticImageData } from "next/image";

interface ImageRevealProps {
  src: string | StaticImageData;
  alt: string;
  className?: string;
  once?: boolean;
  duration?: number;
  delay?: number;
  easing?: Easing | Easing[];
  priority?: boolean;
  scrub?: boolean;
  offset?: [string, string];
}

const ImageReveal = ({
  src,
  alt,
  className = "",
  once = false,
  duration = 0.8,
  delay = 0,
  easing = [0.22, 1, 0.36, 1],
  priority = false,
  scrub = true,
  offset = ["start 92%", "center 48%"],
}: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  // Scroll scrub tracking: streams open from top to bottom with scroll, undoes on reverse scroll
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const scrubClipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0% 0% 100% 0%)", "inset(0% 0% 0% 0%)"]
  );

  const scrubScale = useTransform(scrollYProgress, [0, 1], [1.08, 1]);

  // Fallback inView tracking for non-scrub mode (e.g. Hero entrance)
  const isInView = useInView(ref, {
    once,
    margin: "-10% 0px",
  });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {scrub ? (
        <motion.div
          style={{ clipPath: scrubClipPath }}
          className="relative w-full h-full will-change-[clip-path]"
        >
          <motion.div style={{ scale: scrubScale }} className="relative w-full h-full">
            <Image
              src={src}
              alt={alt}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
            />
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
          animate={isInView ? { clipPath: "inset(0% 0% 0% 0%)" } : { clipPath: "inset(0% 0% 100% 0%)" }}
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
            className="object-cover object-top"
          />
        </motion.div>
      )}
    </div>
  );
};

export default ImageReveal;
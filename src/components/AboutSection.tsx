"use client";

import ImageReveal from "@/animations/ImageReveal";
import { TextReveal } from "@/animations/TextReveal";
import FallingText from "@/components/FallingText";
import { useDevice } from "@/hooks/useDevice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDownRight, ArrowRight } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const infoRef = useRef<HTMLDivElement>(null);
    const pinnedImageRef = useRef<HTMLDivElement>(null);
    const fallingTextRef = useRef<HTMLDivElement>(null);
    const { isMobile } = useDevice();

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "+=300%",
                    scrub: 1.5,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            // 1. Brief pause for FallingText
            tl.to({}, { duration: 0.6 });

            // 2. Slide infoRef into view
            tl.fromTo(
                infoRef.current,
                { yPercent: -100 },
                {
                    yPercent: 0,
                    ease: "power2.out",
                    duration: 1.2,
                }
            );

            // 3. Stream the portrait image clip-path from top to bottom with scroll (undo/redo on reverse)
            if (pinnedImageRef.current) {
                tl.fromTo(
                    pinnedImageRef.current,
                    { clipPath: "inset(0% 0% 100% 0%)" },
                    {
                        clipPath: "inset(0% 0% 0% 0%)",
                        ease: "none",
                        duration: 1.0,
                    },
                    "-=0.6"
                );
            }
        },
        { scope: containerRef }
    );

    return (
        <main className="w-full bg-black text-white sofiaBold">
            {/* ============================================================ */}
            {/* PART 1: PINNED SECTION (FallingText + Pinned Hello Screen) */}
            {/* ============================================================ */}
            <section ref={containerRef} className="relative w-full max-h-screen h-screen overflow-hidden border-t border-white/10 bg-black">
                <div ref={fallingTextRef} className="absolute inset-0 h-[75vh] w-full">
                    <section className="h-fit w-full px-6 lg:px-12 pb-2 pt-16 mt-6 lg:mt-0 lg:pt-24 mb-12">
                        <ul className="w-full flex items-center justify-between">
                            <li className="text-[2.2rem] lg:text-[3.5rem] leading-[0.8] tracking-tight"> 2/5 </li>
                            <li className="text-[0.9rem] lg:text-[1.1rem] leading-[0.8] w-auto lg:w-[34%] uppercase splineLight">
                                {" "}
                                For Me{" "}
                            </li>
                            <li className="text-[1.3rem] lg:text-[1.8rem] leading-[0.8] tracking-tighter"> DSGN/2 </li>
                        </ul>
                    </section>

                    <FallingText
                        text={`Technology <br /> is not just built, <br /> but architected <br /> for scale <br /> and impact.`}
                        highlightWords={["is not just built,", "but architected"]}
                        trigger="scroll"
                        backgroundColor="transparent"
                        wireframes={false}
                        gravity={0.6}
                        fontSize={isMobile ? "3.2rem" : "8.5rem"}
                        reset={true}
                        className="tracking-[-2px] lg:tracking-[-10px] pb-5 leading-[0.8]! lg:ml-[8%] uppercase flex items-start lg:items-center justify-center gap-0 text-left!"
                    />
                </div>

                <div
                    ref={infoRef}
                    className="absolute inset-0 h-svh w-full bg-black z-10 flex flex-col items-start justify-start px-6 lg:px-12 text-center"
                    style={{ willChange: "transform" }}
                >
                    <div className="h-screen w-full flex flex-col items-center justify-between">
                        <header className="w-full min-h-[6vh]! mt-[11vh] flex items-center justify-start">
                            <h3 className="tracking-tighter leading-[0.80] text-white text-[1.2rem] splineLight uppercase">ABOUT ME</h3>
                        </header>

                        <section className="w-full h-[calc(100%-12vh)] flex flex-col lg:block">
                            <figure className="w-full lg:w-[18vw] h-auto lg:h-[56%] lg:ml-[26vw] mt-8 lg:mt-16 flex flex-col items-center justify-between gap-6">
                                {/* Pinned Image: Streams from top to bottom with scroll via GSAP */}
                                <div
                                    ref={pinnedImageRef}
                                    style={{ clipPath: "inset(0% 0% 100% 0%)", willChange: "clip-path" }}
                                    className="relative w-[70vw] lg:w-full h-[40vh] lg:h-[60vh] overflow-hidden"
                                >
                                    <Image
                                        src="https://res.cloudinary.com/devmahdi/image/upload/c_fit,w_800,h_1200,dpr_auto/v1790751878/u4uznhk9ieqquevxfmjy.jpg"
                                        alt="Moniruzzaman Mahdi"
                                        fill
                                        sizes="(max-width: 1024px) 70vw, 20vw"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <TextReveal delay={0.8} once staggerDuration={0.01}>
                                    <h4 className="tracking-tighter leading-[1.1] text-white text-[1.1rem] lg:text-[1.25rem] splineRegular uppercase">
                                        Hello! <br /> I&apos;m Moniruzzaman Mahdi
                                    </h4>
                                </TextReveal>
                            </figure>

                            <div className="w-full lg:w-[60%] h-fit lg:h-[16vh] mt-10 lg:mt-16 lg:ml-[26vw]">
                                <h2 className="h-fit lg:h-[20%] w-full flex flex-col items-center lg:items-start justify-between">
                                    <p className="text-white/50 h-fit w-fit lg:w-[12vw] text-[1.15rem] splineRegular uppercase flex flex-row items-center justify-between gap-2">
                                        My Experience
                                        <ArrowRight className="text-white/50 transform rotate-45" size={23} strokeWidth={1.5} />
                                    </p>
                                </h2>

                                <div className="h-auto lg:h-[80%]">
                                    <TextReveal delay={0.8} repeat staggerDuration={0.01}>
                                        <p className="text-white text-center lg:text-left mt-4 uppercase tracking-tighter leading-none! text-[1.25rem] lg:text-[1.5rem] splineRegular w-full ">
                                            specializing in high-concurrency distributed systems. I design resilient, backend-heavy
                                            architectures that solve complex data challenges at global scale.
                                        </p>
                                    </TextReveal>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* PART 2 & 3: SCROLL SECTION (Organized Text & Streaming Images) */}
            {/* ============================================================ */}
            <section className="h-auto w-full flex flex-col items-start justify-start px-6 lg:px-12 pb-24">
                <hr className="w-full h-[0.5px] bg-white/20 mt-16 lg:mt-24 border-rounded" />

                {/* ---------------------------------------------------- */}
                {/* Block 1: Profession & Philosophy (Two-Column Layout) */}
                {/* ---------------------------------------------------- */}
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 mt-12 lg:mt-20">
                    {/* Left: Statement Headline */}
                    <div className="w-full lg:w-[46%]">
                        <TextReveal delay={0.1} scrub staggerDuration={0.01}>
                            <h2 className="text-white/85 text-[2.2rem] sm:text-[2.8rem] lg:text-[3.8rem] uppercase leading-[1.08] splineRegular tracking-tight">
                                I Don&apos;t Just Build <br /> Products — I Solve for Systems, at Scale.
                            </h2>
                        </TextReveal>
                    </div>

                    {/* Right: Clean Organized Text Column (Matching media_1790769626323.png) */}
                    <div className="w-full lg:w-[48%] flex flex-col items-start lg:items-end text-left lg:text-right gap-6 lg:gap-8">
                        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
                            <p className="text-white/95 text-[1.05rem] lg:text-[1.25rem] splineRegular uppercase tracking-tight leading-[1.35] max-w-xl">
                                My craft is part of my lifestyle. As a systems architect, I am constantly deconstructing the world: I notice how components interact, how logic flows, and how structures scale.
                            </p>
                        </TextReveal>

                        <div className="flex items-center gap-1.5 text-white/50 text-[1.1rem] lg:text-[1.25rem] splineRegular uppercase mt-4">
                            <span>My Philosophy</span>
                            <ArrowDownRight size={22} strokeWidth={1.5} className="text-white/50" />
                        </div>

                        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
                            <p className="text-white/95 text-[1.05rem] lg:text-[1.25rem] splineRegular uppercase tracking-tight leading-[1.35] max-w-xl">
                                I value logic, scalability, and performance both in systems and in life. I am close to the idea of structural minimalism: building only what is resilient and serves a purpose. I love elegant architectures with deep foundations as well as simple solutions that solve complex problems.
                            </p>
                        </TextReveal>
                    </div>
                </div>

                {/* ---------------------------------------------------- */}
                {/* Block 2: Lifestyle & Photos (Matching media_1790769626371.png) */}
                {/* ---------------------------------------------------- */}
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 mt-20 lg:mt-32">
                    {/* Left: Photos with scroll-driven streaming reveal */}
                    <div className="w-full lg:w-[46%] flex flex-col items-start gap-6">
                        <div className="relative w-full sm:w-[85%] lg:w-[32vw] aspect-3/4 overflow-hidden bg-neutral-950">
                            {/* Stream reveals from top to bottom with scroll, reverses on scroll up */}
                            <ImageReveal
                                src="https://res.cloudinary.com/devmahdi/image/upload/f_auto,q_auto:good,c_fit,w_800,h_1200,dpr_auto/v1790751879/rlphc28farhhhxd1nh57.png"
                                alt="Moniruzzaman Mahdi"
                                className="w-full h-full"
                                scrub={true}
                                offset={["start 92%", "center 48%"]}
                            />
                        </div>

                        <Link
                            href="/#connect"
                            className="group inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-[1.05rem] lg:text-[1.2rem] splineRegular uppercase border-b border-white/40 hover:border-white pb-0.5 mt-2"
                        >
                            <span>Let&apos;s Connect</span>
                            <ArrowRight className="transform -rotate-45 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" size={20} strokeWidth={1.5} />
                        </Link>
                    </div>

                    {/* Right: Clean Organized Text Column (Matching media_1790769626371.png) */}
                    <div className="w-full lg:w-[48%] flex flex-col items-start lg:items-end text-left lg:text-right gap-6 lg:gap-8 lg:mt-4">
                        <div className="flex items-center gap-1.5 text-white/50 text-[1.1rem] lg:text-[1.25rem] splineRegular uppercase">
                            <span>My LifeStyle</span>
                            <ArrowDownRight size={22} strokeWidth={1.5} className="text-white/50" />
                        </div>

                        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
                            <p className="text-white/95 text-[1.05rem] lg:text-[1.25rem] splineRegular uppercase tracking-tight leading-[1.35] max-w-xl">
                                I look for harmony everywhere: in the logic of systems, in the blueprints of architecture, in the flow of data, and even in the simple rhythms of everyday life. It&apos;s not just a skill—it&apos;s a way of perceiving the world.
                            </p>
                        </TextReveal>

                        <TextReveal delay={0.2} scrub staggerDuration={0.01}>
                            <p className="text-white/95 text-[1.05rem] lg:text-[1.25rem] splineRegular uppercase tracking-tight leading-[1.35] max-w-xl">
                                Every system for me is more than a task. It&apos;s a narrative that I help build through code. I believe that a great product is not just about pixels and scripts, but about the seamless experience it creates.
                            </p>
                        </TextReveal>
                    </div>
                </div>
            </section>
        </main>
    );
}

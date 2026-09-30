"use client";

import ImageReveal from "@/animations/ImageReveal";
import LineReveal from "@/animations/LineReveal";
import { TextReveal } from "@/animations/TextReveal";
import FallingText from "@/components/FallingText";
import { useDevice } from "@/hooks/useDevice";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowDownRight, ArrowRight, ArrowUpRight } from "lucide-react";

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

            // 3. Stream the portrait image clip-path from top to bottom with scroll
            if (pinnedImageRef.current) {
                tl.fromTo(
                    pinnedImageRef.current,
                    { clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" },
                    {
                        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
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
            <section
                ref={containerRef}
                className="relative w-full max-h-screen h-screen overflow-hidden border-t border-white/10 bg-black"
            >
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
                                <div
                                    ref={pinnedImageRef}
                                    style={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", willChange: "clip-path" }}
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
            {/* PART 2: PROFESSION & PHILOSOPHY (Section 1 of scroll content) */}
            {/* ============================================================ */}
            <section className="h-auto w-full flex flex-col items-start justify-start px-6 lg:px-12">
                <hr className="w-full h-[0.5px] border-none bg-[#aaa8a8]/25 mt-16 lg:mt-24" />

                <div className="w-full flex flex-col items-start justify-start mt-12 lg:mt-20">
                    {/* Big Statement Headline on top-left */}
                    <div className="w-full max-w-4xl">
                        <LineReveal
                            lines={[
                                "I DON'T JUST BUILD",
                                "PRODUCTS — I SOLVE",
                                "FOR SYSTEMS, AT SCALE.",
                            ]}
                            lineClassName="text-white text-[2rem] sm:text-[3rem] lg:text-[4.2rem] leading-[0.98] splineLight uppercase tracking-tight"
                            triggerStart="top 85%"
                            triggerEnd="bottom 45%"
                            stagger={0.14}
                        />
                    </div>

                    {/* Middle paragraph staggered to the center/right - matching Olha Lazarieva text-first */}
                    <div className="w-full flex justify-start lg:justify-center mt-12 lg:mt-20 lg:pl-[14vw]">
                        <div className="max-w-[440px] text-center">
                            <LineReveal
                                lines={[
                                    "MY CRAFT IS PART OF MY LIFESTYLE. AS",
                                    "A SYSTEMS ARCHITECT, I AM CONSTANTLY",
                                    "DECONSTRUCTING THE WORLD: I NOTICE HOW",
                                    "COMPONENTS INTERACT, HOW LOGIC FLOWS,",
                                    "AND HOW STRUCTURES SCALE.",
                                ]}
                                lineClassName="text-white/90 text-[1.05rem] lg:text-[1.25rem] splineLight uppercase tracking-tight leading-[1.35]"
                                triggerStart="top 85%"
                                triggerEnd="bottom 50%"
                                stagger={0.1}
                            />
                        </div>
                    </div>

                    {/* Philosophy block in lower-right - matching Olha Lazarieva text-second */}
                    <div className="w-full flex justify-end mt-16 lg:mt-24 lg:pr-[4vw]">
                        <div className="max-w-[480px] flex flex-col items-center text-center">
                            <div className="flex items-center justify-center gap-2 text-white/50 text-[1.1rem] lg:text-[1.25rem] splineLight uppercase mb-8">
                                <span>My Philosophy</span>
                                <ArrowDownRight size={20} strokeWidth={1.5} className="text-white/50" />
                            </div>

                            <LineReveal
                                lines={[
                                    "I VALUE LOGIC, SCALABILITY, AND",
                                    "PERFORMANCE — BOTH IN SYSTEMS AND IN",
                                    "LIFE. I AM CLOSE TO THE IDEA OF",
                                    "STRUCTURAL MINIMALISM: BUILDING ONLY WHAT",
                                    "MAKES SENSE AND WORKS FOR RESULTS.",
                                    "I LOVE ELEGANT ARCHITECTURES WITH DEEP",
                                    "FOUNDATIONS — AS WELL AS SIMPLE THINGS THAT",
                                    "SOLVE COMPLEX PROBLEMS.",
                                ]}
                                lineClassName="text-white/90 text-[1.05rem] lg:text-[1.25rem] splineLight uppercase tracking-tight leading-[1.35]"
                                triggerStart="top 85%"
                                triggerEnd="bottom 50%"
                                stagger={0.09}
                            />
                        </div>
                    </div>
                </div>

                {/* ============================================================ */}
                {/* PART 3: LIFESTYLE & PHOTO (Section 2 of scroll content)      */}
                {/* ============================================================ */}
                <div className="w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 mt-32 lg:mt-48 pb-32">
                    {/* Left: Single Photo with scroll-driven streaming reveal */}
                    <div className="w-full lg:w-[38%] flex flex-col items-start lg:pl-[2vw]">
                        <div className="relative w-full sm:w-[85%] lg:w-[26vw] aspect-[3/4] overflow-hidden">
                            <ImageReveal
                                src="https://res.cloudinary.com/devmahdi/image/upload/f_auto,q_auto:good,c_fit,w_800,h_1200,dpr_auto/v1790751879/rlphc28farhhhxd1nh57.png"
                                alt="Moniruzzaman Mahdi"
                                className="w-full h-full"
                                imageClassName="object-cover object-center"
                                scrub={true}
                                triggerStart="top 85%"
                                triggerEnd="bottom 45%"
                            />
                        </div>

                        {/* Link styled matching Olha Lazarieva: text-four a */}
                        <div className="mt-8 lg:mt-12">
                            <Link
                                href="/#connect"
                                className="group inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors text-[1.15rem] lg:text-[1.35rem] splineLight uppercase border-b border-white pb-1"
                            >
                                <span>Let&apos;s Connect</span>
                                <ArrowUpRight
                                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-white"
                                    size={22}
                                    strokeWidth={1.5}
                                />
                            </Link>
                        </div>
                    </div>

                    {/* Right: Lifestyle Text Column - matching Olha Lazarieva text-third and text-four */}
                    <div className="w-full lg:w-[50%] flex flex-col items-center text-center lg:pr-[4vw] mt-12 lg:mt-0">
                        {/* Lifestyle Header */}
                        <div className="flex items-center justify-center gap-2 text-white/50 text-[1.1rem] lg:text-[1.25rem] splineLight uppercase mb-8">
                            <span>My LifeStyle</span>
                            <ArrowDownRight size={20} strokeWidth={1.5} className="text-white/50" />
                        </div>

                        {/* Paragraph 1 */}
                        <div className="max-w-[460px] text-center">
                            <LineReveal
                                lines={[
                                    "I LOOK FOR HARMONY EVERYWHERE:",
                                    "IN THE LOGIC OF SYSTEMS, IN THE",
                                    "BLUEPRINTS OF ARCHITECTURE, IN THE",
                                    "FLOW OF DATA, AND EVEN IN THE",
                                    "SIMPLE RHYTHMS OF EVERYDAY LIFE.",
                                    "IT'S NOT JUST A SKILL —",
                                    "IT'S A WAY OF PERCEIVING THE WORLD.",
                                ]}
                                lineClassName="text-white/90 text-[1.05rem] lg:text-[1.25rem] splineLight uppercase tracking-tight leading-[1.35]"
                                triggerStart="top 85%"
                                triggerEnd="bottom 50%"
                                stagger={0.09}
                            />
                        </div>

                        {/* Paragraph 2 with vertical spacing matching Olha Lazarieva */}
                        <div className="max-w-[460px] text-center mt-16 lg:mt-24">
                            <LineReveal
                                lines={[
                                    "EVERY SYSTEM FOR ME IS MORE THAN",
                                    "A TASK. IT'S A NARRATIVE THAT",
                                    "I HELP BUILD THROUGH CODE.",
                                    "I BELIEVE THAT A GREAT PRODUCT",
                                    "IS NOT JUST ABOUT PIXELS AND",
                                    "SCRIPTS, BUT ABOUT THE SEAMLESS",
                                    "EXPERIENCE IT CREATES.",
                                ]}
                                lineClassName="text-white/90 text-[1.05rem] lg:text-[1.25rem] splineLight uppercase tracking-tight leading-[1.35]"
                                triggerStart="top 85%"
                                triggerEnd="bottom 50%"
                                stagger={0.09}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

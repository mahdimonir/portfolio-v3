"use client";

import TextRipple from "@/animations/TextRipple";
import { Underline } from "@/components/Underline";
import { useDevice } from "@/hooks/useDevice";
import { motion, Transition } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomLink, CustomLinkArrow, CustomLinkBracket } from "./CustomLink";

export default function Footer() {
    const [time, setTime] = useState("");
    const { isMobile, isDesktop } = useDevice();

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatter = new Intl.DateTimeFormat("en-US", {
                timeZone: "Asia/Dhaka",
                hour: "numeric",
                minute: "2-digit",
                hour12: false,
            });
            setTime(formatter.format(now));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const swapTransition: Transition = {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
    };

    return (
        <footer className="w-full min-h-screen lg:h-screen bg-(--bg-color) flex flex-col justify-between px-6 lg:px-12 pt-24 pb-4 lg:pt-32 lg:pb-6 overflow-hidden text-[#101010]">
            {/* 1. Top Section: Left Nav Links + Right Contact Info */}
            <section className="w-full flex flex-col lg:flex-row items-center lg:items-end justify-between gap-6 lg:gap-0">
                {/* Desktop Left: Navigation (Bottom-aligned with contact column) */}
                <div className="hidden lg:flex flex-col items-start gap-2.5 pb-1">
                    <CustomLink
                        name="About Me"
                        url="/#about"
                        className="text-[1.125rem] splineRegular w-fit! justify-start! text-[#101010] hover:opacity-75 transition-opacity"
                    />
                    <CustomLink
                        name="Services"
                        url="/#services"
                        className="text-[1.125rem] splineRegular w-fit! justify-start! text-[#101010] hover:opacity-75 transition-opacity"
                    />
                    <CustomLink
                        name="Works"
                        url="/works"
                        className="text-[1.125rem] splineRegular w-fit! justify-start! text-[#101010] hover:opacity-75 transition-opacity"
                    />
                </div>

                {/* Right: Contact Info & Socials */}
                <div className="w-full lg:w-auto flex flex-col items-center lg:items-end gap-1.5 lg:gap-1 text-[#101010]">
                    {/* Phone */}
                    <Link
                        href="tel:+8801876689921"
                        className="text-[7.5vw] md:text-3xl lg:text-[3.25rem] sofiaBold leading-[0.92] uppercase text-center lg:text-right text-[#101010] hover:opacity-80 transition-opacity"
                    >
                        <Underline lineClassName="bg-black mt-1" className="inline-block">
                            +880 &nbsp; 1876 &nbsp; 689921
                        </Underline>
                    </Link>

                    {/* Email */}
                    <Link
                        href="mailto:mahdimoniruzzaman@gmail.com"
                        className="text-[5.5vw] md:text-2xl lg:text-[2.75rem] sofiaBold leading-[0.92] text-center lg:text-right break-all lg:break-normal text-[#101010] hover:opacity-80 transition-opacity"
                    >
                        <Underline lineClassName="bg-black mt-1" className="inline-block">
                            mahdimoniruzzaman@gmail.com
                        </Underline>
                    </Link>

                    {/* Socials */}
                    <div className="flex flex-row items-center justify-center lg:justify-end gap-6 md:gap-8 mt-2.5 lg:mt-3 text-[#101010]">
                        <CustomLinkArrow
                            arrFrom="top right"
                            arrTo="center center"
                            className="w-fit! text-[1rem] lg:text-[1.15rem]! text-[#101010]"
                            name="LinkedIn"
                            url="https://www.linkedin.com/in/moniruzzaman-mahdi/"
                        />
                        <CustomLinkArrow
                            arrFrom="top right"
                            arrTo="center center"
                            className="w-fit! text-[1rem] lg:text-[1.15rem]! text-[#101010]"
                            name="GitHub"
                            url="https://github.com/mahdimonir"
                        />
                        <CustomLinkArrow
                            arrFrom="top right"
                            arrTo="center center"
                            className="w-fit! text-[1rem] lg:text-[1.15rem]! text-[#101010]"
                            name="Twitter"
                            url="https://x.com/Mahdimonir2004"
                        />
                    </div>

                    {/* Desktop Address */}
                    <div className="hidden lg:block text-right mt-2">
                        <p className="splineRegular text-[0.8rem] leading-tight" style={{ color: "rgb(96,96,96)" }}>
                            Address: <br />
                            Chattogram, Bangladesh.
                        </p>
                    </div>
                </div>
            </section>

            {/* 2. Competitive Coding Bracket Row */}
            <section className="w-full flex flex-row items-center justify-between mt-6 lg:mt-8">
                <CustomLinkBracket
                    className="w-auto! text-[1.05rem] lg:text-[1.15rem]! text-[#101010]"
                    name="LeetCode"
                    url="https://www.leetcode.com/"
                />
                <CustomLinkBracket
                    className="w-auto! text-[1.05rem] lg:text-[1.15rem]! text-[#101010]"
                    name="CodeChef"
                    url="https://www.codechef.com/"
                />
                <CustomLinkBracket
                    className="w-auto! text-[1.05rem] lg:text-[1.15rem]! text-[#101010]"
                    name="CodeForces"
                    url="https://codeforces.com/"
                />
            </section>

            {/* 3. Giant Branding Name */}
            <section className="w-full flex items-center justify-center overflow-hidden my-auto py-2">
                {isMobile ? (
                    <h1
                        className="text-[22vw] leading-[0.80] py-1 sofiaBold tracking-[-0.07em] uppercase whitespace-nowrap text-center"
                        style={{ color: "rgb(16,16,16)" }}
                    >
                        <TextRipple reverse text="Mahdi" delayOffset={0.7} blur={false} duration={1} scrub={true} />
                    </h1>
                ) : (
                    <h1
                        className="text-[16.5vw] leading-[0.78] px-2 py-0 sofiaBold tracking-[-0.06em] uppercase whitespace-nowrap text-center select-none"
                        style={{ color: "rgb(16,16,16)" }}
                    >
                        <TextRipple reverse text="Moniruzzaman" delayOffset={1} blur={false} duration={1} scrub={true} />
                    </h1>
                )}
            </section>

            {/* 4. Footer Bottom Bar */}
            <section className="w-full pt-3 pb-1 flex flex-col lg:flex-row items-center justify-between gap-2 lg:gap-0 border-t border-black/5">
                <p
                    className="w-full lg:w-1/3 flex items-center justify-between lg:justify-start uppercase splineRegular text-[0.8rem] lg:text-[0.875rem] tracking-tight"
                    style={{ color: "rgb(16,16,16)" }}
                >
                    {isDesktop ? (
                        <span>Chattogram, Bangladesh : (GMT+6) {time || "00:00"}</span>
                    ) : (
                        <>
                            <span>Chattogram, BD</span>
                            <span>(GMT+6) {time || "00:00"}</span>
                        </>
                    )}
                </p>

                <motion.p
                    initial="initial"
                    whileHover="hover"
                    className="w-full lg:w-1/3 flex items-center justify-center uppercase splineRegular text-[0.8rem] lg:text-[0.875rem] tracking-tight cursor-default"
                    style={{ color: "rgb(16,16,16)" }}
                >
                    <span className="whitespace-pre">Ref - </span>
                    <Link href="https://olhalazarieva.com" target="_blank" rel="noopener noreferrer">
                        <span className="relative inline-grid overflow-hidden h-[1.2em]">
                            <motion.span
                                style={{ gridArea: "1 / 1" }}
                                variants={{ initial: { y: 0 }, hover: { y: "-100%" } }}
                                transition={swapTransition}
                            >
                                OL
                            </motion.span>
                            <motion.span
                                style={{ gridArea: "1 / 1" }}
                                className="whitespace-nowrap"
                                variants={{ initial: { y: "100%" }, hover: { y: 0 } }}
                                transition={swapTransition}
                            >
                                Olha Lazarieva
                            </motion.span>
                        </span>
                    </Link>
                </motion.p>

                <p
                    className="w-full lg:w-1/3 splineRegular text-[0.65rem] lg:text-[0.75rem] leading-[1.25] text-center lg:text-right"
                    style={{ color: "rgb(96,96,96)" }}
                >
                    2026 All Right Reserved. Moniruzzaman Mahdi
                </p>
            </section>
        </footer>
    );
}

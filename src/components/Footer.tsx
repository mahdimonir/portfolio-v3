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
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
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
    <main className="w-full min-h-screen lg:h-screen bg-(--bg-color) flex flex-col items-center justify-start px-6 lg:px-10 text-white!">
      {/* 1. Contact Section: Large Header (Desktop only indent logic) */}

      {isDesktop && (
        <section className="w-full mt-12 lg:mt-19 h-auto lg:h-24.5 flex flex-col items-center lg:items-end justify-between gap-1 lg:gap-0">
          <Link
            href="tel:+8801876689921"
            className="transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-black text-[8vw] md:text-3xl lg:text-5xl lg:indent-19 sofiaBold leading-[0.90] uppercase text-center lg:text-right"
          >
            <Underline
              lineClassName="bg-black mt-1 lg:mt-8"
              className="inline-block"
            >
              {isDesktop
                ? "+880 \u00A0 1876 \u00A0 689921"
                : "+880 1876 689921"}
            </Underline>
          </Link>
          <Link
            href="mailto:mahdimoniruzzaman@gmail.com"
            className="transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-black text-[5.5vw] md:text-2xl lg:text-5xl lg:indent-28 sofiaBold leading-[0.90] text-center lg:text-right break-all lg:break-normal"
          >
            <Underline
              lineClassName="bg-black mt-1 lg:mt-10"
              className="inline-block"
            >
              mahdimoniruzzaman@gmail.com
            </Underline>
          </Link>
        </section>
      )}
      {isMobile && (
        <section className="w-full mt-16 lg:mt-19 h-auto lg:h-24.5 flex flex-col items-center lg:items-end justify-between gap-1 lg:gap-0"></section>
      )}

      {/* 2. Socials Row */}
      <section className="w-full mt-10 lg:mt-3 h-auto lg:h-12 flex flex-wrap lg:flex-row items-center justify-center lg:justify-end gap-6 md:gap-10 lg:gap-20">
        <CustomLinkArrow
          arrFrom="top right"
          arrTo="center center"
          className="mix-blend-difference! w-28 lg:w-32! text-[1.1rem] lg:text-[1.4rem]!"
          name="LinkedIN"
          url="https://www.linkedin.com/in/moniruzzaman-mahdi/"
        />
        <CustomLinkArrow
          arrFrom="top right"
          arrTo="center center"
          className="mix-blend-difference! w-24 lg:w-25! text-[1.1rem] lg:text-[1.4rem]!"
          name="GITHUB"
          url="https://github.com/mahdimonir"
        />
        <CustomLinkArrow
          arrFrom="top right"
          arrTo="center center"
          className="mix-blend-difference! w-26 lg:w-30! text-[1.1rem] lg:text-[1.4rem]!"
          name="Twitter"
          url="https://x.com/Mahdimonir2004"
        />
      </section>

      {/* 3. Links & Address: Mobile Swap logic here */}
      <section className="w-full lg:mt-0 h-25 lg:h-28 flex flex-col lg:flex-row items-center justify-center lg:items-start lg:justify-between lg:gap-0">
        <div className="w-full lg:w-1/2 flex flex-col items-start justify-between  lg:gap-0 border-y border-black/5 lg:border-none lg:py-0">
          {isMobile ? (
            /* Mobile: Show Phone and Email instead of Links */
            <section className="w-full mt-12 lg:mt-19 h-auto lg:h-24.5 flex flex-col items-center lg:items-end justify-between gap-1 lg:gap-0">
              <Link
                href="tel:+8801876689921"
                className="transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-black text-[8vw] md:text-3xl lg:text-5xl lg:indent-19 sofiaBold leading-[0.90] uppercase text-center lg:text-right"
              >
                <Underline
                  lineClassName="bg-black mt-1 lg:mt-8"
                  className="inline-block"
                >
                  {isDesktop
                    ? "+880 \u00A0 1876 \u00A0 689921"
                    : "+880 1876 689921"}
                </Underline>
              </Link>
              <Link
                href="mailto:mahdimoniruzzaman@gmail.com"
                className="transition-all duration-300 ease-[cubic-bezier(0.11,0.82,0.39,0.92)] text-black text-[5.5vw] md:text-2xl lg:text-5xl lg:indent-28 sofiaBold leading-[0.90] text-center lg:text-right break-all lg:break-normal"
              >
                <Underline
                  lineClassName="bg-black mt-1 lg:mt-10"
                  className="inline-block"
                >
                  mahdimoniruzzaman@gmail.com
                </Underline>
              </Link>
            </section>
          ) : (
            /* Desktop: Keep original Links */
            <>
              <CustomLink
                name="About"
                url="/about"
                className="text-[1.35rem] splineRegular w-fit!"
              />
              <CustomLink
                name="Works"
                url="/works"
                className="text-[1.35rem] splineRegular w-fit!"
              />
              <CustomLink
                name="Services"
                url="/services"
                className="text-[1.35rem] splineRegular w-fit!"
              />
            </>
          )}
        </div>

        {isDesktop && (
          <div className="w-full lg:w-1/2 h-full flex flex-col items-end justify-end text-right">
            <p className="splineLight text-[0.7rem] text-black! leading-[1.1]">
              Address: <br />
              Chattogram, <br />
              Bangladesh.
            </p>
          </div>
        )}
      </section>

      {/* 4. Competitive Coding */}
      <section className="w-full mt-10 lg:mt-6 h-auto lg:h-12 flex flex-row items-center justify-between gap-4 lg:gap-0 overflow-x-auto no-scrollbar">
        <CustomLinkBracket
          className="mix-blend-difference! shrink-0 w-28 lg:w-32! text-[1.1rem] lg:text-[1.2rem]!"
          name="LeetCode"
          url="https://www.leetcode.com/"
        />
        <CustomLinkBracket
          className="mix-blend-difference! shrink-0 w-24 lg:w-25! text-[1.1rem] lg:text-[1.2rem]!"
          name="CodeChef"
          url="https://www.codechef.com/"
        />
        <CustomLinkBracket
          className="mix-blend-difference! shrink-0 w-28 lg:w-30! text-[1.1rem] lg:text-[1.2rem]!"
          name="CodeForces"
          url="https://codeforces.com/"
        />
      </section>

      {/* 5. Giant Branding */}
      <section className="w-full h-auto min-h-40 lg:h-61.5 mt-12 lg:mt-5 flex items-center justify-center overflow-hidden">
        {isMobile ? (
          <h1 className="text-[22vw] text-black! leading-[0.8] py-2 sofiaBold tracking-[-0.07em] uppercase flex flex-col items-center">
            <TextRipple
              reverse
              text="Moniruzzaman"
              className="block"
              delayOffset={0.5}
              blur={false}
              duration={1}
              scrub={true}
            />
            <TextRipple
              reverse
              text="Mahdi"
              className="block"
              delayOffset={0.7}
              blur={false}
              duration={1}
              scrub={true}
            />
          </h1>
        ) : (
          <h1 className="text-[15vw] text-black! leading-[0.90] px-4 py-2 sofiaBold tracking-[-0.07em] uppercase whitespace-nowrap">
            <TextRipple
              reverse
              text="Moniruzzaman Mahdi"
              delayOffset={1}
              blur={false}
              duration={1}
              scrub={true}
            />
          </h1>
        )}
      </section>

      {/* 6. Footer Bottom Bar */}
      <section className="w-full h-auto lg:h-13 py-10 lg:py-0 flex flex-col lg:flex-row items-center text-black! justify-between gap-8 lg:gap-0 mt-auto border-t border-black/5 lg:border-none">
        <p className="w-full lg:w-1/2 flex items-center justify-between lg:justify-start uppercase splineLight text-xs lg:text-md tracking-tighter">
          {isDesktop ? (
            <span>
              New Delhi, India &nbsp;|&nbsp; IST &nbsp;|&nbsp;{" "}
              {time || "00:00 AM"}
            </span>
          ) : (
            <>
              <span>Nashik, IN</span>
              <span>{time || "00:00 AM"} IST</span>
            </>
          )}
        </p>

        <motion.p
          initial="initial"
          whileHover="hover"
          className="flex items-center justify-center lg:justify-start uppercase splineRegular text-sm tracking-tight cursor-default"
        >
          <span className="whitespace-pre">Ref - </span>
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
        </motion.p>

        <p className="splineLight text-gray-400 text-[0.65rem] leading-tight text-center lg:text-right">
          © 2026 All right reserved. Moniruzzaman Mahdi{" "}
          <br className="hidden lg:block" />
          Unauthorized reproduction is prohibited.
        </p>
      </section>
    </main>
  );
}

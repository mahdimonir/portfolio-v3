"use client";

import { useState, useRef } from "react";
import ConnectTitle from "@/components/ConnectTitle";
import { ArrowRight, Check } from "lucide-react";
import { sendEmail } from "@/utils/sendEmail";
import Footer from "@/components/Footer";

/**
 * ConnectSection — reusable contact form section.
 * Used on the home page as the #connect anchor section.
 */
export default function ConnectSection() {
    const formRef = useRef<HTMLFormElement>(null);
    const [selectedBudget, setSelectedBudget] = useState("500 - 1k");
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (status !== "idle") return;

        setStatus("sending");
        const formData = new FormData(e.currentTarget);

        const result = await sendEmail(formData);

        if (result.success) {
            setStatus("success");
            formRef.current?.reset();
            setTimeout(() => setStatus("idle"), 5000);
        } else {
            setStatus("idle");
            alert("Submission failed. Please check your connection.");
        }
    };

    return (
        <div className="w-full h-auto bg-(--bg-color) flex flex-col items-center overflow-hidden">
            <ConnectTitle />

            <section className="mt-14 lg:mt-20 w-[90%] md:w-[60%] lg:w-[40%] flex items-center justify-center pb-12 lg:pb-16 relative">
                {/* SUCCESS OVERLAY */}
                {status === "success" && (
                    <div className="absolute inset-0 z-50 bg-(--bg-color) flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center mb-6">
                            <Check className="text-white" size={40} />
                        </div>
                        <h2 className="text-4xl uppercase splineRegular tracking-tighter">Received.</h2>
                        <p className="mt-4 splineLight uppercase text-sm tracking-widest">I&apos;ll get back to you shortly.</p>
                        <button onClick={() => setStatus("idle")} className="mt-10 text-xs border-b border-black uppercase splineLight">
                            Send another message
                        </button>
                    </div>
                )}

                {/* FORM */}
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className={`w-full flex flex-col items-center justify-start py-4 px-2 transition-opacity duration-500 ${status !== "idle" ? "opacity-30 pointer-events-none" : "opacity-100"}`}
                >
                    <input
                        className="splineRegular text-[1rem] focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-[0.875rem] placeholder:splineLight placeholder:uppercase w-full h-10 py-4 bg-transparent border-b border-black"
                        type="text"
                        name="name"
                        placeholder="Your name*"
                        required
                    />
                    <input
                        className="splineRegular mt-10 text-[1rem] focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-[0.875rem] placeholder:splineLight placeholder:uppercase w-full h-10 py-4 bg-transparent border-b border-black"
                        type="tel"
                        name="phone"
                        placeholder="Phone*"
                        required
                    />
                    <input
                        className="splineRegular mt-10 text-[1rem] focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-[0.875rem] placeholder:splineLight placeholder:uppercase w-full h-10 py-4 bg-transparent border-b border-black"
                        type="email"
                        name="email"
                        placeholder="Your Email*"
                        required
                    />
                    <textarea
                        name="textarea"
                        rows={4}
                        placeholder="How can i help you"
                        className="splineRegular mt-10 text-[1rem] focus:outline-none tracking-tight placeholder:text-black/60 placeholder:text-[0.875rem] placeholder:splineLight placeholder:uppercase w-full resize-none bg-transparent border-b border-black"
                    ></textarea>

                    <p className="text-sm mt-10 w-full text-black splineLight tracking-tighter uppercase">Project Budget (USD)</p>
                    <div className="w-full mt-6 flex flex-row flex-wrap gap-8">
                        {["500 - 1k", "5k - 10k", "MORE"].map((option) => (
                            <label
                                key={option}
                                className={`splineRegular text-lg uppercase tracking-tight cursor-pointer pb-2 transition-all ${selectedBudget === option ? "sofiaBold border-b-2 border-black" : "opacity-40"}`}
                            >
                                <span>{option}</span>
                                <input
                                    type="radio"
                                    name="budget"
                                    value={option}
                                    checked={selectedBudget === option}
                                    onChange={() => setSelectedBudget(option)}
                                    className="hidden"
                                />
                            </label>
                        ))}
                    </div>

                    <button
                        type="submit"
                        disabled={status === "sending"}
                        style={{ "--from-rotate": "0deg", "--to-rotate": "-45deg" } as React.CSSProperties}
                        className="group relative w-full lg:w-[60%] h-12 mt-20 flex items-center justify-between uppercase splineRegular tracking-tighter text-[1.1rem] transition-all duration-300 text-black"
                    >
                        <span className="flex items-center justify-between w-full gap-2 z-10">
                            {status === "sending" ? "Processing..." : "Discuss the project"}
                            <ArrowRight size={24} strokeWidth={1} className="transition-transform duration-500 origin-center" />
                        </span>
                        <span className="absolute bottom-0 left-0 h-px w-full overflow-hidden">
                            <span className="absolute inset-0 bg-black transition-transform duration-500 group-hover:translate-x-[110%]" />
                            <span
                                className="absolute inset-0 bg-black translate-x-[-110%] transition-transform group-hover:translate-x-0"
                                style={{ transitionDelay: "0.1s" }}
                            />
                        </span>
                    </button>
                </form>
            </section>

            <style jsx global>{`
                .group:hover svg {
                    transform: rotate(var(--to-rotate)) !important;
                }
            `}</style>

            <Footer />
        </div>
    );
}

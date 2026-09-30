import TextRipple from "@/animations/TextRipple";

export default function RecentWorksTitle() {
    return (
        <header className="w-full bg-black text-white flex items-center justify-center py-16 lg:py-24 overflow-hidden">
            <h1 className="text-[16vw] lg:text-[9.5vw] tracking-[-0.06em] leading-none px-4 py-2 sofiaBold uppercase text-center text-white select-none">
                <TextRipple 
                    text="RECENT &nbsp; WORKS"
                    delayOffset={0.8} 
                    blur={false} 
                    duration={1} 
                    scrub={true}
                />
            </h1>
        </header>
    );
}
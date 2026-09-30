import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import AboutTitle from "@/components/AboutTitle";
import RecentWorksTitle from "@/components/RecentWorksTitle";
import Scene from "@/components/Scene";
import ServicesSection from "@/components/ServicesSection";
import ConnectSection from "@/components/ConnectSection";

export default function Home() {
    return (
        <main
            id="home"
            className={`bg-(--bg-color) sofiaBold min-h-full h-auto overflow-hidden! w-full flex flex-col items-start justify-center `}
        >
            <Hero />
            <section id="about" className="w-full">
                <AboutTitle />
                <AboutSection />
            </section>
            <section id="works-preview" className="w-full bg-black">
                <RecentWorksTitle />
            </section>
            <Scene />
            <section id="services" className="w-full">
                <ServicesSection />
            </section>
            <section id="connect" className="w-full">
                <ConnectSection />
            </section>
        </main>
    );
}

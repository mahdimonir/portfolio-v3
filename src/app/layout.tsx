
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";

import ClientLoaderWrapper from "@/components/ClientLoaderWrapper";
import Navbar from "@/components/Navbar";
import SmoothScroll from "@/utils/SmoothScroll";

// --- FONTS (Keep your existing font config) ---
const sofiaBold = localFont({
    src: "../../public/fonts/SofiaSansCondensed-Bold.woff2",
    variable: "--font-sofia-bold",
});
const sofiaSemiBold = localFont({
    src: "../../public/fonts/SofiaSansCondensed-SemiBold.woff2",
    variable: "--font-sofia-semibold",
});
const splineLight = localFont({
    src: "../../public/fonts/SplineSansMono-Light.woff2",
    variable: "--font-spline-light",
});
const splineRegular = localFont({
    src: "../../public/fonts/SplineSansMono-Regular.woff2",
    variable: "--font-spline-regular",
});

export const viewport: Viewport = {
    themeColor: "#000000",
    width: "device-width",
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL("https://mahdimonir.dev"),
    title: {
        default: "Moniruzzaman Mahdi | Fullstack Developer",
        template: "%s | Moniruzzaman Mahdi",
    },
    description:
        "Portfolio of Moniruzzaman Mahdi, an immersive and creative Fullstack developer specializing in award-level web experiences.",
    keywords: [
        "Moniruzzaman Mahdi",
        "Fullstack Developer",
        "Next.js Portfolio",
        "Three.js",
        "GSAP Animations",
        "Fullstack Developer Bangladesh",
    ],
    authors: [{ name: "Moniruzzaman Mahdi" }],
    creator: "Moniruzzaman Mahdi",
    alternates: {
        canonical: "/",
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/logo-sqr.png",
    },
    openGraph: {
        type: "website",
        url: "https://mahdimonir.dev",
        title: "Moniruzzaman Mahdi | Fullstack Developer",
        description:
            "Portfolio of Moniruzzaman Mahdi, an immersive and creative Fullstack developer specializing in award-level web experiences.",
        siteName: "Moniruzzaman Mahdi Portfolio",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Moniruzzaman Mahdi Portfolio Preview",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Moniruzzaman Mahdi | Fullstack Developer",
        description: "Immersive web experiences and high-performance development.",
        images: ["/og-image.png"],
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Moniruzzaman Mahdi",
        url: "https://mahdimonir.dev",
        jobTitle: "Creative Fullstack Developer",
        description: "Specializing in Next.js, Three.js, and immersive web animations.",
        sameAs: ["https://github.com/mahdimonir", "https://www.linkedin.com/in/moniruzzaman-mahdi/"],
    };

    return (
        <html lang="en">
            <head>
                <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
            </head>
            <body
                className={`${sofiaBold.variable} ${sofiaSemiBold.variable} ${splineLight.variable} ${splineRegular.variable} antialiased bg-black`}
            >
                <ClientLoaderWrapper>
                    <Navbar />
                    <SmoothScroll>{children}</SmoothScroll>
                </ClientLoaderWrapper>

                <noscript>
                    <div className="fixed inset-0 flex items-center justify-center bg-black text-white p-10 text-center z-9999">
                        <p>Please enable JavaScript to experience this immersive portfolio.</p>
                    </div>
                </noscript>
            </body>
        </html>
    );
}

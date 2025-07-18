import Categories from "./(pages)/home/components/categories";
import HomeHeader from "./(pages)/home/components/homeHeader";
import Videos from "./(pages)/home/components/videos";
import { cookies } from "next/headers";

import styles from "./page.module.css";

import { Metadata } from "next";
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const cookieStore = cookies();
    const lang = cookieStore.get("lang")?.value || "arm";
    return {
        title:
            lang == "arm"
                ? "Newsbook.am - Նորությունների և վերլուծության առաջատար հարթակ"
                : "Newsbook.am - Leading news and analysis platform",
        description:
            lang == "arm"
                ? "Newsbook.am-ը նորությունների առաջատար աղբյուր է, որը ներկայացնում է օպերատիվ և խորքային վերլուծություններ քաղաքական, սոցիալական, մշակութային, տնտեսական և միջազգային իրադարձությունների մասին։"
                : "Newsbook.am is a leading news source that presents timely and in-depth analysis of political, social, cultural, economic and international events.",
        keywords:
            "Newsbook, նորություններ, քաղաքականություն, սոցիալական թեմաներ, մշակույթ, տնտեսություն, վերլուծություն, միջազգային նորություններ, Հայաստանի նորություններ, հոդվածներ",
        openGraph: {
            title:
                lang == "arm"
                    ? "Newsbook.am - Նորությունների և վերլուծության առաջատար հարթակ"
                    : "Newsbook.am - Leading news and analysis platform",
            description:
                lang == "arm"
                    ? "Newsbook.am-ը նորությունների առաջատար աղբյուր է, որը ներկայացնում է օպերատիվ և խորքային վերլուծություններ քաղաքական, սոցիալական, մշակութային, տնտեսական և միջազգային իրադարձությունների մասին։"
                    : "Newsbook.am is a leading news source that presents timely and in-depth analysis of political, social, cultural, economic and international events.",
            url: "https://newsbook.am",
            siteName: "Newsbook.am",
            images: [
                {
                    url: "https://newsbook.am/images/logo.png", // Replace with actual logo path
                    width: 800,
                    height: 600,
                    alt: "Newsbook.am Լոգո",
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title:
                lang == "arm"
                    ? "Newsbook.am - Նորությունների և վերլուծության առաջատար հարթակ"
                    : "Newsbook.am - Leading news and analysis platform",
            description:
                lang == "arm"
                    ? "Newsbook.am-ը նորությունների առաջատար աղբյուր է, որը ներկայացնում է օպերատիվ և խորքային վերլուծություններ քաղաքական, սոցիալական, մշակութային, տնտեսական և միջազգային իրադարձությունների մասին։"
                    : "Newsbook.am is a leading news source that presents timely and in-depth analysis of political, social, cultural, economic and international events.",
            site: "@newsbookam", // Replace with actual Twitter handle
            creator: "@newsbookam",
            images: [
                {
                    url: "https://newsbook.am/images/logo.png", // Replace with actual logo path
                    alt: "Newsbook.am Լոգո",
                },
            ],
        },
    };
}
export default function Home() {
    return (
        <main className={styles.main}>
            <HomeHeader />
            <Videos />
            <Categories />
        </main>
    );
}

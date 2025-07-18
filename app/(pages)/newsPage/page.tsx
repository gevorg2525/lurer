import classes from "./page.module.scss";
import { FC, Suspense } from "react";
import MainNews from "./components/mainNews";
import { Metadata } from "next";
import CategoryNews from "./components/categoryNews";
import { cookies } from "next/headers";

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
const NewsPage: FC = () => {
    return (
        <div className={classes["container"]}>
            <Suspense fallback={<div>Loading...</div>}>
                <MainNews />
                <CategoryNews />
            </Suspense>
        </div>
    );
};
export default NewsPage;

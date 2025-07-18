import { Metadata } from "next";
import { NextResponse } from "next/server";

import classes from "./page.module.scss";
import { cookies } from "next/headers";
import MainNews from "./components/mainNews";
import CategoryNews from "./components/categoryNews";
import { stripHtmlTags } from "@/app/components/stripHtmlTags";
type Lang = "arm" | "eng" | "de";
const fetchNewsData = async (id: string) => {
    // const cookieStore = cookies();
    // const lang = cookieStore.get("lang");
    const response = await fetch(`https://newsbook.am/api/news/${id}`);
    const data = await response.json();
    return data;
};

// Server-Side metadata generation
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const cookieStore = cookies();
    const lang: any = cookieStore.get("lang")?.value || "arm";
    const newsData = await fetchNewsData(params.id); // Fetch the news data
    const { title, title_eng, description, description_eng, image } = newsData;

    const imageUrl = `https://newsbook.am/${image}`;

    return {
        title: lang == "arm" ? title : title_eng, // Dynamic title (assumes 'arm' key for Armenian title)
        description: lang == "arm" ? stripHtmlTags(description) : stripHtmlTags(description_eng),
        // Dynamic description (falls back to English if not available)
        openGraph: {
            title: lang == "arm" ? title : title_eng, // Dynamic title (assumes 'arm' key for Armenian title)
            description:
                lang == "arm" ? stripHtmlTags(description) : stripHtmlTags(description_eng),
            url: `https://newsbook.am/newsPage/${params.id}?lang=${lang}`,
            images: imageUrl,
            // images.length > 0
            //     ? `https://newsbook.am/${images[0].imagePath}`
            //     : "/default-image.jpg",
            type: "article", // Article type for Open Graph
            locale: "en_US", // Locale setting for Open Graph
            siteName: "newsbook", // Site name for Open Graph
        },
        twitter: {
            card: "summary_large_image",
            title: lang == "arm" ? title : title_eng, // Dynamic title (assumes 'arm' key for Armenian title)
            description:
                lang == "arm" ? stripHtmlTags(description) : stripHtmlTags(description_eng),

            site: "@newsbook", // Replace with the actual Twitter handle
            creator: "@newsbook",
            images: [
                {
                    url: imageUrl,
                    // images.length > 0
                    //     ? `https://newsbook.am/${images[0].imagePath}`
                    //     : "/default-image.jpg",
                    alt: "News Book Logo",
                },
            ],
        },
    };
}

export default function NewsPage({ params }: { params: { id: string } }) {
    return (
        <div className={classes["container"]}>
            <MainNews id={params.id} />
            <CategoryNews />
        </div>
    );
}

"use client";
import classes from "../style/videos.module.scss";
import { FC } from "react";
import { useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import { NewsDataType } from "@/app/types/types";
import { extractYouTubeID } from "@/app/components/extractYouTubeID";
import CustomImage from "@/app/components/ui/customImage";
import { useAppSelector } from "@/app/redux/reduxHuks";
import NewsHeader from "@/app/components/topHeader/newsHeader";
import Link from "next/link";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import NoData from "@/app/components/noData/noData";

const Videos: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const search: Record<string, any> = {
        lang,
    };

    const filter: Record<string, any> = {
        is_published: true,
        categoryId: 29,
    };

    const { data, isError, isLoading } = useGetNewsQuery({
        limit: 5,
        search: JSON.stringify(search),
        filter: JSON.stringify(filter),
    });

    if (isError) {
        return <div>Error loading news</div>;
    }

    if (isLoading) {
        return <div>...loading </div>;
    }

    if (data && data?.message.length == 0) {
        return <NoData />;
    }
    const newsItems: NewsDataType[] = data?.message || [];
    return (
        <div className={classes.container}>
            <NewsHeader title={"Videos"} />
            <div className={classes.video_list}>
                {newsItems[0]?.link && (
                    <Link href={`newsPage/${newsItems[0]?.id}`} className={classes["video"]}>
                        <div className={classes["youtube_video"]}>
                            <iframe
                                width="100%"
                                height={"100%"}
                                src={`https://www.youtube.com/embed/${extractYouTubeID(
                                    newsItems[0]?.link
                                )}`}
                                title={
                                    lang === "arm" ? newsItems[0]?.title : newsItems[0]?.title_eng
                                }
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                            <h3>
                                {lang === "arm" ? newsItems[0]?.title : newsItems[0]?.title_eng}
                            </h3>
                        </div>
                    </Link>
                )}

                <div className={classes.items_list}>
                    {newsItems.map((el, i) => {
                        if (i > 0) {
                            return (
                                <Link
                                    key={el.id}
                                    href={`newsPage/${el.id}`}
                                    className={classes.videos_news}
                                >
                                    <CustomImage
                                        className={classes.news_img}
                                        src={el.image}
                                        alt="img"
                                        width={180}
                                        height={140}
                                    />
                                    <div className={classes.text}>
                                        <img src="./icons/youtube.png" alt="" />
                                        <h3>
                                            {lang === "arm"
                                                ? newsItems[0]?.title
                                                : newsItems[0]?.title_eng}
                                        </h3>
                                    </div>
                                </Link>
                            );
                        }
                    })}
                    <div className={classes.btn_container}>
                        <Link href={`newsPage?id=29`} className={classes.link_btn}>
                            {translations[lang]["All videos"]}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Videos;

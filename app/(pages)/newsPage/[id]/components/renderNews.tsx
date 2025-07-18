"use client";
import React, { FC } from "react";
import classes from "../style/renderNews.module.scss";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { useGetNewsByIdQuery } from "@/app/redux/features/api/norKhosqkApi";
import { NewsDataType } from "@/app/types/types";
import CustomImage from "@/app/components/ui/customImage";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import { extractYouTubeID } from "@/app/components/extractYouTubeID";
import Slide from "@/app/components/slide/slide";

interface Props {
    id: string | number;
}

const RenderNews: FC<Props> = ({ id }) => {
    const lang = useAppSelector((state) => state.translation.lang);

    const { data, isError, isLoading } = useGetNewsByIdQuery(`${id}`);

    if (isError) {
        return <div>Error loading news</div>;
    }

    if (isLoading) {
        return <div>...loading </div>;
    }

    const news: NewsDataType = data || undefined;

    const images: {
        id: number;
        newsId: number;
        imagePath: string;
        createdAt: string;
        updatedAt: string;
    }[] = data?.images || undefined;

    return (
        <div className={classes.container}>
            {news && news?.lang?.includes(lang) ? (
                <div className={classes.news}>
                    <h1>{lang === "arm" ? news?.title : news.title_eng}</h1>
                    <CustomImage
                        className={classes.news_img}
                        src={news.image}
                        alt="img"
                        width={850}
                        height={580}
                    />

                    <div
                        dangerouslySetInnerHTML={{
                            __html: lang === "arm" ? news?.description : news?.description_eng,
                        }}
                    />

                    {news?.link && (
                        <div className={classes["youtube_video"]}>
                            <iframe
                                width="100%"
                                height={"100%"}
                                src={`https://www.youtube.com/embed/${extractYouTubeID(
                                    news?.link
                                )}`}
                                title={lang === "arm" ? news?.title : news?.title_eng}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}

                    {images?.length > 1 && !news.photo_report && (
                        <div className={classes.news_slide}>
                            <Slide images={images} />
                        </div>
                    )}

                    {news?.photo_report && (
                        <div className={classes["photo_report"]}>
                            {images.map((el) => {
                                return (
                                    <CustomImage
                                        key={el.id}
                                        className={classes.news_image}
                                        src={el.imagePath}
                                        alt="img"
                                        width={700}
                                        height={550}
                                    />
                                );
                            })}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h1>{translations[lang]["not_found"]}</h1>
                </div>
            )}
        </div>
    );
};

export default RenderNews;

"use client";
import classes from "../style/important.module.scss";
import { FC } from "react";
import { useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { NewsDataType } from "@/app/types/types";
import { extractPlainText } from "@/app/components/extractPlainText";
import CustomImage from "@/app/components/ui/customImage";
import Divider from "@/app/components/divider/divider";
import Link from "next/link";
import NewsHeader from "@/app/components/topHeader/newsHeader";

const Important: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const search: Record<string, any> = {
        lang,
    };

    const filter: Record<string, any> = {
        is_published: true,
        important: true,
    };

    const { data, isError, isLoading } = useGetNewsQuery({
        limit: 4,
        search: JSON.stringify(search),
        filter: JSON.stringify(filter),
    });

    if (isError) {
        return <div>Error loading news</div>;
    }

    if (isLoading) {
        return <div>...loading </div>;
    }

    const newsItems: NewsDataType[] = data?.message || [];
    return (
        <div className={classes["important"]}>
            <NewsHeader title={"Eventful"} />
            {newsItems[0] && (
                <Link
                    key={newsItems[0]?.id}
                    href={`/newsPage/${newsItems[0]?.id}`}
                    className={classes.head_news}
                >
                    <h3>{lang === "arm" ? newsItems[0]?.title : newsItems[0]?.title_eng}</h3>
                    <p>
                        {extractPlainText(
                            lang === "arm"
                                ? newsItems[0]?.description
                                : newsItems[0]?.description_eng,
                            180
                        )}
                        ...
                    </p>
                    <CustomImage
                        className={classes["main_img"]}
                        src={newsItems[0]?.image}
                        alt="img"
                        width={600}
                        height={600}
                        priority
                    />
                </Link>
            )}
            <NewsHeader title={"Important"} />
            {newsItems && (
                <div className={classes.news_items}>
                    {newsItems.map((el, i) => {
                        if (i > 0) {
                            return (
                                <Link
                                    key={el.id}
                                    href={`/newsPage/${el.id}`}
                                    className={classes.news_item}
                                >
                                    <CustomImage
                                        key={el.id}
                                        className={`${classes.item_img} `}
                                        src={el.image}
                                        alt="img"
                                        width={300}
                                        height={200}
                                        priority
                                    />

                                    <p>{lang === "arm" ? el.title : el.title_eng || el.title}</p>
                                </Link>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    );
};

export default Important;

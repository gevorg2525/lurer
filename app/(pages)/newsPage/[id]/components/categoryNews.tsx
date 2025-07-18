"use client";
import { FC } from "react";

import { usePathname } from "next/navigation";
import classes from "../style/categoryNews.module.scss";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { useGetNewsByIdQuery } from "@/app/redux/features/api/norKhosqkApi";
import { NewsDataType } from "@/app/types/types";
import RenderList from "./renderList/renderList";
import FollowUs from "@/app/components/followUs/followUs";

const CategoryNews: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const path = usePathname();

    let id = path.split("/")[2];

    const { data, isError, isLoading } = useGetNewsByIdQuery(`${id}`);

    if (isError) {
        return <div>Error loading news</div>;
    }

    if (isLoading) {
        return <div>...loading </div>;
    }

    const news: NewsDataType = data || undefined;
    const newsItems: NewsDataType[] = data?.also || undefined;

    return (
        <div className={classes.container}>
            <div className={classes.list}>
                {news && <RenderList words={news.key_words} lang={lang} data={newsItems} />}
            </div>
            <div className={classes.follow}>
                <FollowUs />
            </div>
        </div>
    );
};

export default CategoryNews;

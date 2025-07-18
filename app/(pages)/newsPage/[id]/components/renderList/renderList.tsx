"use client";
import { FC } from "react";
import classes from "./renderList.module.scss";
import NewsHeader from "@/app/components/topHeader/newsHeader";
import NewsItems from "@/app/components/news_items/newsItems";
import { NewsDataType } from "@/app/types/types";

interface Props {
    lang: string;
    words: string;
    data: NewsDataType[];
}

const RenderList: FC<Props> = ({ words, lang, data }) => {
    // const newsItems: NewsDataType[] = data?.message || [];

    return (
        <div className={classes.container}>
            <NewsHeader title={"Also learn"} />
            {data && (
                <div className={classes.list}>
                    {data.map((el) => {
                        return <NewsItems key={el.id} data={el} lang={lang} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default RenderList;

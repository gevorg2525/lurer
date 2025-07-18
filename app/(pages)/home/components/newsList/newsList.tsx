"use client";
import classes from "./newsList.module.scss";
import { FC, useState } from "react";
import { useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import { useAppSelector } from "@/app/redux/reduxHuks";
import Divider from "@/app/components/divider/divider";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import { NewsDataType } from "@/app/types/types";
import Link from "next/link";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

// Utility to format the date as "DD.MM"
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}.${month}`;
};

interface Props {
    id?: number;
    title: string;
}

const NewsList: FC<Props> = ({ id, title }) => {
    const lang = useAppSelector((state) => state.translation.lang);
    const [isVisible, setIsVisible] = useState(false);
    const search: Record<string, any> = {
        lang,
    };

    const filter: Record<string, any> = {
        is_published: true,
    };
    if (id) filter.categoryId = id;

    const { data, isError, isLoading } = useGetNewsQuery({
        limit: 8,
        search: JSON.stringify(search),
        filter: JSON.stringify(filter),
    });

    if (isError) {
        return <div>Error loading news</div>;
    }

    const newsItems: NewsDataType[] = data?.message || [];

    return (
        <div
            className={`${classes["newsList"]} ${isVisible && classes["visible"]}`}
            onClick={() => setIsVisible(!isVisible)}
        >
            <div className={classes.title_block}>
                <h2 className={classes["title"]}>{translations[lang]["news feed"]}</h2>
                <span className={`${classes.arrow} ${isVisible && classes.arrowUp}`}>
                    <MdOutlineKeyboardArrowDown />
                </span>
            </div>
            <Divider />
            {isLoading ? (
                <div>...loading</div>
            ) : (
                <ul className={classes["newsItems"]}>
                    {newsItems.map((item) => (
                        <Link
                            href={`/newsPage/${item.id}?lang=${lang}`}
                            key={item.id}
                            className={classes["newsItem"]}
                        >
                            <span className={classes["date"]}>{formatDate(item.createdAt)}</span>
                            <div className={classes["content"]}>
                                <h3
                                    className={`${classes["newsTitle"]} ${
                                        (item.is_bold || item.important) && classes["bold"]
                                    }`}
                                >
                                    {lang === "arm" ? item.title : item.title_eng || item.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default NewsList;

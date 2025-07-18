"use client";
import { FC, Suspense, useEffect, useState } from "react";
import classes from "../style/news.module.scss";
import { useGetCategoriesQuery, useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHuks";

import { useSearchParams } from "next/navigation";
import { setParams } from "@/app/redux/features/search/searchSlice";
import { NewsDataType } from "@/app/types/types";
import CustomImage from "@/app/components/ui/customImage";
import Link from "next/link";
import { extractPlainText } from "@/app/components/extractPlainText";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import NewsHeader from "@/app/components/topHeader/newsHeader";
import getMyDate from "@/app/components/getMyDate";
import Divider from "@/app/components/divider/divider";
import Image from "next/image";
import GrideNews from "./grideNews";

const News: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const search = useAppSelector((state) => state.search.search);
    const [limit, setLimit] = useState(9);

    const [queryObj, setQueryObj] = useState<Partial<any>>({
        search: JSON.stringify({ lang: lang }),
        filter: JSON.stringify({
            is_published: true,
            // important: true,
            categoryId: 15,
        }),
    });

    const { data, isError } = useGetNewsQuery({
        limit,
        filter: JSON.stringify({
            is_published: true,
            // important: true,
            categoryId: 24,
        }),
        search: JSON.stringify({ lang: lang }),
    });

    // const { data: categories } = useGetCategoriesQuery({});

    useEffect(() => {
        if (search.length > 0) {
            setQueryObj({
                ...queryObj,
                search: JSON.stringify({ lang: lang, title: search, key_words: search }),
            });
        } else if (search.length === 0) {
            setQueryObj({
                ...queryObj,
                search: JSON.stringify({ lang: lang }),
            });
        }
    }, [search, lang]);

    const newsItems: NewsDataType[] = data?.message || [];

    return (
        <div className={classes.container}>
            <div className={classes.page_title}>
                <h1>{translations[lang]["Photo report"]}</h1>
                <div className={classes.line}>
                    <Divider />
                </div>
            </div>
            <div className={classes.header_block}>
                <div className={classes.firstNews}>
                    {newsItems[0] && (
                        <Link href={`newsPage/${newsItems[0]?.id}`} className={classes.news_link}>
                            <Image
                                className={classes.camera}
                                src={"/icons/camera.png"}
                                width={48}
                                height={48}
                                alt="img"
                            />
                            <div className={classes.news_img}>
                                <CustomImage
                                    src={newsItems[0]?.image}
                                    alt="img"
                                    width={650}
                                    height={250}
                                />
                            </div>

                            <div className={classes.news_text}>
                                <div className={classes.date}>
                                    <h2>{getMyDate(newsItems[0].createdAt)}</h2>
                                    <Divider />
                                </div>
                                <p>
                                    {lang === "arm" ? newsItems[0].title : newsItems[0].title_eng}
                                </p>
                            </div>
                        </Link>
                    )}
                </div>
                <div className={classes.right_header}>
                    {newsItems.map((el, i) => {
                        if (i > 0 && i < 3) {
                            return (
                                <Link
                                    key={el?.id}
                                    href={`newsPage/${el?.id}`}
                                    className={classes.left_links}
                                >
                                    <Image
                                        className={classes.camera}
                                        src={"/icons/camera.png"}
                                        width={48}
                                        height={48}
                                        alt="img"
                                    />
                                    <div className={classes.img_div}>
                                        <CustomImage
                                            className={classes.left_img}
                                            src={el?.image}
                                            alt="img"
                                            width={650}
                                            height={250}
                                        />
                                    </div>
                                    <div className={classes.news_text}>
                                        <div className={classes.date}>
                                            <h2>{getMyDate(el?.createdAt)}</h2>
                                            <Divider />
                                        </div>
                                        <p>{lang === "arm" ? el?.title : el?.title_eng}</p>
                                    </div>
                                </Link>
                            );
                        }
                    })}
                </div>
            </div>
            <GrideNews newsItems={newsItems} />
        </div>
    );
};

export default News;

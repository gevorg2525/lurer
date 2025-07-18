"use client";
import classes from "../style/news.module.scss";
import { FC, Suspense, useEffect, useState } from "react";
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
import NoData from "@/app/components/noData/noData";

interface QueryObj {
    filter: Record<string, any>;
    search: string;
}

interface Categories {
    id: number;
    name: string;
    name_eng: string;
}

const News: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const search = useAppSelector((state) => state.search.search);
    const [limit, setLimit] = useState(3);
    const paramsId = useAppSelector((state) => state.search.id);
    const dispatch = useAppDispatch();

    const id = useSearchParams().get("id");
    const [queryObj, setQueryObj] = useState<Partial<any>>({
        search: JSON.stringify({ lang: lang }),
        filter: JSON.stringify({
            is_published: true,
            // important: true,
            categoryId: id,
        }),
    });

    const { data, isError, isLoading } = useGetNewsQuery({
        limit,
        ...queryObj,
    });

    // const { data: categories } = useGetCategoriesQuery({});

    useEffect(() => {
        if (search) {
            setQueryObj({
                ...queryObj,
                search: JSON.stringify({ lang: lang, title: search }),
                filter: JSON.stringify({
                    is_published: true,
                }),
            });
        } else if (search.length === 0) {
            setQueryObj({
                ...queryObj,
                search: JSON.stringify({ lang: lang }),
                filter: JSON.stringify({
                    is_published: true,
                    categoryId: id,
                }),
            });
        }
    }, [search, lang]);

    useEffect(() => {
        if (paramsId) {
            // setParamsId(id.get("id"));
            setQueryObj({
                ...queryObj,
                filter: JSON.stringify({
                    ...JSON.parse(queryObj.filter),
                    categoryId: paramsId,
                }),
            });
        }
    }, [paramsId]);

    useEffect(() => {
        if (id) {
            dispatch(setParams(id));
        }
    }, []);

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
        <Suspense>
            <div className={classes["container"]}>
                <NewsHeader title={"Eventful"} />
                {newsItems[0] && (
                    <Link
                        href={`newsPage/${newsItems[0].id}?lang=${lang}`}
                        className={classes.head_news}
                    >
                        <CustomImage
                            className={classes.head_img}
                            src={newsItems[0].image}
                            alt="img"
                            width={460}
                            height={310}
                        />
                        <div className={classes.content}>
                            <h3>
                                {lang === "arm" ? newsItems[0]?.title : newsItems[0]?.title_eng}
                            </h3>

                            <p>
                                {extractPlainText(
                                    lang === "arm"
                                        ? newsItems[0]?.description
                                        : newsItems[0]?.description_eng,
                                    180
                                )}
                                ...
                            </p>
                            <button>{translations[lang]["Read more"]}</button>
                        </div>
                    </Link>
                )}
                <NewsHeader title="Important" />
                {newsItems && (
                    <div className={classes.news_items}>
                        {newsItems.map((el, i) => {
                            if (i > 0) {
                                return (
                                    <Link
                                        key={el.id}
                                        href={`newsPage/${el.id}`}
                                        className={classes.news_item}
                                    >
                                        <CustomImage
                                            key={el.id}
                                            className={`${classes.item_img} `}
                                            src={el.image}
                                            alt="img"
                                            width={384}
                                            height={237}
                                        />

                                        <h3>
                                            {lang === "arm" ? el.title : el.title_eng || el.title}
                                        </h3>

                                        <p>
                                            {extractPlainText(
                                                lang === "arm"
                                                    ? newsItems[0]?.description
                                                    : newsItems[0]?.description_eng,
                                                100
                                            )}
                                            ...
                                        </p>
                                    </Link>
                                );
                            }
                        })}
                    </div>
                )}
            </div>
        </Suspense>
    );
};

export default News;

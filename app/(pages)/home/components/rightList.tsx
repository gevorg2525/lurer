"use client";
import classes from "../style/rightList.module.scss";
import { FC } from "react";
import { useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { NewsDataType } from "@/app/types/types";
import CustomImage from "@/app/components/ui/customImage";
import Divider from "@/app/components/divider/divider";
import Link from "next/link";
import NoData from "@/app/components/noData/noData";
import NewsHeader from "@/app/components/topHeader/newsHeader";

const RightList: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const search: Record<string, any> = {
        lang,
    };

    const filter: Record<string, any> = {
        is_published: true,
        categoryId: 30,
    };

    const { data, isError, isLoading } = useGetNewsQuery({
        limit: 3,
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
            <NewsHeader title="Urgent" />
            {newsItems &&
                newsItems.map((el, i) => {
                    return (
                        <Link key={el.id} href={`newsPage/${el.id}`} className={classes.news_items}>
                            <h3>{lang === "arm" ? el?.title : el?.title_eng || el.title}</h3>
                            <Divider />
                            <CustomImage
                                className={`${classes.imageDiv} ${i < 3 && classes.visible}`}
                                src={el.image}
                                alt="img"
                                width={260}
                                height={250}
                            />
                        </Link>
                    );
                })}
        </div>
    );
};

export default RightList;

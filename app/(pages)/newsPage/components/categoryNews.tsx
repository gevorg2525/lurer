"use client";
import { FC } from "react";
import { useGetCategoryByIdQuery, useGetNewsQuery } from "@/app/redux/features/api/norKhosqkApi";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { useSearchParams } from "next/navigation";
import classes from "../style/categoryNews.module.scss";
import RenderList from "@/app/components/renderList/renderList";
import FollowUs from "@/app/components/followUs/followUs";

const CategoryNews: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const id = useSearchParams().get("id") || "1";
    const { data } = useGetCategoryByIdQuery(id);

    return (
        <div className={classes.container}>
            <div className={classes.list}>
                {data && <RenderList propsData={data} lang={lang} />}
            </div>
            <div className={classes.follow}>
                <FollowUs />
            </div>
        </div>
    );
};

export default CategoryNews;

"use client";
import classes from "../style/categories.module.scss";
import { FC } from "react";
import { useGetCategoriesQuery } from "@/app/redux/features/api/norKhosqkApi";
import NewsList from "@/app/components/newsList/newsList";
import { useAppSelector } from "@/app/redux/reduxHuks";
import RenderCategories from "./renderCategories";
import FollowUs from "@/app/components/followUs/followUs";
import NoData from "@/app/components/noData/noData";

const Categories: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);

    const { data, isLoading, isError } = useGetCategoriesQuery({ limit: 5 });
    const categories: {
        id: number;
        name: string;
        name_eng: string;
    }[] = data?.message || [];

    if (isError) {
        return <div>Error loading news</div>;
    }

    if (isLoading) {
        return <div>...loading </div>;
    }

    if (data && data?.message.length == 0) {
        return <NoData />;
    }

    return (
        <div className={classes.container}>
            <div className={classes.categories_list}>
                {categories &&
                    categories.map((el) => {
                        return (
                            <div key={el.id} className={classes.categories_item}>
                                <RenderCategories propsData={el} lang={lang} />
                            </div>
                        );
                    })}
            </div>
            <div className={classes.press}>
                <NewsList title={"Press"} id={23} />
                <FollowUs />
            </div>
        </div>
    );
};

export default Categories;

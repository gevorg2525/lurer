"use client";
import classes from "../style/homeHeader.module.scss";
import { FC } from "react";
import NewsHeader from "@/app/components/topHeader/newsHeader";
import Important from "./important";
import RightList from "./rightList";
import NewsList from "./newsList/newsList";

const HomeHeader: FC = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["latest_news"]}>
                <NewsList title="Latest news" />
            </div>

            <div className={classes.top_news}>
                <div className={classes.main_news}>
                    <Important />
                    <RightList />
                </div>
            </div>
        </div>
    );
};

export default HomeHeader;

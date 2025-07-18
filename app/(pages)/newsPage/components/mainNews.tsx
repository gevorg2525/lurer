import React from "react";
import classes from "../style/mainNews.module.scss";
import News from "./news";
import NewsList from "../../home/components/newsList/newsList";
import FollowUs from "@/app/components/followUs/followUs";
const MainNews = () => {
    return (
        <div className={classes["container"]}>
            <div className={classes["left_block"]}>
                <News />
            </div>

            <div className={classes.right_block}>
                <NewsList title={"Latest news"} />
            </div>
        </div>
    );
};

export default MainNews;

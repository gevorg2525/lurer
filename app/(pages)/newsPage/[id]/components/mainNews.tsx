import { FC } from "react";
import classes from "../style/mainNews.module.scss";
import NewsList from "../../../home/components/newsList/newsList";
import RenderNews from "./renderNews";

interface Props {
    id: string | number;
}
const MainNews: FC<Props> = ({ id }) => {
    return (
        <div className={classes["container"]}>
            <div className={classes["left_block"]}>
                <RenderNews id={id} />
            </div>

            <div className={classes.right_block}>
                <NewsList title={"Latest news"} />
            </div>
        </div>
    );
};

export default MainNews;

import { FC, Suspense } from "react";
import classes from "./page.module.scss";
import News from "./components/news";

const PhotoReport: FC = () => {
    return (
        <div className={classes.container}>
            <News />
        </div>
    );
};

export default PhotoReport;

import { FC } from "react";
import classes from "./newsItems.module.scss";
import Link from "next/link";
import { NewsDataType } from "@/app/types/types";
import CustomImage from "../ui/customImage";
import { extractPlainText } from "../extractPlainText";
import Media from "../media/media";
import NoData from "../noData/noData";

interface Props {
    data: NewsDataType;
    lang: string;
}
const NewsItems: FC<Props> = ({ data, lang }) => {
    if (!data?.id) {
        return <NoData />;
    }

    return (
        <Link href={`/newsPage/${data?.id}?lang=${lang}`} className={classes.container}>
            <div className={classes.context}>
                <CustomImage
                    className={classes.news_img}
                    src={data?.image}
                    alt="img"
                    width={222}
                    height={149}
                />
                <div className={classes.text}>
                    <h3>{lang === "arm" ? data?.title : data?.title_eng}</h3>
                    <p>
                        {extractPlainText(
                            lang === "arm" ? data?.description : data?.description_eng,
                            200
                        )}
                        ...
                    </p>
                </div>
            </div>
            <div className={classes.media_links}>
                <Media id={data.id} title={lang === "arm" ? data?.title : data?.title_eng} />
            </div>
        </Link>
    );
};

export default NewsItems;

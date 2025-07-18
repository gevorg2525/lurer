import { FC } from "react";
import classes from "../style/gridNews.module.scss";
import { NewsDataType } from "@/app/types/types";
import Link from "next/link";
import CustomImage from "@/app/components/ui/customImage";
import Image from "next/image";
import getMyDate from "@/app/components/getMyDate";
import Divider from "@/app/components/divider/divider";
import { useAppSelector } from "@/app/redux/reduxHuks";

interface Props {
    newsItems: NewsDataType[];
}
const GrideNews: FC<Props> = ({ newsItems }) => {
    const lang = useAppSelector((state) => state.translation.lang);

    return (
        <div className={classes["grid-container"]}>
            {newsItems.map((el, i) => {
                if (i > 2) {
                    return (
                        <Link
                            key={el.id}
                            href={`newsPage/${el?.id}`}
                            className={`${classes["grid-item"]} ${classes[`item-${i - 2}`]}`}
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
                                    <h2>{getMyDate(el.createdAt)}</h2>
                                    <Divider />
                                </div>
                                <p>{lang === "arm" ? el.title : el.title_eng}</p>
                            </div>
                        </Link>
                    );
                }
            })}
        </div>
    );
};

export default GrideNews;

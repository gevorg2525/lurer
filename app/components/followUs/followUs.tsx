"use client";
import { FC } from "react";
import classes from "./followUs.module.scss";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import Divider from "../divider/divider";

const FollowUs: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const links = [
        {
            id: 1,
            image: "/icons/facebookFollow.png",
            link: "https://www.facebook.com/share/1E4KVvgMwL/?mibextid=wwXIfr",
        },
        {
            id: 2,
            image: "/icons/telegramFollow.png",
            link: "https://t.me/newsbooktv",
        },
        // { id: 3, image: "/icons/linkedIn.png", link: "#" },
        // { id: 4, image: "/icons/instagram.png", link: "#" },
        // { id: 5, image: "/icons/twitter.png", link: "#" },
        {
            id: 6,
            image: "/icons/youtube.png",
            link: "https://youtube.com/@newsbooklratvakan?si=yskslM2Q3P146Bfs",
        },
    ];

    return (
        <div className={classes.container}>
            <div className={classes["title"]}>
                <h3>{translations[lang]["follow_us"]}</h3>
                <Divider />
            </div>

            <div className={classes.links}>
                {links.map((el) => {
                    return (
                        <a
                            key={el.id}
                            href={el.link}
                            target={"_blank"}
                            className={classes.link_item}
                        >
                            <img src={el.image} alt="alt" width={32} height={32} />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default FollowUs;

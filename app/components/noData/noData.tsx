"use client";
import { PiEmpty } from "react-icons/pi";
import { FC } from "react";
import classes from "./noData.module.scss";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import { useAppSelector } from "@/app/redux/reduxHuks";
const NoData: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    return (
        <div className={classes["container"]}>
            <div className={classes["content"]}>
                <PiEmpty className={classes["icon"]} />
                <h3>{translations[lang]["not_found"]}</h3>
            </div>
        </div>
    );
};

export default NoData;

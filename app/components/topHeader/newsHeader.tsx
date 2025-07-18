"use client";
import { FC } from "react";
import classes from "./newsHeader.module.scss";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import Divider from "../divider/divider";

interface Props {
    title: string;
}

const NewsHeader: FC<Props> = ({ title }) => {
    const lang = useAppSelector((state) => state.translation.lang);

    return (
        <div className={classes["header"]}>
            <h2>{translations[lang][title]}</h2>
            <Divider />
        </div>
    );
};

export default NewsHeader;

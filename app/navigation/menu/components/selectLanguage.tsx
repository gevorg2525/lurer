"use client";
import { FC, useEffect, useState } from "react";
import classes from "../style/selectLanguage.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHuks";
import { setTranslation } from "@/app/redux/features/translations/translationsSlice";
import useQueryParams from "@/app/hooks/useQueryParams";
import { useSearchParams } from "next/navigation";
import { setCookie } from "cookies-next";

type Leng = "arm" | "eng";

interface Conversion {
    result: string;
    base_code: string;
    conversion_rates: {
        AMD: number;
        EUR: number;
        RUB: number;
        USD: number;
    };
}

const title: Record<string, string> = {
    arm: "ՆՈՐ ԽՈՍՔ",
    eng: "NEW WORD",
};

const SelectLanguage: FC = () => {
    const lang = useAppSelector((state) => state.translation.lang);
    const dispatch = useAppDispatch();
    const [rates, setRates] = useState<Partial<Conversion>>({});
    const { updateQueryParam } = useQueryParams();
    const params = useSearchParams();
    const paramsId = (params.get("lang") as Leng) || ("arm" as Leng);
    const getData = () => {
        fetch(`https://v6.exchangerate-api.com/v6/091f130637a26b97d8546554/latest/AMD`)
            .then((data) => data.json())
            .then((data) => setRates(data));
    };

    // useEffect(() => {
    //     getData();
    // }, []);

    useEffect(() => {
        dispatch(setTranslation(paramsId || lang));
        updateQueryParam("lang", paramsId || lang);
        setCookie("lang", paramsId || lang);
    }, []);

    return (
        <div className={classes["lang_container"]}>
            {/* {rates.conversion_rates && (
                <div className={classes["conversations"]}>
                    <h3>1USD = {(1 / rates.conversion_rates["USD"]).toFixed(0)} AMD </h3>
                    <h3>1EUR = {(1 / rates.conversion_rates["EUR"]).toFixed(0)} AMD</h3>
                </div>
            )} */}
            <div className={classes["btn_container"]}>
                <div className={classes["btn_list"]}>
                    <button
                        className={`${classes["lang_btn"]} ${lang == "arm" && classes["selected"]}`}
                        onClick={() => {
                            dispatch(setTranslation("arm"));
                            updateQueryParam("lang", "arm");
                            setCookie("lang", "arm");
                        }}
                    >
                        Հայ
                    </button>
                    <div className={classes["line"]}></div>
                    <button
                        className={`${classes["lang_btn"]} ${lang == "eng" && classes["selected"]}`}
                        onClick={() => {
                            dispatch(setTranslation("eng"));
                            updateQueryParam("lang", "eng");
                            setCookie("lang", "eng");
                        }}
                    >
                        Eng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectLanguage;

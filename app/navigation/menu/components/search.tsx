"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import classes from "../style/search.module.scss";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHuks";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import { useRouter } from "next/navigation";
import { setSearch } from "@/app/redux/features/search/searchSlice";
import SelectLanguage from "./selectLanguage";
import Image from "next/image";
import getDateHeader from "@/app/components/getDateHeader";
import DropdownMenu from "@/app/components/dropdownMenu/sropdownMenu";

interface Props {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}

const Search: FC<Props> = ({ setIsOpen, isOpen }) => {
    const lang = useAppSelector((state) => state.translation.lang);

    const [value, setValue] = useState("");
    const [isSearch, setIsSearch] = useState(false);
    const dispatch = useAppDispatch();
    const router = useRouter();

    const searchClick = () => {
        if (document.body.offsetWidth < 1100) {
            setIsSearch(true);
        }

        router.push(`/newsPage?search=${value}`);
        dispatch(setSearch(value));
        if (document.body.offsetWidth < 1100) {
            setIsOpen(false);
        }
    };

    return (
        <div className={classes["container"]}>
            <div
                className={classes["burger_menu"]}
                onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(!isOpen);
                }}
            >
                <img
                    src="/icons/menu.png"
                    className={`${classes["menu_icon"]} ${!isOpen && classes["visible"]}`}
                />

                <img
                    src="/icons/close.png"
                    className={`${classes["menu_icon"]} ${isOpen && classes["visible"]}`}
                />
                <div
                    style={{
                        transform: isOpen ? "translateX(0)" : "translateX(-800px)",
                        transition: "transform 0.3s ease-in-out",
                        position: "absolute",
                        top: "72px",
                        left: 0,
                        zIndex: 1000,
                    }}
                >
                    <DropdownMenu />
                </div>
            </div>

            <Link href={"/"} className={classes["logo_link"]}>
                <img src="/images/logo.png" alt="" className={classes["logo"]} />
                <span className={classes.date}> {getDateHeader(lang)}</span>
            </Link>
            <div className={classes["search_container"]}>
                <div className={classes["search_block"]}>
                    <input
                        onChange={(e) => setValue(e.target.value)}
                        type="text"
                        className={`${classes["search"]} ${isSearch && classes["active"]}`}
                        placeholder={translations[lang]["menu"]["search"]}
                    />
                    <button className={`${classes["search_btn"]} `} onClick={searchClick}>
                        <Image src={"/icons/search.png"} alt="search" height={24} width={24} />
                    </button>
                </div>
                <div className={classes.languages}>
                    <SelectLanguage />
                </div>
            </div>
        </div>
    );
};

export default Search;

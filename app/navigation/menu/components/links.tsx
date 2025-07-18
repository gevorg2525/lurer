"use client";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import classes from "../style/links.module.scss";
import Link from "next/link";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHuks";
import { usePathname, useSearchParams } from "next/navigation";
import { FaChevronDown } from "react-icons/fa6";
import { useGetCategoriesQuery } from "@/app/redux/features/api/norKhosqkApi";
import { setParams } from "@/app/redux/features/search/searchSlice";
import DropdownMenu from "@/app/components/dropdownMenu/sropdownMenu";

interface Categories {
    id: number;
    name: string;
    images: never[];
}

interface Props {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}

const localLang: Record<string, any> = {
    cultural: {
        arm: "Մշակութային",
        eng: "Cultural",
    },
    historical: {
        arm: "Պատմական",
        eng: "Historical",
    },
};

const MenuLinks: FC<Props> = ({ isOpen, setIsOpen }) => {
    const lang = useAppSelector((state) => state.translation.lang);
    const path = usePathname();
    const id = useSearchParams().get("id");
    const { data } = useGetCategoriesQuery({ limit: 7 });
    const dispatch = useAppDispatch();

    const categories: {
        id: number;
        name: string;
        name_eng: string;
    }[] = data?.message || [];

    useEffect(() => {
        if (document.body.offsetWidth > 1100) {
            setIsOpen(false);
        }
    }, [path, id]);

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

            <nav className={classes["navigation"]}>
                <Link
                    className={`${classes["nav_link"]} ${path == "/" ? classes["active"] : ""}`}
                    href={"/"}
                >
                    {translations[lang]["menu"]["main"]}
                </Link>
                {categories &&
                    categories.map((el) => {
                        return (
                            <Link
                                key={el?.id}
                                className={`${classes["nav_link"]} ${
                                    id == `${el?.id}` ? classes["active"] : ""
                                }`}
                                href={el.id != 24 ? `/newsPage?id=${el.id}` : `/photoReport`}
                                onClick={() => dispatch(setParams(`${el.id}`))}
                            >
                                {lang === "arm" ? el.name : el.name_eng}
                            </Link>
                        );
                    })}

                {/* <Link
                    className={`${classes["nav_link"]} ${id == "7" ? classes["active"] : ""}`}
                    href={`/newsPage?id=7`}
                    onClick={() => dispatch(setParams("7"))}
                >
                    {translations[lang]["menu"]["analytics"]}
                </Link>
                <Link
                    className={`${classes["nav_link"]} ${id == "8" ? classes["active"] : ""}`}
                    href={`/newsPage?id=8`}
                    onClick={() => dispatch(setParams("8"))}
                >
                    {translations[lang]["menu"]["interviews"]}
                </Link>

                <Link
                    className={`${classes["nav_link"]} ${id == "3" ? classes["active"] : ""}`}
                    href={`/newsPage?id=3`}
                    onClick={() => dispatch(setParams("3"))}
                >
                    {localLang["cultural"][lang]}
                </Link>
                <Link
                    className={`${classes["nav_link"]} ${id == "1" ? classes["active"] : ""}`}
                    href={`/newsPage?id=1`}
                    onClick={() => dispatch(setParams("1"))}
                >
                    {localLang["historical"][lang]}
                </Link>

                <Link
                    className={`${classes["nav_link"]} ${
                        path == "/about" ? classes["active"] : ""
                    }`}
                    href={"/about"}
                >
                    {translations[lang]["menu"]["about_us"]}
                </Link> */}
            </nav>
        </div>
    );
};

export default MenuLinks;

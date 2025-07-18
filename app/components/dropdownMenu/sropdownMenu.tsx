import React, { useEffect, useState } from "react";
import styles from "./dropdownMenu.module.scss";
import { useAppDispatch, useAppSelector } from "@/app/redux/reduxHuks";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import SelectLanguage from "@/app/navigation/menu/components/selectLanguage";
import { useGetCategoriesQuery } from "@/app/redux/features/api/norKhosqkApi";
import Link from "next/link";
import Divider from "../divider/divider";
import { setParams } from "@/app/redux/features/search/searchSlice";
interface MenuItem {
    label: {
        id?: number;
        arm: string;
        eng: string;
    };
    subItems?: MenuItem[];
}

const menuItems: MenuItem[] = [
    {
        label: {
            arm: "Գլխավոր",
            eng: "Home",
        },
        subItems: [],
    },
    {
        label: {
            arm: "Տարածաշրջան",
            eng: "Region",
        },
        subItems: [
            { label: { id: 19, arm: "Հայաստան", eng: "Armenia" } },
            { label: { id: 20, arm: "Վրաստան", eng: "Georgia" } },
            { label: { id: 21, arm: "Ադրբեջան", eng: "Azerbaijan" } },
            { label: { id: 22, arm: "Իրան", eng: "Iran" } },
        ],
    },
];

const navItems = [
    { label: { id: 23, arm: "Միջազգային մամուլ", eng: "International press" } },
    { label: { id: 24, arm: "Ֆոտոռեպորտաժ", eng: "Photo report" } },
    { label: { id: 29, arm: "Տեսանյութեր", eng: "Videos" } },
];
const DropdownMenu: React.FC = () => {
    const lang: "arm" | "eng" = useAppSelector((state) => state.translation.lang);
    const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
    const { data } = useGetCategoriesQuery({ limit: 7 });
    const dispatch = useAppDispatch();

    const categories: {
        id: number;
        name: string;
        name_eng: string;
    }[] = data?.message || [];

    const handleClick = (index: number) => {
        // Toggle the submenu: if the clicked item is already active, close it; otherwise, open it
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    useEffect(() => {
        if (categories.length > 0 && menuItems[0].subItems?.length == 0) {
            for (let i = 0; i < categories.length; i++) {
                menuItems[0].subItems?.push({
                    label: {
                        id: categories[i].id,
                        arm: categories[i].name,
                        eng: categories[i].name_eng,
                    },
                });
            }
        }
    }, [data]);

    return (
        <nav className={styles.nav} lang={lang} onClick={(e) => e.stopPropagation()}>
            <ul className={styles.menu}>
                {menuItems.map((item, index) => (
                    <li key={index} className={styles.menuItem}>
                        <div className={styles.menuItemLabel} onClick={() => handleClick(index)}>
                            {item.label[lang]}
                            {item.subItems && (
                                <span
                                    className={`${styles.arrow} ${
                                        activeDropdown === index ? styles.arrowUp : ""
                                    }`}
                                >
                                    <MdOutlineKeyboardArrowDown />
                                </span>
                            )}
                        </div>
                        {item.subItems && activeDropdown === index && (
                            <ul className={styles.subMenu}>
                                {item.subItems.map((subItem, subIndex) => (
                                    <Link
                                        onClick={() => dispatch(setParams(`${subItem?.label?.id}`))}
                                        className={styles.link}
                                        key={subIndex}
                                        href={`/newsPage?id=${subItem.label?.id}`}
                                    >
                                        <li className={styles.subMenuItem}>
                                            {subItem.label[lang]}
                                        </li>
                                    </Link>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
                <div className={styles.line}></div>
                {navItems.map((subItem, subIndex) => (
                    <li key={subIndex} className={styles.subMenuItemLinks}>
                        <Link
                            onClick={() => {
                                if (subItem?.label?.id) {
                                    dispatch(setParams(`${subItem?.label?.id}`));
                                }
                            }}
                            className={styles.link}
                            href={
                                subItem.label.id == 24
                                    ? `photoReport`
                                    : `/newsPage?id=${subItem.label?.id}`
                            }
                        >
                            {subItem.label[lang]}
                        </Link>
                    </li>
                ))}
            </ul>

            <div className={styles.languages}>
                <SelectLanguage />
            </div>
        </nav>
    );
};

export default DropdownMenu;

"use client";
import classes from "./menu.module.scss";
import { FC, useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Search from "./components/search";
import MenuLinks from "./components/links";

const Menu: FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const id = useSearchParams().get("id");
    const path = usePathname();

    const handleMenuclick = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        if (document.body.offsetWidth < 1100) {
            handleMenuclick();
        }
    }, [path, id]);

    // useEffect(() => {
    //     const handleBodyClick = (e: MouseEvent) => {
    //         if (!e.target) return;
    //         const target = e.target as HTMLElement;

    //         // if (!target.closest(`.${classes[""]}`)) {
    //         //     setIsOpen(false);
    //         // }
    //     };

    //     document.body.addEventListener("click", handleBodyClick);

    //     return () => {
    //         document.body.removeEventListener("click", handleBodyClick);
    //     };
    // }, []);

    return (
        <div
            className={classes["navigation"]}
            onClick={(e) => {
                e.preventDefault();
            }}
        >
            <div className={classes["menu"]}>
                <Search isOpen={isOpen} setIsOpen={setIsOpen} />
                <MenuLinks isOpen={isOpen} setIsOpen={setIsOpen} />
            </div>
        </div>
    );
};

export default Menu;

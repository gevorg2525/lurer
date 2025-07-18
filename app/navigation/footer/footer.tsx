"use client";
import Link from "next/link";
import classes from "./styles/footer.module.scss";
import { FC } from "react";
import { translations } from "@/app/redux/features/translations/initialtranslations";
import { useAppSelector } from "@/app/redux/reduxHuks";
import { FaRegCopyright } from "react-icons/fa6";

import Image from "next/image";
import { useGetCategoriesQuery } from "@/app/redux/features/api/norKhosqkApi";

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

const Footer = () => {
    const lang = useAppSelector((state) => state.translation.lang);

    const { data, isLoading } = useGetCategoriesQuery({ limit: 7 });

    const categories: {
        id: number;
        name: string;
        name_eng: string;
    }[] = data?.message || [];

    return (
        <div className={classes["footer"]}>
            <div className={classes.footer_up}>
                <div className={classes["logoContainer"]}>
                    <Link href={"/"} className={classes["logo"]}>
                        <img src={"/images/logo.png"} alt={"logo"} width={100} height={100} />
                    </Link>
                    <h3 className={classes["footer_text"]}>{translations[lang]["footer_text"]}</h3>
                </div>

                <div className={classes["news"]}>
                    <h3>{translations[lang]["menu"]["news"]}</h3>
                    <div className={classes.links}>
                        {categories.map((el) => {
                            return (
                                <Link
                                    key={el.id}
                                    className={`${classes["news_link"]} `}
                                    href={`newsPage/?id=${el.id}`}
                                >
                                    {lang === "arm" ? el.name : el.name_eng}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                <div className={classes["link_section"]}>
                    <p>{translations[lang]["Region"]}</p>
                    <div className={classes.links}>
                        <Link className={`${classes["nav_link"]} `} href={"/"}>
                            {translations[lang]["Armenia"]}
                        </Link>
                        <Link className={`${classes["nav_link"]} `} href={"/about"}>
                            {translations[lang]["Georgia"]}
                        </Link>
                        <Link className={`${classes["nav_link"]} `} href={"/interviews"}>
                            {translations[lang]["Azerbaijan"]}
                        </Link>
                        <Link className={`${classes["nav_link"]} `} href={"/interviews"}>
                            {translations[lang]["Iran"]}
                        </Link>
                    </div>
                </div>

                {/* <div className={classes["link_section"]}>
                    <p>{translations[lang]["menu"]["about_us"]}</p>
                </div> */}

                <div className={classes["contact_section"]}>
                    <div className={classes["info"]}>
                        <p>{translations[lang]["Address"]}</p>
                        <div className={classes.contacts}>
                            <img src="/icons/mail.png" height={20} width={20} />
                            <a href="mailto:info@newsbook.am">info@newsbook.am</a>
                        </div>
                        <a href="mailto:info@newsbook.am">info@newsbook.am</a>

                        <div className={classes.contacts}>
                            <img src="/icons/phone.png" height={20} width={20} />
                            <a href="tel:+374 11 78-00-18">+374 11 78-00-18</a>
                        </div>

                        <div className={classes.contacts}>
                            <img src="/icons/location.png" height={20} width={20} />
                            <a href="#">{translations[lang]["location"]}</a>
                        </div>
                    </div>
                    <div className={classes["links_container"]}>
                        {links.map((el) => {
                            return (
                                <a key={el.id} href={el.link}>
                                    <Image src={el.image} alt="img" width={24} height={24} />
                                </a>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div className={classes["content"]}>
                <p>
                    Copyright <FaRegCopyright /> <span>{new Date().getFullYear()}</span>
                    NewsBook
                </p>
                <p className={classes["powered"]}>
                    Powered by
                    <a href="https://itartashat.am" target="_blank">
                        ItArtashat
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Footer;

// import type { Metadata } from "next";

import "./globals.css";
import Menu from "./navigation/menu/menu";
import Providers from "./redux/provider";
import Footer from "./navigation/footer/footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Suspense } from "react";
import { MontseratLight, MontseratSemiBold, MontserratRegular } from "./utils/fontsConfig";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <Providers>
                <body
                    className={`${MontseratLight.variable} ${MontseratSemiBold.variable} ${MontserratRegular.variable}`}
                >
                    <Suspense>
                        <Menu />
                        {children}
                        <Footer />
                    </Suspense>
                </body>
            </Providers>
        </html>
    );
}

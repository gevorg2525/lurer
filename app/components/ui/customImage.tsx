"use client";
import Image, { ImageProps } from "next/image";
import { FC, ImgHTMLAttributes, useRef } from "react";

type CustomImageProps = ImageProps & ImgHTMLAttributes<HTMLImageElement>;

const CustomImage: FC<CustomImageProps> = ({ src, ...props }) => {
    const imageRef = useRef<HTMLImageElement>(null);
    const srcLink =
        Boolean(src) && src !== "undefined" ? `https://newsbook.am/${src}` : "/images/blur.avif";
    return (
        <Image
            {...props}
            src={srcLink}
            quality={100}
            ref={imageRef}
            placeholder={"blur"}
            blurDataURL="/images/blur.avif"
            onError={(e) => {
                if (imageRef.current) {
                    imageRef.current.src = "/images/blur.avif";
                }
            }}
        />
    );
};

export default CustomImage;

///telegram x,face

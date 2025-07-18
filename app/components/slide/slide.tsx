"use client";
import { FC } from "react";
import Slider from "react-slick";
import CustomImage from "../ui/customImage";
import classes from "./slide.module.scss";

interface Props {
    images: {
        id: number;
        newsId: number;
        imagePath: string;
        createdAt: string;
        updatedAt: string;
    }[];
}

const Slide: FC<Props> = ({ images }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const list = images.map((el) => {
        return (
            <div key={el.id} className={classes["image_div"]}>
                <CustomImage src={el?.imagePath} alt="img" width={700} height={500} />
            </div>
        );
    });

    return (
        <div className={classes["container"]}>
            {images.length > 1 ? (
                <div className="slider-container">
                    <Slider {...settings}>{list}</Slider>
                </div>
            ) : (
                <div key={images[0]?.id} className={classes["image_div"]}>
                    <CustomImage src={images[0]?.imagePath} alt="img" width={700} height={500} />;
                </div>
            )}
        </div>
    );
};

export default Slide;

import { FC } from "react";
import classes from "./media.module.scss";
import { FacebookShareButton, TelegramShareButton } from "react-share";

import { useAppSelector } from "@/app/redux/reduxHuks";
interface Props {
    id: string | number;
    title: string;
    hashtag?: string;
}

const Media: FC<Props> = ({ id, title, hashtag = "news" }) => {
    const lang = useAppSelector((state) => state.translation.lang);

    const shareUrl = `https://newsbook.am/newsPage/${id}?lang=${lang}`;
    const shareUrTel = `https://t.me/share/url?url=${encodeURIComponent(
        shareUrl
    )}&text=${encodeURIComponent(title)}`;
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
    )}`;

    const shareUrlX = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        `Check out this article: ${title}`
    )}&url=${encodeURIComponent(shareUrl)}&hashtags=News,`;
    const copyToClipboard = () => {
        // navigator.clipboard.writeText(shareUrl);
        alert("Link copied! Paste it in your story or post.");
    };
    return (
        <div className={classes["media"]}>
            {/* <a href={facebookShareUrl} target="_blank" className={classes["socialMedia"]}>
                <FaFacebookF />
            </a> */}
            <FacebookShareButton url={shareUrl} hashtag={`#${hashtag}`}>
                <img src={"/icons/facebook.png"} alt="img" width={24} height={24} />
            </FacebookShareButton>
            <TelegramShareButton url={shareUrl} title={title}>
                <img src={"/icons/telegram.png"} alt="img" width={24} height={24} />
            </TelegramShareButton>
            <img
                src={"/icons/vector.png"}
                onClick={copyToClipboard}
                alt="img"
                width={24}
                height={24}
            />
            {/* <TwitterShareButton url={shareUrl} title={title} hashtags={[hashtag]}>
                <TwitterIcon size={32} round />
            </TwitterShareButton> */}

            {/* <WhatsappShareButton url={shareUrl} title={title}>
                <WhatsappIcon size={32} round />
            </WhatsappShareButton> */}
        </div>
    );
};

export default Media;

"use client";
import { FC, useEffect } from "react";
import classes from "../style/text.module.scss";

const HighlightedText: FC<{
    text: string;
}> = ({ text }) => {
    const processText = (inputText: string) => {
        return inputText.split(/(\{.*?\})/).map((part, index) => {
            // Handle original {} bold text
            if (part.startsWith("{") && part.endsWith("}")) {
                return (
                    <div key={`bold-${index}`} className={classes["text_bold"]}>
                        {part.replace(/\{|\}/g, "")}
                    </div>
                );
            }

            // Process %highlight% and links in remaining parts
            return part.split(/(%[^%]+%)/).map((subPart, subIndex) => {
                // Handle %highlighted% text
                if (subPart.startsWith("%") && subPart.endsWith("%")) {
                    return (
                        <span
                            key={`highlight-${index}-${subIndex}`}
                            className={classes["text_bold_simple"]}
                        >
                            {subPart.replace(/%/g, "")}
                        </span>
                    );
                }

                // Process links in remaining text
                const linkRegex = /(https?:\/\/[^\s]+)/g;
                const linkParts = subPart.split(linkRegex);

                return linkParts.map((linkPart, linkIndex) => {
                    if (linkPart.match(linkRegex)) {
                        return (
                            <a
                                key={`link-${index}-${subIndex}-${linkIndex}`}
                                href={linkPart}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: "#1a73e8",
                                    textDecoration: "underline",
                                    display: "inline", // Make links inline
                                }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {linkPart}
                            </a>
                        );
                    }
                    return (
                        <span
                            key={`text-${index}-${subIndex}-${linkIndex}`}
                            className={classes["description_text"]}
                            style={{ display: "inline" }} // Ensure regular text is inline
                        >
                            {linkPart}
                        </span>
                    );
                });
            });
        });
    };

    return <p className={classes["description_text"]}>{processText(text)}</p>;
};

export default HighlightedText;

// "use client";
// import { FC, useEffect } from "react";
// import classes from "../style/text.module.scss";
// const HighlightedText: FC<{
//     text: string;
// }> = ({ text }) => {

//     const styledText = text.split(/(\{.*?\})/).map((part, index) =>
//         part.startsWith("{") && part.endsWith("}") ? (
//             <span className={classes["text_bold"]} key={index} style={{ fontSize: "1.2em" }}>
//                 {part.replace(/\{|\}/g, "")}
//             </span>
//         ) : (
//             <span key={index} className={classes["description_text"]}>
//                 {part}
//             </span>
//         )
//     );

//     return <p className={classes["description_text"]}>{styledText}</p>;
// };

// export default HighlightedText;

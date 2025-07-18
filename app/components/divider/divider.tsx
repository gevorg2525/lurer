// components/Divider.tsx
import React, { FC } from "react";
import classes from "./divider.module.scss";

interface DividerProps {
    orangeWidth?: string; // Width of the orange section (e.g., "50px")
    blackWidth?: string; // Width of the black section (e.g., "100%")
    height?: string; // Height of the divider (e.g., "4px")
}

const Divider: FC<DividerProps> = ({ height = "4px" }) => {
    return <div className={classes.divider}></div>;
};

export default Divider;

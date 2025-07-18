import { HTMLAttributes, ReactNode } from "react";

import styles from "./Box.module.css";

interface BoxProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    column?: boolean;
    fullWidth?: boolean;
    square?: boolean;
    noWrap?: boolean;
}

export default function Box({ children, column, fullWidth, square, ...props }: BoxProps) {
    const baseStyle = styles.container;
    const incomingClass = props.className && props.className;
    const columnStyle = column && styles.column;
    const fullWidthStyle = fullWidth && styles.fullWidth;
    const borderStyle = square ? styles.square : styles.rounded;

    const classes = [baseStyle, incomingClass, columnStyle, fullWidthStyle, borderStyle]
    .filter(Boolean)
    .join(" ");

    return (
        <div className={classes} style={props.style}>
            {children}
        </div>
    )
}

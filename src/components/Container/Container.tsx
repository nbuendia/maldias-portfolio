import { HTMLAttributes, ReactNode } from "react";
import styles from "./Container.module.css";

interface ContainerProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode;
    column?: boolean;
}

export default function Container({ children, column, ...props }: ContainerProps) {
    const defaultClass = props.className || styles.container;
    const columnStyle = column && styles.column;

    const classes = [defaultClass, columnStyle].filter(Boolean).join(" ");
    
    return (
        <div className={classes} style={props.style}>
            {children}
        </div>
    )
}

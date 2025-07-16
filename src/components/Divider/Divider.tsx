import { HTMLAttributes } from "react";
import styles from "./Divider.module.css";

interface DividerProps extends HTMLAttributes<HTMLElement> {
    inset?: boolean;
    vertical?: boolean;
}

export default function Divider({inset, vertical, ...props}: DividerProps) {
    const orienationClass = vertical ? styles.vertical : styles.horizontal;
    const insetClass = inset ? styles.inset : "";

    const containerClasses = [styles.container, orienationClass, insetClass, props.className]
    .filter(Boolean)
    .join(" ");
    
    return (
        <div className={containerClasses} style={props.style}>
            <hr className={styles.divider} />
        </div>
    )
}

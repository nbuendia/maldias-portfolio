import { HTMLAttributes } from "react";
import styles from "./EllipsisLoader.module.css";

interface EllipsisLoaderProps extends HTMLAttributes<HTMLElement> {}

export default function EllipsisLoader({ ...props }: EllipsisLoaderProps) {
  const classes = props.className && props.className;
  const incomingStyles = props.style && props.style;

  return (
    <pre className={classes} style={incomingStyles}>
      {[". ", ". ", ". "].map((dot, key) => (
        <span key={key} className={styles.ellipsisAnimation} 
          style={{animationDelay: `${key * 0.2}s`}}>
          {dot}
        </span>
      ))}
    </pre>
  )
}

import { HTMLAttributes } from "react";

import styles from "./Icon.module.css";

interface IconProps extends HTMLAttributes<HTMLElement> {
  name: string;
  size?: string;
  color?: string;
}

export default function Icon({ name, size, color, ...props }: IconProps) {
  const baseStyles = styles.container;
  const incomingClasses = props.className && props.className;

  const classes = [baseStyles, incomingClasses].filter(Boolean).join(" ");
    
  const propStyles = {
    ...(size && {fontSize: size}),
    ...(color && {color}),
    ...(props.style && props.style)
  }

    return (
      <span className={`material-symbols-outlined ${classes}`} style={propStyles} onAnimationEnd={props.onAnimationEnd}>
        {name}
      </span>
    )
}

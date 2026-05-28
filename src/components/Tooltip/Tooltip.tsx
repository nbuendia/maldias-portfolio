import { CSSProperties, HTMLAttributes, ReactNode, useEffect, useState } from "react";

import { onMouseEnter, onMouseLeave } from "./utils";

import styles from "./Tooltip.module.css";
import { useTooltip } from "./hooks";

interface TooltipProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  message: string;
  position?: "right" | "left" | "above" | "below",
}

export default function Tooltip({ children, message, position = "below", ...props }: TooltipProps) {
  const {
    isHovering,
    setIsHovering,
    exitHover,
    setExitHover,
    positionSpacing,
  } = useTooltip();

  const defaultClass = styles.container;
  const incomingStyles = props.style && props.style;

  const positionStyle = positionSpacing && {
    ...(position === "right" && {left: positionSpacing, marginLeft: 0}),
    ...(position === "left" && {left: positionSpacing, marginRight: 0}),
    ...(position === "above" && {top: positionSpacing, marginBottom: 0}),
    ...(position === "below" && {top: positionSpacing, marginTop: 0}),
  } as CSSProperties;

  const styling = {
    ...{incomingStyles},
    ...(positionStyle && positionStyle)
  } as CSSProperties;

  const incomingClasses = props.className && props.className;
  const hoveringClasses = isHovering && styles.fadeIn;
  const exitAnimationClasses = exitHover && styles.fadeOut;

  const classes = [defaultClass, incomingClasses, hoveringClasses, exitAnimationClasses]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <span id="children" onMouseEnter={() => onMouseEnter(setIsHovering, setExitHover)} onMouseLeave={() => onMouseLeave(setIsHovering, setExitHover)}>
        {children}
      </span>
      
      <span className={classes} style={styling}>
        {message}
      </span>
    </>
  )
}

import { CSSProperties, HTMLAttributes, ReactNode, useRef } from "react";

import { useTooltip } from "./hooks";
import { onMouseEnter, onMouseLeave } from "./utils";

import styles from "./Tooltip.module.css";

interface TooltipProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  message: string;
  position?: "right" | "left" | "above" | "below",
}

export default function Tooltip({ children, message, position = "below", ...props }: TooltipProps) {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const tooltipKidRefs = useRef<HTMLSpanElement>(null);

  const {
    isHovering,
    setIsHovering,
    exitHover,
    setExitHover,
    positionSpacing,
  } = useTooltip(tooltipRef, tooltipKidRefs, position);

  const defaultClass = styles.container;
  const incomingStyles = props.style && props.style;

  const positionStyle = positionSpacing && {
    ...(position === "right" && {left: positionSpacing, marginLeft: 0}),
    ...(position === "left" && {left: 0, marginRight: 0, width: positionSpacing}),
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
      <span ref={tooltipKidRefs} onMouseEnter={() => onMouseEnter(setIsHovering, setExitHover)} onMouseLeave={() => onMouseLeave(setIsHovering, setExitHover)}>
        {children}
      </span>
      
      <span ref={tooltipRef} className={classes} style={styling}>
        {message}
      </span>
    </>
  )
}

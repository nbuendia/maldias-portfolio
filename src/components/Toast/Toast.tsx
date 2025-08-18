import { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./Toast.module.css";

interface ToastProps {
  children: ReactNode;
  portalId: number | string,
  alignment?: "left" |"right";
  fontSize?: string;
  onClose?: () => void;
}

export default function Toast({ alignment, fontSize = "14px", onClose, children, portalId }: ToastProps) {
  const propStyles = {
    ...(alignment === "right" && {alignSelf: "flex-end"}),
    ...(alignment === "left" && {alignSelf: "flex-start"}),
    ...({fontSize: fontSize})
  } as CSSProperties;

  const fontSizeNum = +fontSize.split("px")[0];
  const padding = 3;

  const buttonStyles = {
    ...{
      top: -fontSizeNum / 2 - padding,
      right: -fontSizeNum / 2,
      padding: padding,
      borderRadius: fontSizeNum / 2 + padding
    } as CSSProperties,
  };

  return createPortal(
    <div className={`${styles.container} ${onClose ? styles.closeButton : ""}`}
      style={propStyles} onClick={onClose}>
      {children}

      {onClose && (
        <span className="material-symbols-outlined" style={buttonStyles}>
          close
        </span>
      )}
    </div>,
    document.body,
    portalId,
  )
}

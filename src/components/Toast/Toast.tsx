import { CSSProperties, ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./Toast.module.css";

interface ToastProps {
  children: ReactNode;
  alignment?: "left" |"right";
  closeButton?: boolean;
  fontSize?: string;
  onClose?: () => void;
}

export default function Toast({ alignment, closeButton, fontSize = "14px", onClose, children }: ToastProps) {
  const propStyles = {
    ...(alignment === "right" && {right: 0}),
    ...(alignment === "left" && {left: 0}),
    ...({fontSize: fontSize})
  };

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
    <div className={`${styles.container} ${closeButton ? styles.closeButton : ""}`}
      style={propStyles} onClick={onClose}>
      {children}

      {closeButton && onClose && (
        <span id="close" className="material-symbols-outlined" style={buttonStyles}>
          close
        </span>
      )}
    </div>,
    document.body,
    )
}

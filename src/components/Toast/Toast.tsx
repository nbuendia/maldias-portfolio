import { ReactNode } from "react";
import { createPortal } from "react-dom";

import styles from "./Toast.module.css";

interface ToastProps {
  children: ReactNode;
}

export default function Toast({ children }: ToastProps) {
  return createPortal(
    <div className={styles.container}>
      {children}
    </div>,
    document.body,
    )
}

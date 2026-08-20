import { ReactNode } from "react";

import styles from "./ToastGroup.module.css";

interface ToastGroupProps {
  children: ReactNode;
}

export default function ToastGroup({ children }: ToastGroupProps) {
  return (
    <div id="toast-group" className={styles.container}>
      {children}
    </div>
  )
}

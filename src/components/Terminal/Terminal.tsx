import { HTMLAttributes, JSX, ReactNode } from "react";

import styles from "./Terminal.module.css";

interface TerminalProps extends HTMLAttributes<HTMLElement> {
  name: string;
  terminalComponentList: { [key: string]: JSX.Element };
  children?: ReactNode;
}

export default function Terminal({ name, terminalComponentList, children, ...props }: TerminalProps) {
  const activeComponent = terminalComponentList[name as keyof typeof terminalComponentList];
  
  const defaultClass = styles.container;
  const incomingClasses = props.className && props.className;

  const classes = [defaultClass, incomingClasses].filter(Boolean).join(" ");
  
  return (
    <div className={classes} style={props.style}>
      <div className={styles.terminal}>
        {activeComponent}
        {children && children}
      </div>
    </div>
  )
}

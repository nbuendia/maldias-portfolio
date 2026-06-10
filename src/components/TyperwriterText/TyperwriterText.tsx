import { HTMLAttributes } from "react";

import { Icon } from "@/components/Icon";

import styles from "./TyperwriterText.module.css";

interface TyperwriterTextProps extends HTMLAttributes<HTMLElement> {
  text: string;
  handleOnAnimationEnd?: () => void;
}

export default function TyperwriterText({ text, handleOnAnimationEnd, ...props }: TyperwriterTextProps) {
  return (
    <pre className={styles.container} onAnimationEnd={handleOnAnimationEnd}>
      <Icon name="terminal_2" size="16px" color="green" className={styles.icon} />
      
      {text.split("").map((letter, idx) => (
        <span key={idx} className={styles.letter} style={{animationDelay: `${idx * 0.1}s`}}>
          {letter}
        </span>
      ))}
    </pre>
  )
}

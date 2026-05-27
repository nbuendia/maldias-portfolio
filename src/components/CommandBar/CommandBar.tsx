import { useEffect, useRef } from "react";

import { useCommandBar } from "./hooks";

import styles from "./CommandBar.module.css";

interface CommandBarProps {
  onCommand: (cmd: string) => void;
}

export default function CommandBar({ onCommand }: CommandBarProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const {
    input,
    handleKeyDown,
    caretPosition,
  } = useCommandBar(onCommand);

  const before = input.slice(0, caretPosition);
  const active = input[caretPosition];
  const after = input.slice(caretPosition + 1);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className={styles.container}>
      <span className={styles.prompt}>NB C:\BuendiaBytes::</span>

      <div className={styles.commandInput} ref={inputRef} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
        <span className={styles.commandInputText}>
          {before}
          <span className={styles.activeLetter}>{active}</span>
          {after}
          <span className={`${input.length === caretPosition ? styles.caret : ''}`}> </span>
        </span>
      </div>
    </div>
  );
}

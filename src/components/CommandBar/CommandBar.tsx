import { useEffect, useRef } from "react";

import { useCommandBar } from "./hooks";

import styles from "./CommandBar.module.css";

interface CommandBarProps {
  value: string;
  onChange: (input: string) => void;
  onCommand: (cmd: string) => void;
}

export default function CommandBar({ value, onChange, onCommand }: CommandBarProps) {
  const inputRef = useRef<HTMLDivElement>(null);
  const { handleKeyDown, caretPosition } = useCommandBar(value, onChange, onCommand);

  const before = value.slice(0, caretPosition);
  const active = value[caretPosition];
  const after = value.slice(caretPosition + 1);

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
          <span className={`${value.length === caretPosition ? styles.caret : ''}`}> </span>
        </span>
      </div>
    </div>
  );
}

import { useRef } from "react";

import { useCaret, useCommandBar } from "./hooks";

import styles from "./CommandBar.module.css";

interface CommandBarProps {
  input: string;
  onChange: (input: string) => void;
  onCommand: (cmd: string) => void;
}

export default function CommandBar({ input, onChange, onCommand }: CommandBarProps) {
  const inputRef = useRef<HTMLDivElement>(null);

  const { handleKeyDown, caretPosition } = useCommandBar(input, onChange, onCommand);
  const { activeCaret } = useCaret(inputRef);

  const before = input.slice(0, caretPosition);
  const active = input[caretPosition];
  const after = input.slice(caretPosition + 1);

  const caretClass = input.length === caretPosition && activeCaret ? styles.caret : "";
  const activeLetterClass = activeCaret ? styles.activeLetter : styles.activeLetterNoFocus;

  return (
    <div className={styles.container}>
      <span className={styles.prompt}>NB C:\BuendiaBytes::</span>

      <div className={styles.commandInput} ref={inputRef} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
        <span className={styles.commandInputText}>
          {before}
          <span className={activeLetterClass}>{active}</span>
          {after}
          <span className={caretClass}> </span>
        </span>
      </div>
    </div>
  );
}

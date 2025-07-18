import { useEffect, useRef } from "react";

import { useCommandBar } from "@/hooks";

import styles from "./CommandBar.module.css";

interface CommandBarProps {
    onCommand: (cmd: string) => void;
}

export default function CommandBar({ onCommand }: CommandBarProps) {
    const inputRef = useRef<HTMLDivElement>(null);
    const { input, handleKeyDown } = useCommandBar(onCommand);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
      <div className={styles.container}>
        <span className={styles.prompt}>NB C:\BuendiaBytes::</span>

        <div className={styles.commandInput} ref={inputRef}  tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
            <span>{input}</span>
            <span className={styles.caret}> </span>
        </div>
      </div>
    );
}

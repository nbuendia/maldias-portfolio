import { KeyboardEvent, useEffect, useRef, useState } from "react";

import { MAX_LENGTH } from "@/lib/constants";

import styles from "./CommandBar.module.css";

interface CommandBarProps {
    onCommand: (cmd: string) => void;
}

export default function CommandBar({ onCommand }: CommandBarProps) {
    const inputRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState('');

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    function handleEnter(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Enter") {
            event.preventDefault();
            
            onCommand(input.trim());
            setInput('');
        }
    }

    function handleBackspace(event: KeyboardEvent<HTMLDivElement>) {
        if (event.key === "Backspace") {
            event.preventDefault();
            setInput((prev) => prev.slice(0, -1));
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
        event.preventDefault();
        const char = event.key.length === 1 ? event.key : '';
        
        if (input.length < MAX_LENGTH) setInput((prev) => prev + char);

        handleEnter(event);
        handleBackspace(event);
    }

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

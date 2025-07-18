import { KeyboardEvent } from "react";

export function handleEnter(
    event: KeyboardEvent<HTMLDivElement>,
    cmd: string,
    onCommand: (cmd: string) => void,
    clearInput: () => void,
) {
    if (event.key === "Enter") {
        event.preventDefault();
        
        onCommand(cmd.trim());
        clearInput();
    }
}

export function handleBackspace(
    event: KeyboardEvent<HTMLDivElement>,
    updateInput: (next: string) => void,
    currentInput: string,
) {
    if (event.key === "Backspace") {
        event.preventDefault();
        updateInput(currentInput.slice(0, -1));
    }
}

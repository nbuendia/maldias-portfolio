import { KeyboardEvent } from "react";

export function handleEnter(
  event: KeyboardEvent<HTMLDivElement>,
  cmd: string,
  onCommand: (cmd: string) => void,
  clearInput: () => void,
  setCaretPosition: (position: number) => void,
) {
  if (event.key === "Enter") {
    event.preventDefault();
        
    onCommand(cmd.trim());
    clearInput();
    setCaretPosition(0);
  }
}

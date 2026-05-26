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

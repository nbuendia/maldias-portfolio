import { KeyboardEvent } from "react";

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

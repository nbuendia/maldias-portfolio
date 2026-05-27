import { KeyboardEvent } from "react";

export function handleBackspace(
  event: KeyboardEvent<HTMLDivElement>,
  input: string,
  setInput: (input: string) => void,
  caretPosition: number,
  setCaretPosition: (position: number) => void,
) {
  if (event.key === "Backspace") {
    event.preventDefault();
    
    if (caretPosition !== 0) {
      let newInput = input.split("");
      newInput.splice(caretPosition - 1, 1);
      
      setInput(newInput.join(""));
      setCaretPosition(caretPosition - 1);
    }
  }
}

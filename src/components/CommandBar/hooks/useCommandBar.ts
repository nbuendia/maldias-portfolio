import { KeyboardEvent, useState } from "react";
import { 
  handleBackspace,
  handleEnter,
  handleArrowLeft,
  handleArrowRight,
} from "../actions";
import { handleInsertChar } from "../utils";

export function useCommandBar(
  value: string,
  onChange: (input: string) => void,
  onCommand: (cmd: string) => void)
  {
  const [caretPosition, setCaretPosition] = useState(value.length)

  // MIGHT DELETE IN THE FUTURE
  const MAX_LENGTH = 250;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const char = event.key.length === 1 ? event.key : '';
        
    if (char && value.length < MAX_LENGTH) 
      handleInsertChar(char, value, onChange, caretPosition, setCaretPosition);

    handleEnter(event, value, onCommand, onChange, setCaretPosition);
    handleBackspace(event, value, onChange, caretPosition, setCaretPosition);
    handleArrowLeft(event, caretPosition, setCaretPosition);
    handleArrowRight(event, value, caretPosition, setCaretPosition);
  }

  return {
    handleKeyDown,
    caretPosition,
  };
}

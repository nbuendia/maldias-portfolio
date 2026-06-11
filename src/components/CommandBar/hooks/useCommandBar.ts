import { KeyboardEvent, useEffect, useState } from "react";
import { 
  handleBackspace,
  handleEnter,
  handleArrowLeft,
  handleArrowRight,
} from "../actions";
import { handleInsertChar } from "../utils";

export function useCommandBar(
  input: string,
  onChange: (input: string) => void,
  onCommand: (cmd: string) => void)
  {
  const [caretPosition, setCaretPosition] = useState(input.length);

  useEffect(() => {
    if (input.length === 0) setCaretPosition(0);
  });

  // MIGHT DELETE IN THE FUTURE
  const MAX_LENGTH = 250;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const char = event.key.length === 1 ? event.key : '';
        
    if (char && input.length < MAX_LENGTH) 
      handleInsertChar(char, input, onChange, caretPosition, setCaretPosition);

    handleEnter(event, input, onCommand, onChange, setCaretPosition);
    handleBackspace(event, input, onChange, caretPosition, setCaretPosition);
    handleArrowLeft(event, caretPosition, setCaretPosition);
    handleArrowRight(event, input, caretPosition, setCaretPosition);
  }

  return {
    handleKeyDown,
    caretPosition,
  };
}

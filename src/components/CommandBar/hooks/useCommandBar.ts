import { KeyboardEvent, useState } from "react";
import { 
  handleBackspace,
  handleEnter,
  handleArrowLeft,
  handleArrowRight,
} from "../actions";
import { handleInsertChar } from "../utils";

export function useCommandBar(onCommand: (cmd: string) => void) {
  const [input, setInput] = useState('');
  const [caretPosition, setCaretPosition] = useState(input.length)

  // MIGHT DELETE IN THE FUTURE
  const MAX_LENGTH = 250;

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const char = event.key.length === 1 ? event.key : '';
        
    if (char && input.length < MAX_LENGTH) 
      handleInsertChar(char, input, setInput, caretPosition, setCaretPosition);

    handleEnter(event, input, onCommand, setInput, setCaretPosition);
    handleBackspace(event, input, setInput, caretPosition, setCaretPosition);
    handleArrowLeft(event, caretPosition, setCaretPosition);
    handleArrowRight(event, input, caretPosition, setCaretPosition);
  }

  return {
    input,
    handleKeyDown,
    caretPosition,
  };
}

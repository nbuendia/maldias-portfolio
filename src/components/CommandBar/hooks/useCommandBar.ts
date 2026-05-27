import { KeyboardEvent, SetStateAction, useCallback, useEffect, useState } from "react";
import { 
  handleBackspace,
  handleEnter,
  handleArrowLeft,
  handleArrowRight,
} from "../actions";

export function useCommandBar(onCommand: (cmd: string) => void) {
  const [input, setInput] = useState('');
  const [caretPosition, setCaretPosition] = useState(input.length)

  // MIGHT DELETE IN THE FUTURE
  const MAX_LENGTH = 250;

  const handleSetInput = useCallback((state: SetStateAction<string>) => {
    setInput(state);
  }, []);
  
  const handleInsertChar = useCallback((char: string) => {
    let newInput = input.split("");
    newInput.splice(caretPosition, 0, char);
      
    setInput(newInput.join(""));
    setCaretPosition(caretPosition + 1);
  }, [input, caretPosition]);
  
  const handleClearInput = useCallback(() => {
    setInput('');
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const char = event.key.length === 1 ? event.key : '';
        
    if (char && input.length < MAX_LENGTH) handleInsertChar(char);

    handleEnter(event, input, onCommand, handleClearInput);
    handleBackspace(event, input, handleSetInput, caretPosition, setCaretPosition);
    handleArrowLeft(event, caretPosition, setCaretPosition);
    handleArrowRight(event, input, caretPosition, setCaretPosition);
  }

  return {
    input,
    handleKeyDown,
    caretPosition,
  };
}

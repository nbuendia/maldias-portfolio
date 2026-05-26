import { KeyboardEvent, SetStateAction, useCallback, useState } from "react";
import { handleBackspace, handleEnter } from "../actions";

export function useCommandBar(onCommand: (cmd: string) => void) {
  const [input, setInput] = useState('');

  // MIGHT DELETE IN THE FUTURE
  const MAX_LENGTH = 250;

  const handleSetInput = useCallback((state: SetStateAction<string>) => {
    setInput(state);
  }, []);
  
  const handleAppendChar = useCallback((char: SetStateAction<string>) => {
    setInput(input + char);
  }, [input]);
  
  const handleClearInput = useCallback(() => {
    setInput('');
  }, []);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const char = event.key.length === 1 ? event.key : '';
        
    if (char && input.length < MAX_LENGTH) handleAppendChar(char);
    
    handleEnter(event, input, onCommand, handleClearInput);
    handleBackspace(event, handleSetInput, input);
  }

  return { input, handleKeyDown };
}

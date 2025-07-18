import { useCallback, KeyboardEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setInput } from "@/features/CommandBar";
import { MAX_LENGTH } from "@/lib/constants";
import { handleBackspace, handleEnter } from "@/lib/utils";

export function useCommandBar(onCommand: (cmd: string) => void) {
  const dispatch = useDispatch();
  const input = useSelector((state: RootState) => state.commandBarSlice.cmd);

  const handleSetInput = useCallback((state: string) => {
    dispatch(setInput(state));
  }, [dispatch]);

  const handleAppendChar = useCallback((char: string) => {
    dispatch(setInput(input + char));
  }, [dispatch, input]);

  const handleClearInput = useCallback(() => {
    dispatch(setInput(''));
  }, [dispatch]);


  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const char = event.key.length === 1 ? event.key : '';
    
    if (char && input.length < MAX_LENGTH) handleAppendChar(char);

    handleEnter(event, input, onCommand, handleClearInput);
    handleBackspace(event, handleSetInput, input);
  }
  
  return { input, handleKeyDown };
}

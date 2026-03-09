import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { useToast } from "@/hooks";
import { setTerminal } from "@/features/Terminal";

import { TERMINAL_VIEWS } from "@/lib/constants";

export function useTerminal() {
  const dispatch = useDispatch();
  const { handleToast } = useToast();

  const terminal = useSelector((state: RootState) => state.terminalSlice.terminal);

  const handleTerminalView = useCallback((terminal: string) => {
    const isInTerminalList = TERMINAL_VIEWS.includes(terminal) && terminal;

    if (isInTerminalList) dispatch(setTerminal(terminal));

    else if (!isInTerminalList) handleToast(`Unknown action was entered: ${terminal}`);
  }, [dispatch, handleToast]);
  
  return { terminal, handleTerminalView };
}

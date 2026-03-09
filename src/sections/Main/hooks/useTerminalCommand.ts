import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setTerminal } from "@/features/Terminal";
// REMOVE ABOUT-ME-TXT FROM HERE
import { useAboutMeTxt, useToast } from "@/hooks";

import { TERMINAL_VIEWS } from "@/lib/constants";
import { useContactCommand } from "./useContactCommand";
import { RootState } from "@/store";

export function useTerminalCommand() {
  const dispatch = useDispatch();
  const { handleToast } = useToast();
  const { handleContactCommand } = useContactCommand();
  const { handleAboutCommand } = useAboutMeTxt();

  const terminal = useSelector((state: RootState) => state.terminalSlice.terminal);

  const handleTerminalView = useCallback((terminal: string) => {
    const isInTerminalList = TERMINAL_VIEWS.includes(terminal) && terminal;

    if (isInTerminalList) dispatch(setTerminal(terminal));

    else if (!isInTerminalList) handleToast(`Unknown action was entered: ${terminal}`);
  }, [dispatch, handleToast]);
  
  function handleCommand(cmd: string) {
    const runMatch = cmd.match(/^run (.+)$/i);
    const terminalMatch = runMatch && runMatch[1].toLowerCase();

    if (runMatch && terminalMatch) handleTerminalView(terminalMatch);

    switch (terminal) {
      case "about":
        handleAboutCommand(cmd);
        break;
      case "projects":
        // handleProjectsCommand(cmd);
        break;
      case "contact":
        handleContactCommand(cmd);
        break;
      default:
        break;
    }
  }

  return {
    terminal,
    handleCommand,
  }
}

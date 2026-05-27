import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { NoEmailPrompts,
  SendEmailPrompts,
  setNoEmailPrompts,
  setSendEmailPrompts,
  setYesEmailPrompts,
  YesEmailPrompts,
} from "@/features/ContactMe";

import { useEllipsis, useToast } from "@/hooks";

import {
  triggerNoEmailAction,
  triggerResetEmailPrompt,
  triggerYesEmailAction,
} from "@/sections/Contact/utils";

import { TERMINAL_VIEWS } from "@/lib/constants";

export function useContactCommand() {
  const dispatch = useDispatch();
  const { handleToast } = useToast();
  const { handleShowEllipsis } = useEllipsis();

  const showEmailSection = useSelector((state: RootState) => state.contactMeSlice.showEmailSection);
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);  
  const noEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.noEmailPrompts);

  const handleSendEmailPrompts = useCallback((key: keyof SendEmailPrompts, value: boolean) => {
    dispatch(setSendEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleNoEmailPrompts = useCallback((key: keyof NoEmailPrompts, value: boolean) => {
    dispatch(setNoEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);

  function handleContactCommand(cmd: string) {
    if (!showEmailSection) return;

    if (cmd.toLowerCase() === "n")
      triggerNoEmailAction(yesEmailPrompts, handleSendEmailPrompts, handleNoEmailPrompts);

    else if (cmd.toLowerCase() === "y")
      triggerYesEmailAction(noEmailPrompts, handleSendEmailPrompts, handleYesEmailPrompts);
    
    else if (cmd.toLowerCase().startsWith("--reset") && noEmailPrompts.triggerNoEmail) 
      triggerResetEmailPrompt(handleShowEllipsis, handleNoEmailPrompts, handleSendEmailPrompts);

    else {
      // REFACTOR THIS MESS
      const runMatch = cmd.match(/^run (.+)$/i);
      const terminal = runMatch && runMatch[1].toLowerCase();
      const isValid = terminal && TERMINAL_VIEWS.includes(terminal);

      if (!isValid) handleToast(`Unknown command was entered: ${cmd}`);
    }
  }

  return {
    handleContactCommand,
  }
}

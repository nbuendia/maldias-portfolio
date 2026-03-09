import { useCallback, useEffect } from "react";
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
} from "@/lib/utils";

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

    if (cmd === "n" || cmd === "N")
      triggerNoEmailAction(yesEmailPrompts, handleSendEmailPrompts, handleNoEmailPrompts);

    else if (cmd === "y" || cmd === "Y")
      triggerYesEmailAction(noEmailPrompts, handleSendEmailPrompts, handleYesEmailPrompts);
    
    else if (cmd.startsWith("--reset") && noEmailPrompts.triggerNoEmail) 
      triggerResetEmailPrompt(handleShowEllipsis, handleNoEmailPrompts, handleSendEmailPrompts);

    // WHEN RUN RUNNING OTHER COMMANDS, IT TRIGGERS ERROR TOAST AFTER N OR Y HAS BEEN ENTERED
    else
      handleToast(`Unknown command was entered: ${cmd}`);
  }

  return {
    handleContactCommand,
  }
}

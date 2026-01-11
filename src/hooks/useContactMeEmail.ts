import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  setShowEmailSection,
  setCurrentContactIndex,
  setNoEmailPrompts,
  setYesEmailPrompts,
  YesEmailPrompts,
  NoEmailPrompts,
  setShowEllipsis,
  SendEmailPrompts,
  setSendEmailPrompts,
} from "@/features/ContactMe";

import {
  triggerNoEmailAction,
  triggerResetEmailPrompt,
  triggerYesEmailAction,
} from "@/lib/utils";

import { useToast } from "./useToast";

export function useContactMeEmail() {
  const dispatch = useDispatch();
  const showEmailSection = useSelector((state: RootState) => state.contactMeSlice.showEmailSection);
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);
  const sendEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.sendEmailPrompts);  
  const noEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.noEmailPrompts);  
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);  
  const showEllipsis = useSelector((state: RootState) => state.contactMeSlice.showEllipsis);
  const { handleToast } = useToast();

  const handleContactStateReset = useCallback(() => {
    const sendEmailPromptReset = {
      sendEmailPrompt: false,
      triggerEmailAnimation: false,
    } as SendEmailPrompts;

    const noEmailPromptReset = {
      triggerNoEmail: false,
    } as NoEmailPrompts;

    const yesEmailPromptReset = {
      triggerYesEmail: false,
    } as YesEmailPrompts;

    dispatch(setShowEmailSection(false));
    dispatch(setCurrentContactIndex(-1));
    dispatch(setSendEmailPrompts(sendEmailPromptReset));
    dispatch(setNoEmailPrompts(noEmailPromptReset));
    dispatch(setYesEmailPrompts(yesEmailPromptReset));
  }, [dispatch]);

  const handleSendEmailPrompts = useCallback((key: keyof SendEmailPrompts, value: boolean) => {
    dispatch(setSendEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleNoEmailPrompts = useCallback((key: keyof NoEmailPrompts, value: boolean) => {
    dispatch(setNoEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleShowEllipsis = useCallback((state: boolean) => {
    dispatch(setShowEllipsis(state));
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

  const triggerBlurAction = () => {
    handleYesEmailPrompts("triggerEmailBlurAnimation", true);
  }

  useEffect(() => {
    const emailSectionTimeout = setTimeout(() => {
      if (currentContactIndex === 3) {
        dispatch(setShowEmailSection(true));
        handleSendEmailPrompts("sendEmailPrompt", true);
      }
    }, 3500);
  
    return () => clearTimeout(emailSectionTimeout);
  }, [dispatch, currentContactIndex, handleSendEmailPrompts]);

  return {showEmailSection, sendEmailPrompts, noEmailPrompts, yesEmailPrompts, showEllipsis, handleContactCommand, triggerBlurAction, handleContactStateReset};
}

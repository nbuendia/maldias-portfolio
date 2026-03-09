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
  SendEmailPrompts,
  setSendEmailPrompts,
} from "@/features/ContactMe";

import { setShowEllipsis } from "@/features/Ellipsis";

export function useContactMeEmail() {
  const dispatch = useDispatch();

  const showEmailSection = useSelector((state: RootState) => state.contactMeSlice.showEmailSection);
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);
  const sendEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.sendEmailPrompts);  
  const noEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.noEmailPrompts);  
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);  
  const displayForm = useSelector((state: RootState) => state.emailFormSlice.displayForm);

  const handleContactStateReset = useCallback(() => {
    const sendEmailPromptReset = {
      sendEmailPrompt: false,
      triggerEmailAnimation: false,
      sentEmailConfrimation: false,
    } as SendEmailPrompts;

    const noEmailPromptReset = {
      triggerNoEmail: false,
      noEmailResetIsLoading: false,
    } as NoEmailPrompts;

    const yesEmailPromptReset = {
      triggerYesEmail: false,
      triggerEmailBlurAnimation: false,
    } as YesEmailPrompts;

    dispatch(setShowEmailSection(false));
    dispatch(setCurrentContactIndex(-1));
    dispatch(setShowEllipsis(false));
    dispatch(setSendEmailPrompts(sendEmailPromptReset));
    dispatch(setNoEmailPrompts(noEmailPromptReset));
    dispatch(setYesEmailPrompts(yesEmailPromptReset));
  }, [dispatch]);

  const handleSendEmailPrompts = useCallback((key: keyof SendEmailPrompts, value: boolean) => {
    dispatch(setSendEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const triggerBlurAction = () => {
    handleYesEmailPrompts("triggerEmailBlurAnimation", true);
  }

  useEffect(() => {
    const emailSectionTimeout = setTimeout(() => {
      if (currentContactIndex === 3) {
        dispatch(setShowEmailSection(true));
        handleSendEmailPrompts("sendEmailPrompt", true);
        dispatch(setCurrentContactIndex(4));
      }
    }, 3500);
  
    return () => clearTimeout(emailSectionTimeout);
  }, [dispatch, displayForm, currentContactIndex, handleSendEmailPrompts]);

  return {
    showEmailSection,
    sendEmailPrompts,
    noEmailPrompts,
    yesEmailPrompts,
    handleYesEmailPrompts,
    triggerBlurAction,
    handleContactStateReset,
  };
}

import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  setShowContactInfo,
  setShowContactInfoSection,
  setShowEmailSection,
  setSendEmailPrompts,
  setNoEmailPrompts,
  setYesEmailPrompts,
  YesEmailPrompts,
  NoEmailPrompts,
  SendEmailPrompts,
} from "@/features/ContactMe";
import { setShowEllipsis } from "@/features/Ellipsis";

export function useContactReset() {
  const dispatch = useDispatch();

  const sendEmailPromptReset = {
    sendEmailPrompt: false,
    triggerEmailAnimation: false,
  } as SendEmailPrompts;
  
  const noEmailPromptReset = {
    triggerNoEmail: false,
    noEmailResetIsLoading: false,
  } as NoEmailPrompts;
  
  const yesEmailPromptReset = {
    triggerYesEmail: false,
    triggerEmailBlurAnimation: false,
  } as YesEmailPrompts;

  const handleContactStateReset = useCallback(() => {
    dispatch(setShowContactInfoSection(false));
    dispatch(setShowContactInfo(false));
    dispatch(setShowEmailSection(false));
    dispatch(setShowEllipsis(false));
    dispatch(setSendEmailPrompts(sendEmailPromptReset));
    dispatch(setNoEmailPrompts(noEmailPromptReset));
    dispatch(setYesEmailPrompts(yesEmailPromptReset));
  }, [dispatch]);

  return { handleContactStateReset };
}

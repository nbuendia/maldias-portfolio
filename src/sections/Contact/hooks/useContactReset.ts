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

  const handleContactStateReset = useCallback(() => {
    const sendEmailPromptReset: SendEmailPrompts = {
      sendEmailPrompt: false,
      triggerEmailAnimation: false,
      sentEmailConfrimation: false // MIGHT NEED TO REMOVE THIS
    };

    const noEmailPromptReset: NoEmailPrompts = {
      triggerNoEmail: false,
      noEmailResetIsLoading: false,
    };

    const yesEmailPromptReset: YesEmailPrompts = {
      triggerYesEmail: false,
      triggerEmailBlurAnimation: false,
    };

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

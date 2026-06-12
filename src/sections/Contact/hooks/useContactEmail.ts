import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setSendEmailPrompts,
  setShowEmailSection,
  setYesEmailPrompts,
  SendEmailPrompts,
} from "@/features/ContactMe";
import { useContactState } from "./useContactState";

export function useContactEmail() {
  const dispatch = useDispatch();
  const {showContactInfo, sendEmailPrompts} = useContactState();

  const handleSendEmailPrompts = useCallback((key: keyof SendEmailPrompts, value: boolean) => {
    dispatch(setSendEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleBlurAction = useCallback(() => {
    dispatch(setYesEmailPrompts({"triggerEmailBlurAnimation": true}));
  }, [dispatch]);

  // MAYBE MOVE TO A HIGHER COMPONENT, HOME?
  useEffect(() => {
    const hasSentEmail = localStorage.getItem("email");
    
    if (hasSentEmail) {
      const today = new Date();
      const emailExpiryDate = new Date(JSON.parse(hasSentEmail).sentDateExpiry);
      
      if (today > emailExpiryDate) localStorage.removeItem("email");
      else handleSendEmailPrompts("sentEmailConfrimation", true);
    }
  }, [handleSendEmailPrompts]);

  useEffect(() => {
    if (!showContactInfo) return;

    const showEmailSectionTimeout = setTimeout(() => {
      dispatch(setShowEmailSection(true));

      if (!sendEmailPrompts.sentEmailConfrimation) handleSendEmailPrompts("sendEmailPrompt", true);
    }, 2000);

    return () => clearTimeout(showEmailSectionTimeout);
  }, [dispatch, showContactInfo, handleSendEmailPrompts, sendEmailPrompts.sentEmailConfrimation]);

  return { handleBlurAction };
}

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  setCurrentContactIndex,
  setSendEmailPrompts,
  setShowEmailSection,
  setYesEmailPrompts,
  SendEmailPrompts,
} from "@/features/ContactMe";
import { useContactState } from "./useContactState";

export function useContactEmail() {
  const dispatch = useDispatch();
  const {sendEmailPrompts} = useContactState();
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);
  const displayForm = useSelector((state: RootState) => state.emailFormSlice.displayForm);

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
  }, []);

  // DONT LIKE THIS USEEFFECT. REFACTOR LATER
  useEffect(() => {
    const emailSectionTimeout = setTimeout(() => {
      if (currentContactIndex === 3) {
        dispatch(setShowEmailSection(true));
        dispatch(setCurrentContactIndex(4));

        if (!sendEmailPrompts.sentEmailConfrimation)
          handleSendEmailPrompts("sendEmailPrompt", true);
      }
    }, 3500);
    
    return () => clearTimeout(emailSectionTimeout);
  }, [dispatch, displayForm, currentContactIndex, handleSendEmailPrompts]);

  return { handleBlurAction };
}

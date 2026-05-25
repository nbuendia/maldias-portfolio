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

export function useContactEmail() {
  const dispatch = useDispatch();
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);
  const displayForm = useSelector((state: RootState) => state.emailFormSlice.displayForm);

  const handleSendEmailPrompts = useCallback((key: keyof SendEmailPrompts, value: boolean) => {
    dispatch(setSendEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleBlurAction = useCallback(() => {
    dispatch(setYesEmailPrompts({"triggerEmailBlurAnimation": true}));
  }, [dispatch]);

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

  return { handleBlurAction };
}

import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { YesEmailPrompts } from "@/features/ContactMe";
import { NoEmailPrompts } from "@/features/ContactMe/ContactMe";

export function triggerResetEmailPrompt(
  handleNoEmailPrompts: (key: keyof NoEmailPrompts, value: boolean) => void,
  handleEmailPromptsReset: () => void,
  handleContactPromptsReset: () => void,
) {
  handleEmailPromptsReset();

  const noEmailResetIsLoadingTimeout = setTimeout(() =>
    handleNoEmailPrompts("noEmailResetIsLoading", false), 2000);

  const noEmailResetTimeout = setTimeout(() =>
    handleContactPromptsReset(), 3000);

  return () => {
    clearTimeout(noEmailResetIsLoadingTimeout);
    clearTimeout(noEmailResetTimeout);
  }
}

export function triggerNoEmailAction(
  dispatch: Dispatch,
  yesEmailPrompts: YesEmailPrompts,
  setTriggerEmailAnimation: (state: boolean) => PayloadAction,
  handleNoEmailPrompts: (key: keyof NoEmailPrompts, value: boolean) => void,
) {
  if (yesEmailPrompts.triggerYesEmail) return;
  dispatch(setTriggerEmailAnimation(true));
          
  const triggerNoEmailTimeout = setTimeout(() =>
    handleNoEmailPrompts("triggerNoEmail", true), 2000);
        
  return () => clearTimeout(triggerNoEmailTimeout);
}

export function triggerYesEmailAction(
  dispatch: Dispatch,
  noEmailPrompts: NoEmailPrompts,
  setTriggerEmailAnimation: (state: boolean) => PayloadAction,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
) {
  if (noEmailPrompts.triggerNoEmail) return;
  dispatch(setTriggerEmailAnimation(true));
        
  const YesEmailPromptsTimeout = setTimeout(() =>
    handleYesEmailPrompts("triggerYesEmail", true), 2000);
  
  return () => clearTimeout(YesEmailPromptsTimeout);
}

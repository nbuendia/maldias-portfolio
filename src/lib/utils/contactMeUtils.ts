import { Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { UserInfo, YesEmailPrompts } from "@/features/ContactMe";
import { EMAIL_REGEX, MESSAGE_REGEX } from "@/lib/constants";

export function triggerConfirmationPromptAction(
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
) {
  handleYesEmailPrompts("triggerCheckAnimation", true);

  setTimeout(() =>
    handleYesEmailPrompts("showConfirmPrompt", true), 2000);
}

export function triggerPromptResetAction(
  cmd: string,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
  handleContactPromptsReset: () => void,
) {
  handleYesEmailPrompts("triggerCheckAnimation", false);
  handleYesEmailPrompts("triggerCheckAnimation", true);
      
  const contactPromptsResetTimeout = setTimeout(() => {
    cmd = 'y';
    handleContactPromptsReset();
  }, 2000);

  return () => clearTimeout(contactPromptsResetTimeout);
}

export function triggerNoEmailAction(
  dispatch: Dispatch,
  yesEmailPrompts: YesEmailPrompts,
  setTriggerEmailAnimation: (state: boolean) => PayloadAction,
  setTriggerNoEmail: (state: boolean) => PayloadAction,
) {
  if (yesEmailPrompts.triggerYesEmail) return;
  dispatch(setTriggerEmailAnimation(true));
          
  const triggerNoEmailTimeout = setTimeout(() =>
    dispatch(setTriggerNoEmail(true)), 2000);
        
  return () => clearTimeout(triggerNoEmailTimeout);
}

export function triggerYesEmailAction(
  dispatch: Dispatch,
  setTriggerEmailAnimation: (state: boolean) => PayloadAction,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
) {
  dispatch(setTriggerEmailAnimation(true));
        
  const YesEmailPromptsTimeout = setTimeout(() =>
    handleYesEmailPrompts("triggerYesEmail", true), 2000);
  
  return () => clearTimeout(YesEmailPromptsTimeout);
}

export function triggerEmailPromptAction(
  userInfo: UserInfo,
  cmd: string,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
  handleSetUserInfo: (key: keyof UserInfo, value: string) => void,
) {
  if (userInfo.userEmail) return;

  handleYesEmailPrompts("userEmailResponseIsLoading", true);
  const email = cmd.match(EMAIL_REGEX);
    
  if (email) {
    handleYesEmailPrompts("emailError", false);
    handleSetUserInfo("userEmail", email[2]);
    
    const userResponseIsLoadingTimeout = setTimeout(() =>
      handleYesEmailPrompts("userEmailResponseIsLoading", false), 2000);

    const showMsgPromptTimeout = setTimeout(() =>
      handleYesEmailPrompts("showMsgPrompt", true), 3000);

    return () => {
      clearTimeout(userResponseIsLoadingTimeout);
      clearTimeout(showMsgPromptTimeout);
    }
  } else if (!email) {
    const userResponseIsLoadingTimeout = setTimeout(() =>
      handleYesEmailPrompts("userEmailResponseIsLoading", false), 2000);
    
    const emailErrorTimeout = setTimeout(() =>
      handleYesEmailPrompts("emailError", true), 2000); 

    return () => {
      clearTimeout(userResponseIsLoadingTimeout);
      clearTimeout(emailErrorTimeout);
    }
  }
}

export function triggerMessagePromptAction(
  userInfo: UserInfo,
  cmd: string,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
  handleSetUserInfo: (key: keyof UserInfo, value: string) => void,
) {
  if (userInfo.userMsg) return;
    
  handleYesEmailPrompts("userMsgResponseIsLoading", true);
  const msg = cmd.match(MESSAGE_REGEX);

  if (msg) {
    handleYesEmailPrompts("msgError", false);
    handleSetUserInfo("userMsg", msg[2]);

    const userResponseIsLoadingTimeout = setTimeout(() =>
      handleYesEmailPrompts("userMsgResponseIsLoading", false), 2000);

    const showCheckPromptTimeout = setTimeout(() =>
      handleYesEmailPrompts("showCheckPrompt", true), 3000);

    return () => {
      clearTimeout(userResponseIsLoadingTimeout);
      clearTimeout(showCheckPromptTimeout);
    }
  } else if (!msg) {
    const userResponseIsLoadingTimeout = setTimeout(() =>
      handleYesEmailPrompts("userMsgResponseIsLoading", false), 2000);
    
    const msgErrorTimeout = setTimeout(() =>
      handleYesEmailPrompts("msgError", true), 2000); 

    return () => {
      clearTimeout(userResponseIsLoadingTimeout);
      clearTimeout(msgErrorTimeout);
    }
  }
}

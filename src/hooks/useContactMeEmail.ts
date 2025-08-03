import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  setShowEmailSection,
  setCurrentContactIndex,
  setTriggerNoEmail,
  setTriggerEmailAnimation,
  setYesEmailPrompts,
  setUserInfo,
  UserInfo,
  YesEmailPrompts,
  setNoEmailResetIsLoading,
} from "@/features/ContactMe";

import { useToast } from "./useToast";

import {
  triggerConfirmationPromptAction,
  triggerEmailPromptAction,
  triggerMessagePromptAction,
  triggerNoEmailAction,
  triggerPromptResetAction,
  triggerResetEmailPrompt,
  triggerYesEmailAction,
} from "@/lib/utils";

export function useContactMeEmail() {
  const dispatch = useDispatch();
  const showEmailSection = useSelector((state: RootState) => state.contactMeSlice.showEmailSection);
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);
  const triggerNoEmail = useSelector((state: RootState) => state.contactMeSlice.triggerNoEmail);
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);
  const triggerEmailAnimation = useSelector((state: RootState) => state.contactMeSlice.triggerEmailAnimation);
  const userInfo = useSelector((state: RootState) => state.contactMeSlice.userInfo);
  const noEmailResetIsLoading = useSelector((state: RootState) => state.contactMeSlice.noEmailResetIsLoading);
  const { handleToast } = useToast();

  const handleEmailPromptsReset = useCallback(() => {
    dispatch(setTriggerNoEmail(false));
    dispatch(setTriggerEmailAnimation(false));
    dispatch(setNoEmailResetIsLoading(true));
  }, [dispatch]);

  const handleContactStateReset = useCallback(() => {
    const yesEmailPromptsReset = {
      triggerYesEmail: false,
      userEmailResponseIsLoading: false,
      userMsgResponseIsLoading: false,
      showMsgPrompt: false,
      showCheckPrompt: false,
      triggerCheckAnimation: false,
      showConfirmPrompt: false
    } as YesEmailPrompts;

    const userInfoReset = {
      userEmail: null,
      userMsg: null,
    } as UserInfo;

    dispatch(setShowEmailSection(false));
    dispatch(setCurrentContactIndex(-1));
    dispatch(setTriggerNoEmail(false));
    dispatch(setYesEmailPrompts(yesEmailPromptsReset));
    dispatch(setTriggerEmailAnimation(false));
    dispatch(setUserInfo(userInfoReset));
  }, [dispatch]);

  const handleContactPromptsReset = useCallback(() => {
    const yesEmailPromptsReset = {
      triggerYesEmail: false,
      userEmailResponseIsLoading: false,
      userMsgResponseIsLoading: false,
      showMsgPrompt: false,
      showCheckPrompt: false,
      triggerCheckAnimation: false,
      showConfirmPrompt: false
    } as YesEmailPrompts;

    const userInfoReset = {
      userEmail: null,
      userMsg: null,
    } as UserInfo;

    dispatch(setTriggerEmailAnimation(false));
    dispatch(setUserInfo(userInfoReset));
    dispatch(setYesEmailPrompts(yesEmailPromptsReset));
  }, [dispatch]);

  const handleSetUserInfo = useCallback((key: keyof UserInfo, value: string) => {
    dispatch(setUserInfo({[key]: value}));
  }, [dispatch]);

  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({[key]: value}));
  }, [dispatch]);

  function handleContactCommand(cmd: string) {
    if (!showEmailSection) return;
    if (yesEmailPrompts.showConfirmPrompt) return;

    if (userInfo.userEmail && userInfo.userMsg && cmd === "y")
      triggerConfirmationPromptAction(handleYesEmailPrompts);
    
    else if (userInfo.userEmail && userInfo.userMsg && cmd === "n")
      triggerPromptResetAction(cmd, handleYesEmailPrompts, handleContactPromptsReset);

    if (cmd === "n")
      triggerNoEmailAction(dispatch, yesEmailPrompts, setTriggerEmailAnimation, setTriggerNoEmail);

    else if (cmd === "y")
      triggerYesEmailAction(dispatch, setTriggerEmailAnimation, handleYesEmailPrompts);
    
    else if (cmd.startsWith("--email"))
      triggerEmailPromptAction(userInfo, cmd, handleYesEmailPrompts, handleSetUserInfo);
    
    else if (cmd.startsWith("--msg") && userInfo.userEmail)
      triggerMessagePromptAction(userInfo, cmd, handleYesEmailPrompts, handleSetUserInfo);
    
    else if (cmd.startsWith("--reset") && triggerNoEmail) 
      triggerResetEmailPrompt(dispatch, setNoEmailResetIsLoading, handleEmailPromptsReset, handleContactPromptsReset);

    else
      handleToast(`Unknown command was entered: ${cmd}`);
  }

  useEffect(() => {
    const emailSectionTimeout = setTimeout(() => {
      if (currentContactIndex === 3) dispatch(setShowEmailSection(true));
    }, 3500);
  
    return () => clearTimeout(emailSectionTimeout);
  }, [dispatch, currentContactIndex]);

  return {showEmailSection, triggerNoEmail, yesEmailPrompts, triggerEmailAnimation, userInfo, noEmailResetIsLoading, handleContactCommand, handleContactStateReset};
}

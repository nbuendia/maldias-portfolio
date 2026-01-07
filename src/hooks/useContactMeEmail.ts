import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  setShowEmailSection,
  setCurrentContactIndex,
  setTriggerEmailAnimation,
  setNoEmailPrompts,
  setYesEmailPrompts,
  setUserInfo,
  UserInfo,
  YesEmailPrompts,
  NoEmailPrompts,
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
  const noEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.noEmailPrompts);  
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);  
  const triggerEmailAnimation = useSelector((state: RootState) => state.contactMeSlice.triggerEmailAnimation);
  const userInfo = useSelector((state: RootState) => state.contactMeSlice.userInfo);
  const { handleToast } = useToast();

  const handleEmailPromptsReset = useCallback(() => {
    const noEmailPromptReset = {
      triggerNoEmail: false,
      noEmailResetIsLoading: true,
    } as NoEmailPrompts;

    dispatch(setNoEmailPrompts(noEmailPromptReset))
    dispatch(setTriggerEmailAnimation(false));
  }, [dispatch]);

  const handleContactStateReset = useCallback(() => {
    const noEmailPromptReset = {
      triggerNoEmail: false,
    } as NoEmailPrompts;

    const yesEmailPromptsReset = {
      triggerYesEmail: false,
    } as YesEmailPrompts;

    const userInfoReset = {
      userEmail: null,
      userMsg: null,
    } as UserInfo;

    dispatch(setShowEmailSection(false));
    dispatch(setCurrentContactIndex(-1));
    dispatch(setNoEmailPrompts(noEmailPromptReset));
    dispatch(setYesEmailPrompts(yesEmailPromptsReset));
    dispatch(setTriggerEmailAnimation(false));
    dispatch(setUserInfo(userInfoReset));
  }, [dispatch]);

  const handleContactPromptsReset = useCallback(() => {
    const yesEmailPromptsReset = {
      triggerYesEmail: false,
    } as YesEmailPrompts;

    const userInfoReset = {
      userEmail: null,
      userMsg: null,
    } as UserInfo;

    dispatch(setTriggerEmailAnimation(false));
    dispatch(setUserInfo(userInfoReset));
    dispatch(setYesEmailPrompts(yesEmailPromptsReset));
  }, [dispatch]);

  // WILL NEED LATER
  // const handleSetUserInfo = useCallback((key: keyof UserInfo, value: string) => {
  //   dispatch(setUserInfo({[key]: value}));
  // }, [dispatch]);

  const handleNoEmailPrompts = useCallback((key: keyof NoEmailPrompts, value: boolean) => {
    dispatch(setNoEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);

  function handleContactCommand(cmd: string) {
    if (!showEmailSection) return;

    if (cmd === "n" || cmd === "N")
      triggerNoEmailAction(dispatch, yesEmailPrompts, setTriggerEmailAnimation, handleNoEmailPrompts);

    else if (cmd === "y" || cmd === "Y")
      triggerYesEmailAction(dispatch, noEmailPrompts, setTriggerEmailAnimation, handleYesEmailPrompts);
    
    else if (cmd.startsWith("--reset") && noEmailPrompts.triggerNoEmail) 
      triggerResetEmailPrompt(handleNoEmailPrompts, handleEmailPromptsReset, handleContactPromptsReset);

    // WHEN RUN RUNNING OTHER COMMANDS, IT TRIGGERS ERROR TOAST AFTER N OR Y HAS BEEN ENTERED
    else
      handleToast(`Unknown command was entered: ${cmd}`);
  }

  const triggerBlurAction = () => {
    handleYesEmailPrompts("triggerEmailBlurAnimation", true);
  }

  function handleUserInfoAction(userFormInfo: UserInfo) {
    console.log("CLICKY MF", userFormInfo);
    // USE EMAILJS HERE
  }

  useEffect(() => {
    const emailSectionTimeout = setTimeout(() => {
      if (currentContactIndex === 3) dispatch(setShowEmailSection(true));
    }, 3500);
  
    return () => clearTimeout(emailSectionTimeout);
  }, [dispatch, currentContactIndex]);

  return {showEmailSection, noEmailPrompts, yesEmailPrompts, triggerEmailAnimation, userInfo, handleContactCommand, triggerBlurAction, handleUserInfoAction, handleContactStateReset};
}

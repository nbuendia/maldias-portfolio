import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserInfo, YesEmailPrompts } from "@/features/ContactMe";

import { setShowEmailSection, setCurrentContactIndex, setTriggerNoEmail, setTriggerEmailAnimation, setYesEmailPrompts, setUserInfo } from "@/features/ContactMe";

export function useContactMeEmail() {
  const dispatch = useDispatch();
  const showEmailSection = useSelector((state: RootState) => state.contactMeSlice.showEmailSection);
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);
  const triggerNoEmail = useSelector((state: RootState) => state.contactMeSlice.triggerNoEmail);
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);
  const triggerEmailAnimation = useSelector((state: RootState) => state.contactMeSlice.triggerEmailAnimation);
  const userInfo = useSelector((state: RootState) => state.contactMeSlice.userInfo);

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
    if (yesEmailPrompts.showConfirmPrompt || triggerNoEmail) return;

    if (userInfo.userEmail && userInfo.userMsg && cmd === "y") {
      handleYesEmailPrompts("triggerCheckAnimation", true);

      setTimeout(() =>
        handleYesEmailPrompts("showConfirmPrompt", true), 2000);
    } else if (userInfo.userEmail && userInfo.userMsg && cmd === "n") {
      handleYesEmailPrompts("triggerCheckAnimation", false);
      handleYesEmailPrompts("triggerCheckAnimation", true);
      
      const contactPromptsResetTimeout = setTimeout(() => {
        cmd = 'y';
        handleContactPromptsReset();
      }, 2000);

      return () => clearTimeout(contactPromptsResetTimeout);
    }

    if (cmd === "n") {
      dispatch(setTriggerEmailAnimation(true));
        
      const triggerNoEmailTimeout = setTimeout(() =>
        dispatch(setTriggerNoEmail(true)), 2000);
      
      return () => clearTimeout(triggerNoEmailTimeout); 
    } else if (cmd === "y") {
      dispatch(setTriggerEmailAnimation(true));
      
      const YesEmailPromptsTimeout = setTimeout(() =>
        handleYesEmailPrompts("triggerYesEmail", true), 2000);

      return () => clearTimeout(YesEmailPromptsTimeout);
    } else if (cmd.startsWith("--email")) {      
        handleYesEmailPrompts("userEmailResponseIsLoading", true);
        const email = cmd.match(/^--email\s+(['"])([^\s"']+@[^\s"']+\.[^\s"']+)\1\s*$/i);
        
        if (email) {
          handleYesEmailPrompts("emailError", false);
          handleSetUserInfo("userEmail", email[2]);
          
          const userResponseIsLoadingTimeout = setTimeout(() => {
            handleYesEmailPrompts("userEmailResponseIsLoading", false);
          }, 2000);

          const showMsgPromptTimeout = setTimeout(() =>
            handleYesEmailPrompts("showMsgPrompt", true), 3000);

          return () => {
            clearTimeout(userResponseIsLoadingTimeout);
            clearTimeout(showMsgPromptTimeout);
          }
        } else if (!email) {
          const userResponseIsLoadingTimeout = setTimeout(() =>
            handleYesEmailPrompts("userEmailResponseIsLoading", false), 2000);
          
          const emailErrorTimeout = setTimeout(() => {
            handleYesEmailPrompts("emailError", true);
          }, 2000); 

          return () => {
            clearTimeout(userResponseIsLoadingTimeout);
            clearTimeout(emailErrorTimeout);
          }
        }
    } else if (cmd.startsWith("--msg") && userInfo.userEmail) {
        handleYesEmailPrompts("userMsgResponseIsLoading", true);
        const msg = cmd.match(/^--msg\s+(['"])(.{1,250})\1\s*$/i);

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
          
          const msgErrorTimeout = setTimeout(() => {
            handleYesEmailPrompts("msgError", true);
          }, 2000); 

          return () => {
            clearTimeout(userResponseIsLoadingTimeout);
            clearTimeout(msgErrorTimeout);
          }
        }
    } else console.warn(`Unknown command: "${cmd}"`);
  }

  useEffect(() => {
    const emailSectionTimeout = setTimeout(() => {
      if (currentContactIndex === 3) {
        dispatch(setShowEmailSection(true));
      }
    }, 3500);
  
    return () => clearTimeout(emailSectionTimeout);
  }, [dispatch, currentContactIndex]);

  return {showEmailSection, triggerNoEmail, yesEmailPrompts, triggerEmailAnimation, userInfo, handleContactCommand, handleContactStateReset};
}

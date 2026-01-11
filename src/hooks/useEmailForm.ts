import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setIsSubmitDisabled, setUserFormInfo, UserInfo, setDisplayForm } from "@/features/EmailForm";
import { NoEmailPrompts, setNoEmailPrompts, setShowEllipsis, setYesEmailPrompts, YesEmailPrompts } from "@/features/ContactMe";
import { triggerCancelEmail } from "@/lib/utils";

export function useEmailForm() {
  const dispatch = useDispatch();
  const userFormInfo = useSelector((state: RootState) => state.emailFormSlice.userFormInfo);
  const isSubmitDisabled = useSelector((state: RootState) => state.emailFormSlice.isSubmitDisabled);
  const displayForm = useSelector((state: RootState) => state.emailFormSlice.displayForm);

  const handleEmailFormReset = useCallback(() => {
    dispatch(setIsSubmitDisabled(true));
    dispatch(setDisplayForm(false));
    dispatch(setUserFormInfo({} as UserInfo));
  }, [dispatch]);

  const handleSubmitDisabledValue = useCallback((state: boolean) => {
    dispatch(setIsSubmitDisabled(state));
  }, [dispatch]);

  const handleDisplayForm = useCallback((state: boolean) => {
    dispatch(setDisplayForm(state));
  }, [dispatch]);

  const handleSetUserInfo = useCallback((key: keyof UserInfo, value: string) => {
    dispatch(setUserFormInfo({[key]: value}));
  }, [dispatch]);

  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleNoEmailPrompts = useCallback((key: keyof NoEmailPrompts, value: boolean) => {
    dispatch(setNoEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleShowEllipsis = useCallback((state: boolean) => {
    dispatch(setShowEllipsis(state));
  }, [dispatch]);

  function handleCancelEmail() {
    triggerCancelEmail(handleDisplayForm, handleYesEmailPrompts, handleShowEllipsis, handleNoEmailPrompts);   
  };

  function handleUserInfoAction(userFormInfo: UserInfo) {
    console.log("CLICKY MF", userFormInfo);
    // USE EMAILJS HERE
  }

  useEffect(() => {
    const submitDisabled = !userFormInfo.userName || !userFormInfo.userEmail || !userFormInfo.userMsg;

    if (submitDisabled) handleSubmitDisabledValue(true);
    else handleSubmitDisabledValue(false);
  });

  return { userFormInfo, isSubmitDisabled, displayForm, handleSetUserInfo, handleUserInfoAction, handleCancelEmail, handleDisplayForm, handleEmailFormReset };
}

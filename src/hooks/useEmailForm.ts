import { MouseEvent, RefObject, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import emailjs from "@emailjs/browser";

import { useToast } from "./useToast";

import { setIsSubmitDisabled, setUserFormInfo, UserInfo, setDisplayForm, setIsSubmitLoading } from "@/features/EmailForm";
import { NoEmailPrompts, SendEmailPrompts, setNoEmailPrompts, setSendEmailPrompts, setShowEllipsis, setYesEmailPrompts, YesEmailPrompts } from "@/features/ContactMe";
import { triggerCancelEmail, triggerSendEmail } from "@/lib/utils";
import { S_ID, T_ID, P_KEY } from "@/lib/constants";

export function useEmailForm() {
  const dispatch = useDispatch();
  const { handleToast } = useToast();
  const userFormInfo = useSelector((state: RootState) => state.emailFormSlice.userFormInfo);
  const isSubmitDisabled = useSelector((state: RootState) => state.emailFormSlice.isSubmitDisabled);
  const displayForm = useSelector((state: RootState) => state.emailFormSlice.displayForm);
  const isSubmitLoading = useSelector((state: RootState) => state.emailFormSlice.isSubmitLoading);

  const handleEmailFormReset = useCallback(() => {
    dispatch(setIsSubmitDisabled(true));
    dispatch(setDisplayForm(false));
    dispatch(setIsSubmitLoading(false));
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

  const handleClearUserInfo = useCallback(() => {
    const form = {
      userName: "",
      userSubject: "",
      userEmail: "",
      userMsg: "",
    } as UserInfo;

    dispatch(setUserFormInfo(form as UserInfo));
  }, [dispatch]);

  const handleSubmitLoading = useCallback((state: boolean) => {
    dispatch(setIsSubmitLoading(state));
  }, [dispatch]);

  const handleNoEmailPrompts = useCallback((key: keyof NoEmailPrompts, value: boolean) => {
    dispatch(setNoEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);
  
  const handleSendEmailPrompts = useCallback((key: keyof SendEmailPrompts, value: boolean) => {
    dispatch(setSendEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleShowEllipsis = useCallback((state: boolean) => {
    dispatch(setShowEllipsis(state));
  }, [dispatch]);

  function handleCancelEmail(event: MouseEvent) {
    event.preventDefault();

    triggerCancelEmail(handleDisplayForm, handleYesEmailPrompts, handleShowEllipsis, handleNoEmailPrompts);   
    handleClearUserInfo();
  };

  function handleSubmitEmail(event: MouseEvent, ref: RefObject<HTMLFormElement | null>) {
    event.preventDefault();
    handleSubmitLoading(true);

    emailjs.sendForm(S_ID as string, T_ID as string, ref.current as HTMLFormElement, {
      publicKey: P_KEY,
    }).then(() => {
      triggerSendEmail(handleSubmitLoading, handleDisplayForm, handleYesEmailPrompts, handleSendEmailPrompts, handleClearUserInfo, handleShowEllipsis);
    }, (error) => {
      console.error("ERROR!", error.text);
      handleToast("Oh no! Something went wrong! Please try again.");
    });
  }

  useEffect(() => {
    const submitDisabled = !userFormInfo.userName || !userFormInfo.userEmail || !userFormInfo.userMsg;

    if (submitDisabled) handleSubmitDisabledValue(true);
    else handleSubmitDisabledValue(false);
  });

  return { userFormInfo, isSubmitDisabled, displayForm, isSubmitLoading, handleSetUserInfo, handleCancelEmail, handleDisplayForm, handleSubmitEmail, handleEmailFormReset };
}

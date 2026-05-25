import { MouseEvent, RefObject, useCallback } from "react";
import { useDispatch } from "react-redux";
import emailjs from "@emailjs/browser";

import { setShowEllipsis } from "@/features/Ellipsis";
import { setIsSubmitLoading } from "@/features/EmailForm";
import {
  setSendEmailPrompts,
  setYesEmailPrompts,
  YesEmailPrompts,
  SendEmailPrompts,
} from "@/features/ContactMe";

import { useToast } from "@/hooks";
import { useClearUserInfo } from "./useClearUserInfo";
import { useDisplayForm } from "./useDisplayForm";
import { triggerSendEmail } from "../utils";

import { S_ID, T_ID, P_KEY } from "@/lib/constants";

export function useSubmitEmail() {
  const dispatch = useDispatch();
  const {handleClearUserInfo} = useClearUserInfo();
  const {handleDisplayForm} = useDisplayForm();
  const {handleToast} = useToast();

  // REPEATS; MOVE TO LOCAL FILE IN COMPONENT
  const handleShowEllipsis = useCallback((state: boolean) => {
    dispatch(setShowEllipsis(state));
  }, [dispatch]);

  // REPEATS
  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleSendEmailPrompts = useCallback((key: keyof SendEmailPrompts, value: boolean) => {
    dispatch(setSendEmailPrompts({ [key]: value }));
  }, [dispatch]);

  const handleSubmitLoading = useCallback((state: boolean) => {
    dispatch(setIsSubmitLoading(state));
  }, [dispatch]);

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

  return { handleSubmitEmail };
}

import { MouseEvent, useCallback } from "react";
import { useDispatch } from "react-redux";

import { setNoEmailPrompts, NoEmailPrompts } from "@/features/ContactMe";

import { useYesEmail } from "@/sections/Contact/hooks";
import { useEllipsis } from "@/hooks";
import { useClearUserInfo } from "./useClearUserInfo";
import { useDisplayForm } from "./useDisplayForm";
import { triggerCancelEmail } from "../utils";

export function useCancelEmail() {
  const dispatch = useDispatch();
  const {handleClearUserInfo} = useClearUserInfo();
  const {handleDisplayForm} = useDisplayForm();
  const {handleYesEmailPrompts} = useYesEmail();
  const {handleShowEllipsis} = useEllipsis();

  const handleNoEmailPrompts = useCallback((key: keyof NoEmailPrompts, value: boolean) => {
    dispatch(setNoEmailPrompts({ [key]: value }));
  }, [dispatch]);
  
  function handleCancelEmail(event: MouseEvent) {
    event.preventDefault();
  
    triggerCancelEmail(handleDisplayForm, handleYesEmailPrompts, handleShowEllipsis, handleNoEmailPrompts);   
    handleClearUserInfo();
  };

  return { handleCancelEmail };
}

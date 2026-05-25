import { useCallback } from "react";
import { useDispatch } from "react-redux";

import {
  setDisplayForm,
  setIsSubmitDisabled,
  setIsSubmitLoading,
  setUserFormInfo,
  UserInfo,
} from "@/features/EmailForm";

export function useEmailReset() {
  const dispatch = useDispatch();

  const handleEmailFormReset = useCallback(() => {
    dispatch(setIsSubmitDisabled(true));
    dispatch(setDisplayForm(false));
    dispatch(setIsSubmitLoading(false));
    dispatch(setUserFormInfo({} as UserInfo));
  }, [dispatch]);

  return { handleEmailFormReset };
}

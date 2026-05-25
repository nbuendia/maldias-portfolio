import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { setIsSubmitDisabled } from "@/features/EmailForm";
import { useUserInfo } from "./useUserInfo";

export function useEmail() {
  const dispatch = useDispatch();
  const {userFormInfo} = useUserInfo();

  const handleSubmitDisabledValue = useCallback((state: boolean) => {
    dispatch(setIsSubmitDisabled(state));
  }, [dispatch]);

  useEffect(() => {
    const submitDisabled = !userFormInfo.userName || !userFormInfo.userEmail || !userFormInfo.userMsg;

    if (submitDisabled) handleSubmitDisabledValue(true);
    else handleSubmitDisabledValue(false);
  });
}

import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setUserFormInfo, UserInfo } from "@/features/EmailForm";

export function useClearUserInfo() {
  const dispatch = useDispatch();

  const handleClearUserInfo = useCallback(() => {
    const form = {
      userName: "",
      userSubject: "",
      userEmail: "",
      userMsg: "",
    } as UserInfo;
  
    dispatch(setUserFormInfo(form as UserInfo));
  }, [dispatch]);

  return { handleClearUserInfo };
}

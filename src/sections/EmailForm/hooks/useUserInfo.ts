import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setUserFormInfo, UserInfo } from "@/features/EmailForm";

export function useUserInfo() {
  const dispatch = useDispatch();
  const userFormInfo = useSelector((state: RootState) => state.emailFormSlice.userFormInfo);

  const handleUserInfo = useCallback((key: keyof UserInfo, value: string) => {
    dispatch(setUserFormInfo({[key]: value}));
  }, [dispatch]);

  return { userFormInfo, handleUserInfo };
}

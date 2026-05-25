import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setYesEmailPrompts, YesEmailPrompts } from "@/features/ContactMe";

export function useYesEmail() {
  const dispatch = useDispatch();
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);
  
  const handleYesEmailPrompts = useCallback((key: keyof YesEmailPrompts, value: boolean) => {
    dispatch(setYesEmailPrompts({ [key]: value }));
  }, [dispatch]);

  return {yesEmailPrompts, handleYesEmailPrompts};
}

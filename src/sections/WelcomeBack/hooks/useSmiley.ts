import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setSmileyAnimation } from "@/features/WelcomeBack";

export function useSmiley() {
  const dispatch = useDispatch();
  const smileyAnimation = useSelector((state: RootState) => state.welcomeBackSlice.smileyAnimation);
  
  const handleSmileyAnimation = useCallback(() => {
    dispatch(setSmileyAnimation(true))
  }, [dispatch]);

  return { smileyAnimation, handleSmileyAnimation };
}

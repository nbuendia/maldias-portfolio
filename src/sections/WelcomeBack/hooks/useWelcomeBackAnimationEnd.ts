import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import {
  setEndAnimation,
  setEndAnimationLetterIndex,
  setShowWelcomeBack,
} from "@/features/WelcomeBack";

export function useWelcomeBackAnimationEnd() {
  const dispatch = useDispatch();
  const endAnimation = useSelector((state: RootState) => state.welcomeBackSlice.endAnimation);
  const endAnimationLetterIndex = useSelector((state: RootState) => state.welcomeBackSlice.endAnimationLetterIndex);
  
  const handleEndAnimationLetterIndex = useCallback((state: number) => {
    dispatch(setEndAnimationLetterIndex(endAnimationLetterIndex - state));
  }, [dispatch, endAnimationLetterIndex]);

  const handleEndAnimation = useCallback(() => {
    const endAnimationTimeout = setTimeout(() => {
      dispatch(setEndAnimation(true));
    }, 250);
  
    const showComponentTimeout = setTimeout(() => {
      dispatch(setShowWelcomeBack(false));
    }, 3000);
  
    return () => {
      clearTimeout(endAnimationTimeout);
      clearTimeout(showComponentTimeout);
    }
  }, [dispatch]);

  useEffect(() => {
    if (!endAnimation) return;
    
    if (endAnimationLetterIndex > 0) {
      const endAnimationLetterIndexTimeout = setTimeout(() => {
        handleEndAnimationLetterIndex(1);
      }, 3000);

      return () => clearTimeout(endAnimationLetterIndexTimeout);
    }
  });

  return {
    endAnimation,
    endAnimationLetterIndex,
    handleEndAnimation,
  };
}

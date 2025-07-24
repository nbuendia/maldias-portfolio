import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setEndAnimation, setEndAnimationLetterIndex, setShowComponent, setSmileyAnimation } from "@/features/WelcomeBack";

export function useWelcomeBack() {
  const dispatch = useDispatch();
  const showComponent = useSelector((state: RootState) => state.welcomeBackSlice.showComponent);
  const smileyAnimation = useSelector((state: RootState) => state.welcomeBackSlice.smileyAnimation);
  const endAnimation = useSelector((state: RootState) => state.welcomeBackSlice.endAnimation);
  const endAnimationLetterIndex = useSelector((state: RootState) => state.welcomeBackSlice.endAnimationLetterIndex);

  useEffect(() => {
    const returnUser = localStorage.getItem("isReturnUser");
    if (!returnUser) localStorage.setItem("isReturnUser", "true");
    else dispatch(setShowComponent(true));
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

  const handleSmileyAnimation = useCallback(() => {
    dispatch(setSmileyAnimation(true))
  }, [dispatch]);
    
  const handleEndAnimationLetterIndex = useCallback((state: number) => {
    dispatch(setEndAnimationLetterIndex(endAnimationLetterIndex - state));
  }, [dispatch, endAnimationLetterIndex]);

  const handleEndAnimation = useCallback(() => {
    const endAnimationTimeout = setTimeout(() => {
      dispatch(setEndAnimation(true));
    }, 250);

    const showComponentTimeout = setTimeout(() => {
      dispatch(setShowComponent(false));
    }, 3000);

    return () => {
      clearTimeout(endAnimationTimeout);
      clearTimeout(showComponentTimeout);
    }
  }, [dispatch]);

  return {showComponent, smileyAnimation, endAnimation, endAnimationLetterIndex, handleSmileyAnimation, handleEndAnimation};
}

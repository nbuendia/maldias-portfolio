import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { TECH_STACK } from "@/lib/constants";
import { setCurrentTechIndex, setShowTechStack, setStartTechStackAnimation } from "@/features/AboutMe";

export function useTechStack() {
  const dispatch = useDispatch();
  const showTechStack = useSelector((state: RootState) => state.aboutMeSlice.showTechStack);
  const startTechStackAnimation = useSelector((state: RootState) => state.aboutMeSlice.startTechStackAnimation);
  const currentTechIndex = useSelector((state: RootState) => state.aboutMeSlice.currentTechIndex);

  const handleTeckStackStateReset = useCallback(() => {
    dispatch(setShowTechStack(false));
    dispatch(setStartTechStackAnimation(false));
    dispatch(setCurrentTechIndex(-1));
  }, [dispatch]);

  const handleSetCurrentTechIndex = useCallback((state: number) => {
    dispatch(setCurrentTechIndex(currentTechIndex + state));
  }, [dispatch, currentTechIndex]);

  const handleSetStartTechStackAnimation = () => {
    dispatch(setStartTechStackAnimation(true));
  };

  useEffect(() => {
    const elem = document.getElementById("about");
    elem?.scrollTo(0, elem?.scrollHeight);
  });

  useEffect(() => {
    if (!startTechStackAnimation) return;
  
    if (currentTechIndex < TECH_STACK.length - 1) {
      const timeOut = setTimeout(() => {
        handleSetCurrentTechIndex(1);
      }, 1000);
  
      return () => clearTimeout(timeOut);
    }
  }, [startTechStackAnimation, currentTechIndex, handleSetCurrentTechIndex]);

  return {showTechStack, startTechStackAnimation, currentTechIndex, handleSetStartTechStackAnimation, handleTeckStackStateReset};
}

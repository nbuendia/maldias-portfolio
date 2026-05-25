import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { 
  setCurrentTechIndex,
  setShowAboutMeArt,
  setShowTechStack,
  setShowWhoami,
  setStartAboutMeAnimation,
  setStartTechStackAnimation
} from "@/features/AboutMe";

export function useAboutMeReset() {
  const dispatch = useDispatch();

  const handleAboutMeStateReset = useCallback(() => {
    dispatch(setStartAboutMeAnimation(false));
    dispatch(setShowAboutMeArt(false));
    dispatch(setShowWhoami(false));
    dispatch(setStartAboutMeAnimation(false));
    dispatch(setShowTechStack(false));
    dispatch(setStartTechStackAnimation(false));
    dispatch(setCurrentTechIndex(-1));
  }, [dispatch]);

  return { handleAboutMeStateReset };
}

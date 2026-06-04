import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { 
  setShowTechStack,
  setShowWhoami,
  setStartTechStackAnimation
} from "@/features/AboutMe";

export function useAboutMeReset() {
  const dispatch = useDispatch();

  const handleAboutMeStateReset = useCallback(() => {
    dispatch(setShowWhoami(false));
    dispatch(setShowTechStack(false));
    dispatch(setStartTechStackAnimation(false));
  }, [dispatch]);

  return { handleAboutMeStateReset };
}

import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { 
  setShowTechStack,
  setShowWhoami,
  setStartWhoamiAnimation,
  setStartTechStackAnimation,
} from "@/features/AboutMe";

export function useAboutMeReset() {
  const dispatch = useDispatch();

  const handleAboutMeStateReset = useCallback(() => {
    dispatch(setShowWhoami(false));
    dispatch(setStartWhoamiAnimation(false));
    dispatch(setShowTechStack(false));
    dispatch(setStartTechStackAnimation(false));
  }, [dispatch]);

  return { handleAboutMeStateReset };
}

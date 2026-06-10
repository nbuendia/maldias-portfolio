import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setShowTechStack,
  setShowWhoami,
  setStartWhoamiAnimation,
} from "@/features/AboutMe";

export function useAboutMeText() {
  const dispatch = useDispatch();

  const handleShowWhoami = useCallback(() => {
    const whoamiInfoTimeout= setTimeout(() => {
      dispatch(setStartWhoamiAnimation(true));
    }, 4000);
  
    const whoamiTimeout = setTimeout(() => {
      dispatch(setShowTechStack(true));
    }, 6000);
  
    return () => {
      clearTimeout(whoamiInfoTimeout);
      clearTimeout(whoamiTimeout);
    }
  }, [dispatch]);

  useEffect(() => {
    const aboutMeTimeOut = setTimeout(() => {
      dispatch(setShowWhoami(true));
    }, 1000);
      
    return () => clearTimeout(aboutMeTimeOut);
  }, [dispatch]);

  return {
    handleShowWhoami,
  };
}

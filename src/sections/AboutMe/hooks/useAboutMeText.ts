import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setShowAboutMeArt,
  setShowTechStack,
  setShowWhoami,
  setStartAboutMeAnimation,
  setStartAsciiScrollAnim,
  setStartWhoamiAnimation,
} from "@/features/AboutMe";

export function useAboutMeText() {
  const dispatch = useDispatch();

  const handleShowAboutMeAscii = useCallback(() => {
    dispatch(setShowAboutMeArt(true));

    const aboutMeAsciiTimeout = setTimeout(() => {
      dispatch(setShowWhoami(true));
    }, 1000);

    return () => clearTimeout(aboutMeAsciiTimeout);
  }, [dispatch]);

  const handleShowWhoami = useCallback(() => {
    dispatch(setStartWhoamiAnimation(true));
  
    const whoamiTimeout = setTimeout(() => {
      dispatch(setShowTechStack(true));
    }, 6000);
  
    return () => clearTimeout(whoamiTimeout);
  }, [dispatch]);

  useEffect(() => {
    const aboutMeTimeOut = setTimeout(() => {
      dispatch(setStartAboutMeAnimation(true));
    }, 2000);
      
    return () => clearTimeout(aboutMeTimeOut);
  }, [dispatch]);

  return {
    handleShowAboutMeAscii,
    setStartAsciiScrollAnim,
    handleShowWhoami,
  };
}

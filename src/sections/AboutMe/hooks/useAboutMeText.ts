import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  setShowTechStack,
  setShowWhoami,
  setStartWhoamiAnimation,
} from "@/features/AboutMe";

export function useAboutMeText() {
  const dispatch = useDispatch();
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const handleShowWhoami = useCallback(() => {
    const whoamiInfoTimeout = setTimeout(() => {
      dispatch(setStartWhoamiAnimation(true));
    }, 4000);
  
    const whoamiTimeout = setTimeout(() => {
      dispatch(setShowTechStack(true));
    }, 6000);
  
    timeouts.current.push(whoamiInfoTimeout, whoamiTimeout);
  }, [dispatch]);

  useEffect(() => {
    const aboutMeTimeOut = setTimeout(() => {
      dispatch(setShowWhoami(true));
    }, 1000);
      
    return () => clearTimeout(aboutMeTimeOut);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
      timeouts.current = [];
    }
  }, [timeouts]);

  return {
    handleShowWhoami,
  };
}

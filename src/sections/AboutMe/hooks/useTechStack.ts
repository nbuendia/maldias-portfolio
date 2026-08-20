import { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setStartTechStackAnimation } from "@/features/AboutMe";

export function useTechStack() {
  const dispatch = useDispatch();
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const startTechStackAnimation = useSelector((state: RootState) => state.aboutMeSlice.startTechStackAnimation);

  const handleSetStartTechStackAnimation = useCallback(() => {
    const techStackTimeout = setTimeout(() => {
      dispatch(setStartTechStackAnimation(true));
    }, 4000);

    timeouts.current.push(techStackTimeout);
  }, [dispatch]);

  useEffect(() => {
    const elem = document.getElementById("about");
    elem?.scrollTo(0, elem?.scrollHeight);
  });

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
      timeouts.current = [];
    }
  }, [timeouts]);

  return {
    startTechStackAnimation,
    handleSetStartTechStackAnimation,
  };
}

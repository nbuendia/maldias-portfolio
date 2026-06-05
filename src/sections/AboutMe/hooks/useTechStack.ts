import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setStartTechStackAnimation } from "@/features/AboutMe";

export function useTechStack() {
  const dispatch = useDispatch();
  const startTechStackAnimation = useSelector((state: RootState) => state.aboutMeSlice.startTechStackAnimation);

  const handleSetStartTechStackAnimation = useCallback(() => {
    const techStackTimeout = setTimeout(() => {
      dispatch(setStartTechStackAnimation(true));
    }, 3000);

    return () => clearTimeout(techStackTimeout);
  }, [dispatch]);

  useEffect(() => {
    const elem = document.getElementById("about");
    elem?.scrollTo(0, elem?.scrollHeight);
  });

  return {
    startTechStackAnimation,
    handleSetStartTechStackAnimation,
  };
}

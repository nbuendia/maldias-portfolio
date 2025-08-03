import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setStartAboutMeAnimation, setShowAboutMeArt, setShowWhoami } from "@/features/AboutMe";
import { useToast } from "./useToast";

export function useAboutMeTxt() {
  const dispatch = useDispatch();
  const startAboutMeAnimation = useSelector((state: RootState) => state.aboutMeSlice.startAboutMeAnimation);
  const showAboutMeArt = useSelector((state: RootState) => state.aboutMeSlice.showAboutMeArt);
  const { handleToast } = useToast();
  
  const handleAboutMeStateReset = useCallback(() => {
    dispatch(setStartAboutMeAnimation(false));
    dispatch(setShowAboutMeArt(false));
  }, [dispatch]);

  const handleShowAboutMeArt = () => {
    dispatch(setShowAboutMeArt(true));

    const whoamiTimeout = setTimeout(() => {
      dispatch(setShowWhoami(true));
    }, 2000);

    return () => clearTimeout(whoamiTimeout);
  };

  function handleAboutCommand (cmd: string) {
    const runMatch = cmd.match(/^run (.+)$/i);

    if (!runMatch) handleToast(`Unknown command was entered: ${cmd}`);
  }

  useEffect(() => {
    const aboutMeTimeOut = setTimeout(() => {
      dispatch(setStartAboutMeAnimation(true));
    }, 1000);

    return () => clearTimeout(aboutMeTimeOut);
  }, [dispatch]);

  return {startAboutMeAnimation, showAboutMeArt, handleShowAboutMeArt, handleAboutMeStateReset, handleAboutCommand};
}

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setStartAboutMeAnimation, setShowAboutMeArt, setShowWhoami } from "@/features/AboutMe";
import { setDisplayToast, setMessageToast } from "@/features/Toast";

export function useAboutMeTxt() {
  const dispatch = useDispatch();
  const startAboutMeAnimation = useSelector((state: RootState) => state.aboutMeSlice.startAboutMeAnimation);
  const showAboutMeArt = useSelector((state: RootState) => state.aboutMeSlice.showAboutMeArt);
  
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

    if (!runMatch) {
      dispatch(setMessageToast(`Unknown command was entered: ${cmd}`));
      dispatch(setDisplayToast(true));

      const toastTimeout = setTimeout(() => {
        dispatch(setDisplayToast(false));
      }, 5000);
        
      return () => clearTimeout(toastTimeout);
    }
  }

  useEffect(() => {
    const aboutMeTimeOut = setTimeout(() => {
      dispatch(setStartAboutMeAnimation(true));
    }, 1000);

    return () => clearTimeout(aboutMeTimeOut);
  }, [dispatch]);

  return {startAboutMeAnimation, showAboutMeArt, handleShowAboutMeArt, handleAboutMeStateReset, handleAboutCommand};
}

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setStartAboutMeAnimation, setShowAboutMeArt, setShowWhoami } from "@/features/AboutMe";

export function useAboutMeTxt() {
  const dispatch = useDispatch();
  const startAboutMeAnimation = useSelector((state: RootState) => state.AboutMeSlice.startAboutMeAnimation);
  const showAboutMeArt = useSelector((state: RootState) => state.AboutMeSlice.showAboutMeArt);
  
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

  useEffect(() => {
    const aboutMeTimeOut = setTimeout(() => {
      dispatch(setStartAboutMeAnimation(true));
    }, 1000);

    return () => clearTimeout(aboutMeTimeOut);
  }, [dispatch]);

  return {startAboutMeAnimation, showAboutMeArt, handleShowAboutMeArt, handleAboutMeStateReset};
}

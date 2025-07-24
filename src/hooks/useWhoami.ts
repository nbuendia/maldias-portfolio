import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setShowTechStack, setShowWhoami, setStartWhoamiAnimation } from "@/features/AboutMe";

export function useWhoami() {
  const dispatch = useDispatch();
  const showWhoami = useSelector((state: RootState) => state.aboutMeSlice.showWhoami);
  const startWhoamiAnimation = useSelector((state: RootState) => state.aboutMeSlice.startWhoamiAnimation);

  const handleWhoamiStateReset = useCallback(() => {
    dispatch(setShowWhoami(false));
    dispatch(setStartWhoamiAnimation(false));
  }, [dispatch]);

  function handleShowWhoami() {
    dispatch(setStartWhoamiAnimation(true));

    const whoamiTimeout = setTimeout(() => {
      dispatch(setShowTechStack(true));
    }, 6000);

    return () => clearTimeout(whoamiTimeout);
  }

  return {showWhoami, startWhoamiAnimation, handleShowWhoami, handleWhoamiStateReset};
}

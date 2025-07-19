import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setShowTechStack, setStartWhoamiAnimation } from "@/features/AboutMe";

export function useWhoami() {
  const dispatch = useDispatch();
  const showWhoami = useSelector((state: RootState) => state.AboutMeSlice.showWhoami);
  const startWhoamiAnimation = useSelector((state: RootState) => state.AboutMeSlice.startWhoamiAnimation);

  function handleShowWhoami() {
    dispatch(setStartWhoamiAnimation(true));

    const whoamiTimeout = setTimeout(() => {
      dispatch(setShowTechStack(true));
    }, 6000);

    return () => clearTimeout(whoamiTimeout);
  }

  return {showWhoami, startWhoamiAnimation, handleShowWhoami};
}

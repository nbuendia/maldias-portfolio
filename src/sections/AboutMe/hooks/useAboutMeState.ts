import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function useAboutMeState() {
  const startAboutMeAnimation = useSelector((state: RootState) => state.aboutMeSlice.startAboutMeAnimation);
  const showAboutMeArt = useSelector((state: RootState) => state.aboutMeSlice.showAboutMeArt);
  const startAsciiScrollAnim = useSelector((state: RootState) => state.aboutMeSlice.startAsciiScrollAnim);
  const showWhoami = useSelector((state: RootState) => state.aboutMeSlice.showWhoami);
  const startWhoamiAnimation = useSelector((state: RootState) => state.aboutMeSlice.startWhoamiAnimation);
  const showTechStack = useSelector((state: RootState) => state.aboutMeSlice.showTechStack);

  return {
    startAboutMeAnimation,
    showAboutMeArt,
    startAsciiScrollAnim,
    showWhoami,
    startWhoamiAnimation,
    showTechStack,
  };
}

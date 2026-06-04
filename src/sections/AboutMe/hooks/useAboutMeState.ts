import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useAboutMeState() {
  const showWhoami = useSelector((state: RootState) => state.aboutMeSlice.showWhoami);
  const startWhoamiAnimation = useSelector((state: RootState) => state.aboutMeSlice.startWhoamiAnimation);
  const showTechStack = useSelector((state: RootState) => state.aboutMeSlice.showTechStack);

  return {
    showWhoami,
    startWhoamiAnimation,
    showTechStack,
  };
}

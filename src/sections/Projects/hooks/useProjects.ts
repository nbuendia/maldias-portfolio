import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import { 
  setShowProjectsAscii,
  setShowProjectsSection,
  setStartProjectAnimation,
  setStartAsciiScrollAnim,
} from "@/features/Projects";

export function useProjects() {
  const dispatch = useDispatch();

  const handleShowProjectAscii = useCallback(() => {
    dispatch(setShowProjectsAscii(true));

    const showProjectTimeout = setTimeout(() => {
      dispatch(setShowProjectsSection(true));
    }, 2000);

    return () => clearTimeout(showProjectTimeout);
  }, [dispatch]);

  useEffect(() => {
    const startProjectsAnimationTimeout = setTimeout(() => {
      dispatch(setStartProjectAnimation(true));
    }, 1000);

    return () => clearTimeout(startProjectsAnimationTimeout);
  }, [dispatch]);

  return { setStartAsciiScrollAnim, handleShowProjectAscii };
}

import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { 
  setCurrentProjectIndex,
  setProjects,
  setShowProjects,
  setShowProjectsAscii,
  setShowProjectsSection,
  setStartProjectAnimation,
} from "@/features/Projects";

export function useProjectsReset() {
  const dispatch = useDispatch();

  const handleProjectsStateReset = useCallback(() => {
    dispatch(setShowProjectsAscii(false));
    dispatch(setStartProjectAnimation(false));
    dispatch(setShowProjectsSection(false));
    dispatch(setProjects([]));
    dispatch(setShowProjects(false));
    dispatch(setCurrentProjectIndex(-1));
  }, [dispatch]);

  return { handleProjectsStateReset};
}

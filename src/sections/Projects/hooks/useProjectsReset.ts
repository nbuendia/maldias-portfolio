import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { 
  setCurrentProjectIndex,
  setProjects,
  setShowProjects,
  setShowProjectsSection,
} from "@/features/Projects";

export function useProjectsReset() {
  const dispatch = useDispatch();

  const handleProjectsStateReset = useCallback(() => {
    dispatch(setShowProjectsSection(false));
    dispatch(setProjects([]));
    dispatch(setShowProjects(false));
    dispatch(setCurrentProjectIndex(-1));
  }, [dispatch]);

  return { handleProjectsStateReset};
}

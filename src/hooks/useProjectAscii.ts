import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setShowProjectsAscii, setShowProjectsSection, setStartProjectAnimation } from "@/features/Projects";

export function useProjectsAscii() {
  const dispatch = useDispatch();
  const startProjectAnimation = useSelector((state: RootState) => state.projectsSlice.startProjectAnimation);
  const showProjectsAscii = useSelector((state: RootState) => state.projectsSlice.showProjectsAscii);
  const showProjectsSection = useSelector((state: RootState) => state.projectsSlice.showProjectsSection);

  const handleProjectsAsciiReset = useCallback(() => {
    dispatch(setShowProjectsAscii(false));
    dispatch(setStartProjectAnimation(false));
    dispatch(setShowProjectsSection(false));
  }, [dispatch]);

  const handleShowProjectAscii = useCallback(() => {
    dispatch(setShowProjectsAscii(true));

    const projectTimeout = setTimeout(() => {
      dispatch(setShowProjectsSection(true));
    }, 2000);

    return () => clearTimeout(projectTimeout);
  }, [dispatch]);

  useEffect(() => {
    const projectsTimeout = setTimeout(() => {
      dispatch(setStartProjectAnimation(true));
    }, 1000);
  
    return () => clearTimeout(projectsTimeout);
  }, [dispatch]);

  return { startProjectAnimation, showProjectsAscii, showProjectsSection, handleProjectsAsciiReset, handleShowProjectAscii };
}

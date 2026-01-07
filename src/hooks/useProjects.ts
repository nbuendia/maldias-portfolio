import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { ProjectStatus, setCurrentProjectIndex, setProjects, setShowProjects } from "@/features/Projects";

import projectsList from "@/lib/data/projects.json";

export function useProjects() {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projectsSlice.projects);
  const showProjects = useSelector((state: RootState) => state.projectsSlice.showProjects);
  const currentProjectIndex = useSelector((state: RootState) => state.projectsSlice.currentProjectIndex);

  const handleProjectsStateReset = useCallback(() => {
    dispatch(setProjects([]));
    dispatch(setShowProjects(false));
    dispatch(setCurrentProjectIndex(-1));
  }, [dispatch]);

  const handleShowProjects = useCallback(() => {
    dispatch(setShowProjects(true));
  }, [dispatch]);

  function handleProjectStatus(status: keyof ProjectStatus) {
    const statusColor = {
      "not-started": "gray",
      wip: "yellow",
      completed: "lime",
    } as ProjectStatus;

    return statusColor[status];
  }

  useEffect(() => {
    dispatch(setProjects(projectsList));
  }, [dispatch]);

  useEffect(() => {
    if (!showProjects) return;
    
    const delay = currentProjectIndex < 0 ? 500 : 2000;
    const elem = document.getElementById("projects");
    
    elem?.scrollTo(0, elem?.scrollHeight);

    if (currentProjectIndex < projects.length) {
      const currentlProjectIndexTimeout = setTimeout(() => {
        dispatch(setCurrentProjectIndex(currentProjectIndex + 1));
      }, delay);

      return () => clearTimeout(currentlProjectIndexTimeout);
    }
  });

  return { showProjects, projects, currentProjectIndex, handleProjectsStateReset, handleShowProjects, handleProjectStatus };
}

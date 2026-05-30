import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useProjectsState() {
  const projects = useSelector((state: RootState) => state.projectsSlice.projects);
  const currentProjectIndex = useSelector((state: RootState) => state.projectsSlice.currentProjectIndex);
  const showProjectsSection = useSelector((state: RootState) => state.projectsSlice.showProjectsSection);
  const showProjects = useSelector((state: RootState) => state.projectsSlice.showProjects);

  return {
    projects,
    currentProjectIndex,
    showProjectsSection,
    showProjects,
  };
}

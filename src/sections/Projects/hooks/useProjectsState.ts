import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useProjectsState() {
  const projects = useSelector((state: RootState) => state.projectsSlice.projects);
  const currentProjectIndex = useSelector((state: RootState) => state.projectsSlice.currentProjectIndex);
  const startProjectAnimation = useSelector((state: RootState) => state.projectsSlice.startProjectAnimation);
  const showProjectsAscii = useSelector((state: RootState) => state.projectsSlice.showProjectsAscii);
  const showProjectsSection = useSelector((state: RootState) => state.projectsSlice.showProjectsSection);
  const showProjects = useSelector((state: RootState) => state.projectsSlice.showProjects);
  const startAsciiScrollAnim  = useSelector((state: RootState) => state.projectsSlice.startAsciiScrollAnim);

  return {
    projects,
    currentProjectIndex,
    startProjectAnimation,
    showProjectsAscii,
    showProjectsSection,
    showProjects,
    startAsciiScrollAnim,
  };
}

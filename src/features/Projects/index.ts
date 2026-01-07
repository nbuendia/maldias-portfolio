import { projectsSlice } from "./Projects";

export { projectsSlice };
export type { ProjectsList, ProjectStatus } from "./Projects";

export const {
  setShowProjectsAscii,
  setStartProjectAnimation,
  setProjects,
  setShowProjectsSection,
  setShowProjects,
  setCurrentProjectIndex,
} = projectsSlice.actions;

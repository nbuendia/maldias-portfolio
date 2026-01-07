import { createSlice } from "@reduxjs/toolkit";

export interface ProjectsList {
  id: number;
  name: string;
  description: string;
  technologies: string[];
  image: string;
  status: string;
  url: string;
  github: string;
  tags: string[];
}

export interface ProjectStatus {
  "not-started": string;
  wip: string;
  completed: string;
}

interface ProjectsState {
  showProjectsAscii: boolean;
  startProjectAnimation: boolean;
  projects: ProjectsList[],
  showProjectsSection: boolean;
  showProjects: boolean;
  currentProjectIndex: number;
};

const initialState = {
  showProjectsAscii: false,
  startProjectAnimation: false,
  projects: [] as ProjectsList[],
  showProjectsSection: false,
  showProjects: false,
  currentProjectIndex: -1,
} satisfies ProjectsState as ProjectsState;

export const projectsSlice = createSlice({
  name: "projects",
  reducerPath: "projectsSlice",
  initialState,
  reducers: {
    setShowProjectsAscii: (state, action) => {
      state.showProjectsAscii = action.payload;
    },
    setStartProjectAnimation: (state, action) => {
      state.startProjectAnimation = action.payload;
    },
    setProjects: (state, action) => {
      state.projects = [...action.payload];
    },
    setShowProjectsSection: (state, action) => {
      state.showProjectsSection = action.payload;
    },
    setShowProjects: (state, action) => {
      state.showProjects = action.payload;
    },
    setCurrentProjectIndex: (state, action) => {
      state.currentProjectIndex = action.payload
    },
  },
});

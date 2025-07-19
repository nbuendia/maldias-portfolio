import { createSlice } from "@reduxjs/toolkit";

interface AboutMeState {
  startAboutMeAnimation: boolean;
  showAboutMeArt: boolean;
  showWhoami: boolean;
  startWhoamiAnimation: boolean;
  showTechStack: boolean;
  startTechStackAnimation: boolean;
  currentTechIndex: number;
}

const initialState = {
  startAboutMeAnimation: false,
  showAboutMeArt: false,
  showWhoami: false,
  startWhoamiAnimation: false,
  showTechStack: false,
  startTechStackAnimation: false,
  currentTechIndex: -1
} satisfies AboutMeState as AboutMeState;

export const aboutMeSlice = createSlice({
  name: "AboutMe",
  reducerPath: "AboutMeSlice",
  initialState,
  reducers: {
    setStartAboutMeAnimation: (state, action) => {
      state.startAboutMeAnimation = action.payload
    },
    setShowAboutMeArt: (state, action) => {
      state.showAboutMeArt = action.payload
    },
    setShowWhoami: (state, action) => {
      state.showWhoami = action.payload
    },
    setStartWhoamiAnimation: (state, action) => {
      state.startWhoamiAnimation = action.payload
    },
    setShowTechStack: (state, action) => {
      state.showTechStack = action.payload
    },
    setStartTechStackAnimation: (state, action) => {
      state.startTechStackAnimation = action.payload
    },
    setCurrentTechIndex: (state, action) => {
      state.currentTechIndex = action.payload
    }
  },
});

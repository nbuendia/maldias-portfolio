import { createSlice } from "@reduxjs/toolkit";

interface AboutMeState {
  startAboutMeAnimation: boolean;
  showAboutMeArt: boolean;
  showWhoami: boolean;
  startWhoamiAnimation: boolean;
  showTechStack: boolean;
  startTechStackAnimation: boolean;
  currentTechIndex: number;
  startAsciiScrollAnim: boolean;
}

const initialState = {
  startAboutMeAnimation: false,
  showAboutMeArt: false,
  showWhoami: false,
  startWhoamiAnimation: false,
  showTechStack: false,
  startTechStackAnimation: false,
  currentTechIndex: -1,
  startAsciiScrollAnim: false,
} satisfies AboutMeState as AboutMeState;

export const aboutMeSlice = createSlice({
  name: "aboutMe",
  reducerPath: "aboutMeSlice",
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
    },
    setStartAsciiScrollAnim: (state, action) => {
      state.startAsciiScrollAnim = action.payload
    },
  },
});

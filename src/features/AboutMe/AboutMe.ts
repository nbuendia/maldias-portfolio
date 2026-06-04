import { createSlice } from "@reduxjs/toolkit";

interface AboutMeState {
  showWhoami: boolean;
  startWhoamiAnimation: boolean;
  showTechStack: boolean;
  startTechStackAnimation: boolean;
}

const initialState = {
  showWhoami: false,
  startWhoamiAnimation: false,
  showTechStack: false,
  startTechStackAnimation: false,
} satisfies AboutMeState as AboutMeState;

export const aboutMeSlice = createSlice({
  name: "aboutMe",
  reducerPath: "aboutMeSlice",
  initialState,
  reducers: {
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
  },
});

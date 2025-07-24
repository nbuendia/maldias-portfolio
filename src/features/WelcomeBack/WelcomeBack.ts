import { createSlice } from "@reduxjs/toolkit";
import { BACK, WELCOME } from "@/lib/constants";

interface WelcomeBackState {
  showComponent: boolean;
  smileyAnimation: boolean;
  endAnimation: boolean;
  endAnimationLetterIndex: number;
};

const initialState = {
  showComponent: false,
  smileyAnimation: false,
  endAnimation: false,
  endAnimationLetterIndex: WELCOME.length + BACK.length,
} satisfies WelcomeBackState as WelcomeBackState;

export const welcomeBackSlice = createSlice({
  name: "welcomeBack",
  reducerPath: "welcomeBackSlice",
  initialState,
  reducers: {
    setShowComponent: (state, action) => {
      state.showComponent = action.payload;
    },
    setSmileyAnimation: (state, action) => {
      state.smileyAnimation = action.payload;
    },
    setEndAnimation: (state, action) => {
      state.endAnimation = action.payload;
    },
    setEndAnimationLetterIndex: (state, action) => {
      state.endAnimationLetterIndex = action.payload;
    },
  },
});

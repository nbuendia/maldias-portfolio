import { createSlice } from "@reduxjs/toolkit";
import { BACK, WELCOME } from "@/lib/constants";

interface WelcomeBackState {
  showWelcomeBack: boolean;
  smileyAnimation: boolean;
  endAnimation: boolean;
  endAnimationLetterIndex: number;
};

const initialState = {
  showWelcomeBack: false,
  smileyAnimation: false,
  endAnimation: false,
  endAnimationLetterIndex: WELCOME.length + BACK.length,
} satisfies WelcomeBackState as WelcomeBackState;

export const welcomeBackSlice = createSlice({
  name: "welcomeBack",
  reducerPath: "welcomeBackSlice",
  initialState,
  reducers: {
    setShowWelcomeBack: (state, action) => {
      state.showWelcomeBack = action.payload;
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

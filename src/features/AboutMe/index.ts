import { aboutMeSlice } from "./AboutMe";

export { aboutMeSlice };

export const {
  setShowWhoami,
  setStartWhoamiAnimation,
  setShowTechStack,
  setStartTechStackAnimation,
} = aboutMeSlice.actions;

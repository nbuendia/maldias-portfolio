import { createSlice } from "@reduxjs/toolkit";

interface MainState {
  terminalView: string;
  showComponent: boolean;
}

const initialState = {
  terminalView: "about",
  showComponent: false,
} satisfies MainState as MainState;

export const mainSlice = createSlice({
  name: "main",
  reducerPath: "mainSlice",
  initialState,
  reducers: {
    setTerminalView: (state, action) => {
      state.terminalView = action.payload;
    },
    setShowComponent: (state, action) => {
      state.showComponent = action.payload;
    },
  },
});

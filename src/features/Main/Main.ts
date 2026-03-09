import { createSlice } from "@reduxjs/toolkit";

interface MainState {
  showComponent: boolean;
}

const initialState = {
  showComponent: false,
} satisfies MainState as MainState;

export const mainSlice = createSlice({
  name: "main",
  reducerPath: "mainSlice",
  initialState,
  reducers: {
    setShowComponent: (state, action) => {
      state.showComponent = action.payload;
    },
  },
});

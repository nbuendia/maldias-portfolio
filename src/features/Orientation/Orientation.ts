import { createSlice } from "@reduxjs/toolkit";

export interface Orientation {
  orientation: string,
  angle: number
}

const initialState = {
  orientation: {} as Orientation,
};

export const orientationSlice = createSlice({
  name: "orientation",
  reducerPath: "orientationSlice",
  initialState,
  reducers: {
    setOrientation: (state, action) => {
      state.orientation = {
        ...state.orientation,
        ...action.payload,
      }
    },
  },
});

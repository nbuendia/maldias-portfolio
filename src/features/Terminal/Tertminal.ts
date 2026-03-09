import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  terminal: "about",
};

export const terminalSlice = createSlice({
  name: "terminal",
  reducerPath: "terminalSlice",
  initialState,
  reducers: {
    setTerminal: (state, action) => {
      state.terminal = action.payload;
    },
  },
});

import { createSlice } from "@reduxjs/toolkit";

interface CommandBarState {
  cmd: string;
}

const initialState = {
  cmd: '',
} satisfies CommandBarState as CommandBarState;

export const commandBarSlice = createSlice({
  name: "commandBar",
  reducerPath: "commandBarSlice",
  initialState,
  reducers: {
    setInput: (state, action) => {
      state.cmd = action.payload;
    },
  },
});

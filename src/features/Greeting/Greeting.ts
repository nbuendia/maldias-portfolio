import { createSlice } from "@reduxjs/toolkit";

interface GreetingState {
  showComponent: boolean;
  isGreetingEnding: boolean;
}

const initialState = { 
  showComponent: false,
  isGreetingEnding: false,
} satisfies GreetingState as GreetingState;

export const greetingSlice = createSlice({
  name: "greeting",
  reducerPath: "greetingSlice",
  initialState,
  reducers: {
    setShowComponent: (state, action) => {
        state.showComponent = action.payload;
    },
    setIsGreetingEnding: (state, action) => {
      state.isGreetingEnding = action.payload;
    },
  },
});

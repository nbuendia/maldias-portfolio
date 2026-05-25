import { createSlice } from "@reduxjs/toolkit";

interface GreetingState {
  showGreeting: boolean;
  isGreetingEnding: boolean;
}

const initialState = { 
  showGreeting: false,
  isGreetingEnding: false,
} satisfies GreetingState as GreetingState;

export const greetingSlice = createSlice({
  name: "greeting",
  reducerPath: "greetingSlice",
  initialState,
  reducers: {
    setShowGreeting: (state, action) => {
        state.showGreeting = action.payload;
    },
    setIsGreetingEnding: (state, action) => {
      state.isGreetingEnding = action.payload;
    },
  },
});

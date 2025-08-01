import { createSlice } from "@reduxjs/toolkit";

interface ToastState {
  displayToast: boolean;
  messageToast: string;
}

const initialState = {
  displayToast: false,
  messageToast: "Unknown command was entered",
} satisfies ToastState as ToastState;

export const toastSlice = createSlice({
  name: "toast",
  reducerPath: "toastSlice",
  initialState,
  reducers: {
    setDisplayToast: (state, action) => {
      state.displayToast = action.payload;
    },
    setMessageToast: (state, action) => {
      state.messageToast = action.payload;
    },
  },
});

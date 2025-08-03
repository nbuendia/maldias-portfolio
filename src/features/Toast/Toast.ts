import { Toast } from "@/components/Toast";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Toast {
  id: number;
  message: string;
}

const initialState = {
  toasts: [] as Toast[],
}

export const toastSlice = createSlice({
  name: "toast",
  reducerPath: "toastSlice",
  initialState: initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state) => {
      state.toasts.shift();
    },
    removeToastById: (state, action: PayloadAction<number>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

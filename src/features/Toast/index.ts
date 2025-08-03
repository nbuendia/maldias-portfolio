import { toastSlice } from "./Toast";

export { toastSlice };
export type { Toast } from "./Toast";

export const { addToast, removeToast, removeToastById } = toastSlice.actions;

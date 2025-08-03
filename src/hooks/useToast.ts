import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { addToast, removeToast, removeToastById } from "@/features/Toast";

export function useToast() {
  const dispatch = useDispatch();
  const toasts = useSelector((state: RootState) => state.toastSlice.toasts);

  const handleOnCloseToast = (id: number) => {
    dispatch(removeToastById(id));
  };

  const handleToast = useCallback((message?: string) => {
    const toast = {
      id: Date.now(),
      message: message || "Unknown command was entered.",
    };
      
    dispatch(addToast(toast));
  
    const toastTimeout = setTimeout(() => {
      dispatch(removeToast());
    }, 5000);
  
    return () => clearTimeout(toastTimeout);
  }, [dispatch]);

  return { toasts, handleToast, handleOnCloseToast };
}

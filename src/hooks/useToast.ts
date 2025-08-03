import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setDisplayToast, setMessageToast } from "@/features/Toast";

export function useToast() {
  const dispatch = useDispatch();
  const displayToast = useSelector((state: RootState) => state.toastSlice.displayToast);
  const messageToast = useSelector((state: RootState) => state.toastSlice.messageToast);

  const handleOnCloseToast = () => {
    dispatch(setDisplayToast(false));
  };

  const handleToast = useCallback((message?: string) => {
    const toastMessage = message ? message : `Unknown command was entered.`;
      
    dispatch(setMessageToast(toastMessage));
    dispatch(setDisplayToast(true));
  
    const toastTimeout = setTimeout(() => {
      dispatch(setDisplayToast(false));
    }, 5000);
  
    return () => clearTimeout(toastTimeout);
  }, [dispatch]);

  return { displayToast, messageToast, handleToast, handleOnCloseToast };
}

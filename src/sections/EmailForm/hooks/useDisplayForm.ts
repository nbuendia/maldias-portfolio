import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setDisplayForm } from "@/features/EmailForm";

export function useDisplayForm() {
  const dispatch = useDispatch();
  const displayForm = useSelector((state: RootState) => state.emailFormSlice.displayForm);

  const handleDisplayForm = useCallback((state: boolean) => {
    dispatch(setDisplayForm(state));
  }, [dispatch]);

  return { displayForm, handleDisplayForm };
}

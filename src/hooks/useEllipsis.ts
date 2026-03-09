import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { setShowEllipsis } from "@/features/Ellipsis";


export function useEllipsis() {
  const dispatch = useDispatch();

  const handleShowEllipsis = useCallback((state: boolean) => {
    dispatch(setShowEllipsis(state));
  }, [dispatch]);

  return {
    handleShowEllipsis,
  }
}

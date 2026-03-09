import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setShowEllipsis } from "@/features/Ellipsis";
import { RootState } from "@/store";


export function useEllipsis() {
  const dispatch = useDispatch();
  const showEllipsis = useSelector((state: RootState) => state.ellipsisSlice.showEllipsis);

  const handleShowEllipsis = useCallback((state: boolean) => {
    dispatch(setShowEllipsis(state));
  }, [dispatch]);

  return {
    showEllipsis,
    handleShowEllipsis,
  }
}

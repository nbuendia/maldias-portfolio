import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setShowGreeting } from "@/features/Greeting";

export function useShowGreeting() {
  const dispatch = useDispatch();
  const showGreeting = useSelector((state: RootState) => state.greetingSlice.showGreeting);

  const handleShowGreeting = useCallback((state: boolean) => {
    dispatch(setShowGreeting(state));
  }, [dispatch]);

  return {showGreeting, handleShowGreeting};
}

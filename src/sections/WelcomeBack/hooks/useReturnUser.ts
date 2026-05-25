import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setShowWelcomeBack } from "@/features/WelcomeBack";

export function useReturnUser() {
  const dispatch = useDispatch();
  const showWelcomeBack = useSelector((state: RootState) => state.welcomeBackSlice.showWelcomeBack);

  useEffect(() => {
    const returnUser = localStorage.getItem("isReturnUser");
    if (!returnUser) localStorage.setItem("isReturnUser", "true");
    else dispatch(setShowWelcomeBack(true));
  }, [dispatch]);

  return { showWelcomeBack };
}

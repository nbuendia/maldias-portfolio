import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setShowComponent } from "@/features/Main";

import { useShowGreeting } from "@/sections/Greeting/hooks";

export function useMain() {
  const dispatch = useDispatch();
  const showComponent = useSelector((state: RootState) => state.mainSlice.showComponent);
  const showWelcomeBack = useSelector((state: RootState) => state.welcomeBackSlice.showWelcomeBack);
  const {showGreeting} = useShowGreeting();

  useEffect(() => {
    dispatch(setShowComponent(!showGreeting && !showWelcomeBack));
  }, [dispatch, showGreeting, showWelcomeBack]);
  
  return {
    showComponent,
  };
}

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setShowComponent } from "@/features/Main";

import { useShowGreeting } from "@/sections/Greeting/hooks";

export function useMain() {
  const dispatch = useDispatch();
  const showComponent = useSelector((state: RootState) => state.mainSlice.showComponent);
  const showWelcomeComponent = useSelector((state: RootState) => state.welcomeBackSlice.showComponent);
  const {showGreeting} = useShowGreeting();

  useEffect(() => {
    dispatch(setShowComponent(!showGreeting && !showWelcomeComponent));
  }, [dispatch, showGreeting, showWelcomeComponent]);
  
  return {
    showComponent,
  };
}

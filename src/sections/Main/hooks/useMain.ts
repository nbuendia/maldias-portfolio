import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setShowComponent } from "@/features/Main";

export function useMain() {
  const dispatch = useDispatch();

  const showComponent = useSelector((state: RootState) => state.mainSlice.showComponent);
  const showGreetingComponent = useSelector((state: RootState) => state.greetingSlice.showComponent);
  const showWelcomeComponent = useSelector((state: RootState) => state.welcomeBackSlice.showComponent);

  useEffect(() => {
    dispatch(setShowComponent(!showGreetingComponent && !showWelcomeComponent));
  }, [dispatch, showGreetingComponent, showWelcomeComponent]);
  
  return {
    showComponent,
  };
}

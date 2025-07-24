import { setShowComponent, setTerminalView } from "@/features/Main";
import { RootState } from "@/store";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function useMain() {
  const dispatch = useDispatch();
  const terminalView = useSelector((state: RootState) => state.mainSlice.terminalView);
  const showComponent = useSelector((state: RootState) => state.mainSlice.showComponent);
  const showGreetingComponent = useSelector((state: RootState) => state.greetingSlice.showComponent);
  const showWelcomeComponent = useSelector((state: RootState) => state.welcomeBackSlice.showComponent);
  
  useEffect(() => {
    dispatch(setShowComponent(!showGreetingComponent && !showWelcomeComponent));
  }, [dispatch, showGreetingComponent, showWelcomeComponent]);

  const handleTerminalView = useCallback((state: string) => {
    dispatch(setTerminalView(state));
  }, [dispatch]);
  
  return {terminalView, showComponent, handleTerminalView};
}

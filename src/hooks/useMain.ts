import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { TERMINAL_VIEWS } from "@/lib/constants";
import { setShowComponent, setTerminalView } from "@/features/Main";
import { setDisplayToast, setMessageToast } from "@/features/Toast";

export function useMain() {
  const dispatch = useDispatch();
  const terminalView = useSelector((state: RootState) => state.mainSlice.terminalView);
  const showComponent = useSelector((state: RootState) => state.mainSlice.showComponent);
  const showGreetingComponent = useSelector((state: RootState) => state.greetingSlice.showComponent);
  const showWelcomeComponent = useSelector((state: RootState) => state.welcomeBackSlice.showComponent);

  useEffect(() => {
    dispatch(setShowComponent(!showGreetingComponent && !showWelcomeComponent));
  }, [dispatch, showGreetingComponent, showWelcomeComponent]);

  const handleTerminalView = useCallback((terminal: string) => {
    const isInTerminalList = TERMINAL_VIEWS.includes(terminal) && terminal;

    if (isInTerminalList) dispatch(setTerminalView(terminal));

    else if (!isInTerminalList) {
      dispatch(setMessageToast(`Unknown action was entered: ${terminal}`));
      dispatch(setDisplayToast(true));

      const toastTimeout = setTimeout(() => {
        dispatch(setDisplayToast(false));
      }, 5000);
        
      return () => clearTimeout(toastTimeout);
    }
  }, [dispatch]);
  
  return {showComponent, terminalView, handleTerminalView};
}

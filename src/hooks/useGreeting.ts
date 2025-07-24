import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setShowComponent, setIsGreetingEnding } from "@/features/Greeting";

export function useGreeting() {
  const dispatch = useDispatch();
  const showComponent = useSelector((state: RootState) => state.greetingSlice.showComponent);
  const endGreeting = useSelector((state: RootState) => state.greetingSlice.isGreetingEnding);

  useEffect(() => {
    const isReturnUser = localStorage.getItem("isReturnUser");
    if (!isReturnUser) dispatch(setShowComponent(true));
  }, [dispatch]);

  const handleShowComponent = useCallback((state: boolean) => {
    dispatch(setShowComponent(state));
  }, [dispatch]);

  const handleEndAnimation = useCallback(() => {
    dispatch(setIsGreetingEnding(true));
      
    const timer = setTimeout(() => {
      handleShowComponent(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [dispatch, handleShowComponent]);
    
  return { showComponent, endGreeting, handleEndAnimation };
}

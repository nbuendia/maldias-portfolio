import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { setShowGreeting, setIsGreetingEnding } from "@/features/Greeting";
import { useShowGreeting } from "@/sections/Greeting/hooks";

export function useGreeting() {
  const dispatch = useDispatch();
  const endGreeting = useSelector((state: RootState) => state.greetingSlice.isGreetingEnding);

  const {handleShowGreeting} = useShowGreeting();

  const handleEndAnimation = useCallback(() => {
    dispatch(setIsGreetingEnding(true));
      
    const timer = setTimeout(() => {
      handleShowGreeting(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [dispatch, handleShowGreeting]);

  useEffect(() => {
    const isReturnUser = localStorage.getItem("isReturnUser");
    if (!isReturnUser) dispatch(setShowGreeting(true));
  }, [dispatch]);
    
  return { endGreeting, handleEndAnimation };
}

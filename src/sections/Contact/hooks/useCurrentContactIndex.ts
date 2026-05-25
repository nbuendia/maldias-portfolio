import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";

import { CONTACT_INFO } from "@/lib/constants";
import { setCurrentContactIndex } from "@/features/ContactMe";

export function useCurrentContactIndex() {
  const dispatch = useDispatch();
  const showContactInfo = useSelector((state: RootState) => state.contactMeSlice.showContactInfo);
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);

  const handleCurrentContactIndex = useCallback((state: number) => {
    dispatch(setCurrentContactIndex(currentContactIndex + state));
  }, [dispatch, currentContactIndex]);
  
  useEffect(() => {
    const elem = document.getElementById("contact");
    elem?.scrollTo(0, elem?.scrollHeight);
  
    const delay = currentContactIndex === -1 ? 500 
      : currentContactIndex === 0 ? 2000 : 2500;
      
    if (!showContactInfo) return;
    
    if (currentContactIndex < CONTACT_INFO.length - 1) {
      const currentContactIndexTimeout = setTimeout(() => {
        handleCurrentContactIndex(1);
      }, delay);
    
      return () => clearTimeout(currentContactIndexTimeout);
    }
  });
}

import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { CONTACT_INFO } from "@/lib/constants/ContactConstants";
import { setCurrentContactIndex, setShowContactInfo, setShowContactInfoSection } from "@/features/ContactMe";

export function useConactMeInfo() {
  const dispatch = useDispatch();
  const showContactInfoSection = useSelector((state: RootState) => state.contactMeSlice.showContactInfoSection);
  const showContactInfo = useSelector((state: RootState) => state.contactMeSlice.showContactInfo);
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);

  const handleContactInfoStateReset = useCallback(() => {
    dispatch(setShowContactInfoSection(false));
    dispatch(setShowContactInfo(false));
    dispatch(setCurrentContactIndex(-1));
  }, [dispatch]);

  const handleShowContactInfo = () => {
    dispatch(setShowContactInfo(true));
  };

  const handleCurrentContactIndex = useCallback((state: number) => {
    dispatch(setCurrentContactIndex(currentContactIndex + state));
  }, [dispatch, currentContactIndex]);

  useEffect(() => {
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

  return {showContactInfoSection, showContactInfo, currentContactIndex, handleShowContactInfo, handleContactInfoStateReset};
}

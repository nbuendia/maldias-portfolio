import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setShowContactAscii,
  setShowContactInfo,
  setShowContactInfoSection,
  setShowContactSection,
  setStartAsciiScrollAnim,
} from "@/features/ContactMe";

export function useContact() {
  const dispatch = useDispatch();

  const handleShowContactAscii = useCallback(() => {
    dispatch(setShowContactAscii(true));
    
    const showContactInfoSectionTimeout = setTimeout(() => {
      dispatch(setShowContactInfoSection(true));
    }, 1000);

    return () => clearTimeout(showContactInfoSectionTimeout);
  }, [dispatch]);

  const handleShowContactInfo = useCallback(() => {
    dispatch(setShowContactInfo(true));
  }, [dispatch]);
  
  useEffect(() => {
    const showContactSectionTimeout = setTimeout(() => {
      dispatch(setShowContactSection(true));
    }, 1000);
  
    return () => clearTimeout(showContactSectionTimeout);
  }, [dispatch]);

  return {
    handleShowContactAscii,
    handleShowContactInfo,
    setStartAsciiScrollAnim,
  };
}

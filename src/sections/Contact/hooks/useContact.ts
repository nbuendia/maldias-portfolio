import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  setShowContactInfo,
  setShowContactInfoSection,
} from "@/features/ContactMe";

export function useContact() {
  const dispatch = useDispatch();

  const handleShowContactInfo = useCallback(() => {
    const showContactInfoTimeout = setTimeout(() => {
      dispatch(setShowContactInfo(true));
    }, 4000);

    return () => clearTimeout(showContactInfoTimeout);
  }, [dispatch]);
  
  useEffect(() => {
    const showContactSectionTimeout = setTimeout(() => {
      dispatch(setShowContactInfoSection(true));
    }, 1000);
  
    return () => clearTimeout(showContactSectionTimeout);
  }, [dispatch]);

  return {
    handleShowContactInfo,
  };
}

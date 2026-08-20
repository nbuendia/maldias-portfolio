import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  setShowContactInfo,
  setShowContactInfoSection,
} from "@/features/ContactMe";

export function useContact() {
  const dispatch = useDispatch();
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const handleShowContactInfo = useCallback(() => {
    const showContactInfoTimeout = setTimeout(() => {
      dispatch(setShowContactInfo(true));
    }, 4000);

    timeouts.current.push(showContactInfoTimeout);
  }, [dispatch]);
  
  useEffect(() => {
    const showContactSectionTimeout = setTimeout(() => {
      dispatch(setShowContactInfoSection(true));
    }, 1000);
  
    return () => clearTimeout(showContactSectionTimeout);
  }, [dispatch]);

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
      timeouts.current = [];
    }
  }, [timeouts]);

  return {
    handleShowContactInfo,
  };
}

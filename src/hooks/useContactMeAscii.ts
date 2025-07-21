import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { setShowContactAscii, setShowContactInfoSection, setShowContactSection } from "@/features/ContactMe";

export function useContactMeAscii() {
  const dispatch = useDispatch();
  const showContactSection = useSelector((state: RootState) => state.contactMeSlice.showContactSection);
  const showContactAscii = useSelector((state: RootState) => state.contactMeSlice.showContactAscii);

  const handleContactStateRest = useCallback(() => {
    dispatch(setShowContactSection(false));
    dispatch(setShowContactAscii(false));
  }, [dispatch]);

  const handleShowContactAscii = () => {
    dispatch(setShowContactAscii(true));

    const showContactInfoSectionTimeout = setTimeout(() => {
      dispatch(setShowContactInfoSection(true));
    }, 1000);

    return () => clearTimeout(showContactInfoSectionTimeout)
  }

  useEffect(() => {
    const showContactSectionTimeout = setTimeout(() => {
      dispatch(setShowContactSection(true));
    }, 1000);

    return () => clearTimeout(showContactSectionTimeout);
  }, [dispatch]);

    return {showContactSection, showContactAscii, handleShowContactAscii, handleContactStateRest};
}

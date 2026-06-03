import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useContactState() {
  const showContactInfoSection = useSelector((state: RootState) => state.contactMeSlice.showContactInfoSection);
  const showContactInfo = useSelector((state: RootState) => state.contactMeSlice.showContactInfo);
  const showEmailSection = useSelector((state: RootState) => state.contactMeSlice.showEmailSection);
  const sendEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.sendEmailPrompts);
  const noEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.noEmailPrompts);

  return {
    showContactInfoSection,
    showContactInfo,
    showEmailSection,
    sendEmailPrompts,
    noEmailPrompts,
  };
}

import { useSelector } from "react-redux";
import { RootState } from "@/store";

export function useContactState() {
  const showContactSection = useSelector((state: RootState) => state.contactMeSlice.showContactSection);
  const showContactAscii = useSelector((state: RootState) => state.contactMeSlice.showContactAscii);
  const showContactInfoSection = useSelector((state: RootState) => state.contactMeSlice.showContactInfoSection);
  const showContactInfo = useSelector((state: RootState) => state.contactMeSlice.showContactInfo);
  const currentContactIndex = useSelector((state: RootState) => state.contactMeSlice.currentContactIndex);
  const showEmailSection = useSelector((state: RootState) => state.contactMeSlice.showEmailSection);
  const startAsciiScrollAnim = useSelector((state: RootState) => state.contactMeSlice.startAsciiScrollAnim);
  const sendEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.sendEmailPrompts);
  const noEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.noEmailPrompts);
  const yesEmailPrompts = useSelector((state: RootState) => state.contactMeSlice.yesEmailPrompts);

  return {
    showContactSection,
    showContactAscii,
    showContactInfoSection,
    showContactInfo,
    currentContactIndex,
    showEmailSection,
    startAsciiScrollAnim,
    sendEmailPrompts,
    noEmailPrompts,
    yesEmailPrompts,
  };
}

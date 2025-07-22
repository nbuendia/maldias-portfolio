import { contactMeSlice } from "./ContactMe";

export { contactMeSlice };
export type { UserInfo, YesEmailPrompts } from "./ContactMe";

export const {
  setShowContactSection,
  setShowContactAscii,
  setShowContactInfoSection,
  setShowContactInfo,
  setCurrentContactIndex,
  setShowEmailSection,
  setTriggerNoEmail,
  setTriggerEmailAnimation,
  setYesEmailPrompts,
  setUserInfo,
} = contactMeSlice.actions;

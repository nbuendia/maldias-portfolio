import { contactMeSlice } from "./ContactMe";

export { contactMeSlice };
export type { UserInfo, NoEmailPrompts, YesEmailPrompts } from "./ContactMe";

export const {
  setShowContactSection,
  setShowContactAscii,
  setShowContactInfoSection,
  setShowContactInfo,
  setCurrentContactIndex,
  setShowEmailSection,
  setTriggerEmailAnimation,
  setNoEmailPrompts,
  setYesEmailPrompts,
  setUserInfo,
} = contactMeSlice.actions;

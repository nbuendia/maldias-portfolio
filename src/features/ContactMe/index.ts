import { contactMeSlice } from "./ContactMe";

export { contactMeSlice };
export type { SendEmailPrompts, NoEmailPrompts, YesEmailPrompts } from "./ContactMe";

export const {
  setShowContactSection,
  setShowContactAscii,
  setShowContactInfoSection,
  setShowContactInfo,
  setCurrentContactIndex,
  setShowEmailSection,
  setSendEmailPrompts,
  setNoEmailPrompts,
  setYesEmailPrompts,
} = contactMeSlice.actions;

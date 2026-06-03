import { contactMeSlice } from "./ContactMe";

export { contactMeSlice };
export type { SendEmailPrompts, NoEmailPrompts, YesEmailPrompts } from "./ContactMe";

export const {
  setShowContactInfoSection,
  setShowContactInfo,
  setShowEmailSection,
  setSendEmailPrompts,
  setNoEmailPrompts,
  setYesEmailPrompts,
} = contactMeSlice.actions;

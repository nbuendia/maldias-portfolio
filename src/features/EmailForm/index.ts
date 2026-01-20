import { emailFormSlice } from "./EmailForm";

export { emailFormSlice };
export type { UserInfo } from "./EmailForm";

export const { setIsSubmitDisabled, setUserFormInfo, setDisplayForm, setIsSubmitLoading } = emailFormSlice.actions;

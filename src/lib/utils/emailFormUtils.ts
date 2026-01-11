import { NoEmailPrompts, YesEmailPrompts } from "@/features/ContactMe";

export function triggerCancelEmail(
  handleDisplayForm: (state: boolean) => void,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
  handleShowEllipsis: (state: boolean) => void,
  handleNoEmailPrompts: (key: keyof NoEmailPrompts, value: boolean) => void,
) {
  handleDisplayForm(false);
  handleYesEmailPrompts("triggerYesEmail", false);
  handleShowEllipsis(true);

  const triggerEllipsisDisplayOff = setTimeout(() => 
    handleShowEllipsis(false), 2000);

  const triggerNoEmailActions = setTimeout(() =>
    handleNoEmailPrompts("triggerNoEmail", true), 2500);

  return () => {
    clearTimeout(triggerEllipsisDisplayOff);
    clearTimeout(triggerNoEmailActions);
  }    
}

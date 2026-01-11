import { YesEmailPrompts } from "@/features/ContactMe";
import { NoEmailPrompts, SendEmailPrompts } from "@/features/ContactMe";

export function triggerResetEmailPrompt(
  handleShowEllipsis: (state: boolean) => void,
  handleNoEmailPrompts: (key: keyof NoEmailPrompts, value: boolean) => void,
  handleSendEmailPrompts: (key: keyof SendEmailPrompts, value: boolean) => void,
) {

    handleNoEmailPrompts("triggerNoEmail", false);
    handleShowEllipsis(true);

    const hideEllipsisTimeout = setTimeout(() =>
      handleShowEllipsis(false), 2000);

    const sendEmailPromptTimeout = setTimeout(() =>
      handleSendEmailPrompts("sendEmailPrompt", true), 2500);

    return () => {
      clearTimeout(hideEllipsisTimeout);
      clearTimeout(sendEmailPromptTimeout);
    }
}

export function triggerNoEmailAction(
  yesEmailPrompts: YesEmailPrompts,
  handleSendEmailPrompts: (key: keyof SendEmailPrompts, value: boolean) => void,
  handleNoEmailPrompts: (key: keyof NoEmailPrompts, value: boolean) => void,
) {
  if (yesEmailPrompts.triggerYesEmail) return;
  handleSendEmailPrompts("triggerEmailAnimation", true);
  
  const triggerActionsTimeout = setTimeout(() => {
    handleSendEmailPrompts("sendEmailPrompt", false);
    handleNoEmailPrompts("triggerNoEmail", true);
    handleSendEmailPrompts("triggerEmailAnimation", false);
  }, 2000);
        
  return () => clearTimeout(triggerActionsTimeout);
}

export function triggerYesEmailAction(
  noEmailPrompts: NoEmailPrompts,
  handleSendEmailPrompts: (key: keyof SendEmailPrompts, value: boolean) => void,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
) {
  if (noEmailPrompts.triggerNoEmail) return;
  handleSendEmailPrompts("triggerEmailAnimation", true);
  
  const YesEmailPromptsTimeout = setTimeout(() => {
    handleSendEmailPrompts("sendEmailPrompt", false);
    handleYesEmailPrompts("triggerYesEmail", true);
    handleSendEmailPrompts("triggerEmailAnimation", false);
  }, 2000)
  
  return () => clearTimeout(YesEmailPromptsTimeout);
}

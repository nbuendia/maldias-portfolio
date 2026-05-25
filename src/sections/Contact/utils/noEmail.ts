import { YesEmailPrompts } from "@/features/ContactMe";
import { NoEmailPrompts, SendEmailPrompts } from "@/features/ContactMe";

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

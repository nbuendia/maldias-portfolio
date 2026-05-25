import { YesEmailPrompts } from "@/features/ContactMe";
import { NoEmailPrompts, SendEmailPrompts } from "@/features/ContactMe";

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

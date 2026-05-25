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

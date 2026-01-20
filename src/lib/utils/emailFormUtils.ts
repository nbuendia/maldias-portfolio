import { NoEmailPrompts, SendEmailPrompts, YesEmailPrompts } from "@/features/ContactMe";

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

export function triggerSendEmail(
  handleSubmitLoading: (state: boolean) => void,
  handleDisplayForm: (state: boolean) => void,
  handleYesEmailPrompts: (key: keyof YesEmailPrompts, value: boolean) => void,
  handleSendEmailPrompts: (key: keyof SendEmailPrompts, value: boolean) => void,
  handleClearUserInfo: () => void,
  handleShowEllipsis: (state: boolean) => void,
) {
  const triggerSubmitLoadingTimeout = setTimeout(() => {
    handleDisplayForm(false);
    handleYesEmailPrompts("triggerYesEmail", false);
    handleClearUserInfo();
    handleSubmitLoading(false);
  }, 2000);
  
  const triggerEllipsisDisplayTimeout = setTimeout(() =>
    handleShowEllipsis(true), 2250)

  const triggerEllipsisDisplayOffTimeout = setTimeout(() =>
    handleShowEllipsis(false), 4250);
  
  const triggerSentEmailConfrimationTimeout = setTimeout(() =>
    handleSendEmailPrompts("sentEmailConfrimation", true), 4750);

  return () => {
    clearTimeout(triggerSubmitLoadingTimeout);
    clearTimeout(triggerEllipsisDisplayTimeout);
    clearTimeout(triggerEllipsisDisplayOffTimeout);
    clearTimeout(triggerSentEmailConfrimationTimeout);
  }
    
}

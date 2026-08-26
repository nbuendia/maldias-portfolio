import { MouseEvent } from "react";

export function triggerPromptAction(handleMobileOptions: (input: string) => void) {
  const handlePromptClick = (e: MouseEvent) => {
    const elem = e.target as HTMLElement;
    const userResponse = elem.innerText.toLowerCase(); 
    
    if (userResponse === "yes") handleMobileOptions("y");
    if (userResponse === "no") handleMobileOptions("n");
  };

  const handleResetClick = () => {
    handleMobileOptions("--reset send-email");
  }

  return { 
    handlePromptClick,
    handleResetClick,
  }
}

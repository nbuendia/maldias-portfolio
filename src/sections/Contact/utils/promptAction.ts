import { MouseEvent } from "react";

function disableOnClick(e: MouseEvent) {
  const elem = e.target as HTMLElement;
  const buttonList = elem.parentElement && [...elem.parentElement.children];

  buttonList?.forEach((button) => {
    (button as HTMLElement).style.pointerEvents = "none";
    (button as HTMLElement).style.opacity = "0.5";
  });
}

export function triggerPromptAction(handleMobileOptions: (input: string) => void) {
  const handlePromptClick = (e: MouseEvent) => {
    const elem = e.target as HTMLElement;
    const userResponse = elem.innerText.toLowerCase();  
    
    disableOnClick(e);

    if (userResponse === "yes") handleMobileOptions("y");
    if (userResponse === "no") handleMobileOptions("n");
  };

  const handleResetClick = (e: MouseEvent) => {
    disableOnClick(e)
    handleMobileOptions("--reset send-email");
  }

  return { 
    handlePromptClick,
    handleResetClick,
  }
}

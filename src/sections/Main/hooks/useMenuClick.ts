import { useState } from "react";

export function useMenuClick(handleCommand: (cmd: string) => void) {
  const [input, setInput] = useState("");

  function handleMenuItemClick(cmd: string) {
    const typingDelay = cmd.length * 100 + 200;
    let count = 1;

    const addLetterInterval = setInterval(() => {
      setInput(cmd.slice(0, count));
      count++;

      if (count > cmd.length) clearInterval(addLetterInterval);
    }, 100);

    setTimeout(() => {
      setInput("");
      handleCommand(cmd);
    }, typingDelay);
  }

  return {
    input,
    setInput,
    handleMenuItemClick,
  };
};

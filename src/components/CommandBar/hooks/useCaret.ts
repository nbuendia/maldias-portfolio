import { RefObject, useEffect, useState } from "react";

export function useCaret(inputRef: RefObject<HTMLDivElement | null>) {
  const [activeCaret, setActiveCaret] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      setActiveCaret(true);
  
      inputRef.current.addEventListener("focusout", () => setActiveCaret(false));
      inputRef.current.addEventListener("focusin", () => setActiveCaret(true));
    }
  }, []);

  return { activeCaret };
}

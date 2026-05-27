import { KeyboardEvent } from "react";

export function handleArrowLeft(
  event: KeyboardEvent<HTMLDivElement>,
  currentPosition: number,
  setCaretPosition: (position: number) => void
) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    
    if (currentPosition !== 0)
      setCaretPosition(currentPosition - 1);
  }
}

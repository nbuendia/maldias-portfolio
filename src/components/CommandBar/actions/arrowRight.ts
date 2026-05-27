import { KeyboardEvent } from "react";

export function handleArrowRight(
  event: KeyboardEvent<HTMLDivElement>,
  input: string,
  currentPosition: number,
  setCaretPosition: (position: number) => void,
) {
  if (event.key === "ArrowRight") {
    event.preventDefault();

    if (currentPosition < input.length)
      setCaretPosition(currentPosition + 1);
  }
}

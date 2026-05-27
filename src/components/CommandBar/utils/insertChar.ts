export function handleInsertChar(
  char: string,
  input: string,
  setInput: (next: string) => void,
  caretPosition: number,
  setCaretPosition: (position: number) => void,
) {
  let newInput = input.split("");
  newInput.splice(caretPosition, 0, char);

  setInput(newInput.join(""));
  setCaretPosition(caretPosition + 1);
}

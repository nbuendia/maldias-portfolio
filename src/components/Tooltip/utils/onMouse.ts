export function onMouseEnter(
  handleHover: (status: boolean) => void,
  handleExitHover: (status: boolean) => void,
) {
  handleHover(true);
  handleExitHover(false);
}

export function onMouseLeave(
  handleHover: (status: boolean) => void,
  handleExitHover: (status: boolean) => void,
) {
  handleHover(false);
  handleExitHover(true);
}

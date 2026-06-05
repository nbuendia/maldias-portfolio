export function handleMenuClick(
  isDropdownOpen: boolean,
  setIsDropdownOpen: (status: boolean) => void,
) {
  setIsDropdownOpen(!isDropdownOpen);
}

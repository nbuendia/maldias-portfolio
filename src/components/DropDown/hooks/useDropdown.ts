import { RefObject, useEffect, useState } from "react";

export function useDropdown(
  dropdownRef: RefObject<HTMLDivElement | null>,
  menuItemsRef: RefObject<HTMLDivElement | null>,
) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (dropdownRef.current && menuItemsRef.current
        && !dropdownRef.current.contains(event.target as Node) 
        && !menuItemsRef.current.contains(event.target as Node))
        setIsDropdownOpen(false);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return { isDropdownOpen, setIsDropdownOpen };
}

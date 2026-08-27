import { RefObject, useEffect, useState } from "react";

export function useDropdownStyles(
  dropdownRef: RefObject<HTMLDivElement | null>,
  menuItemsRef: RefObject<HTMLDivElement | null>,
) {
  const [listWidth, setListWidth] = useState<string | null>(null);
  const [listHeight, setListHeight] = useState<string | null>(null);

  useEffect(() => {
    if (dropdownRef.current && menuItemsRef.current) {
      const boundingClientRect = dropdownRef.current.getBoundingClientRect();
      const maxHeight = menuItemsRef.current.scrollHeight;
      const width = boundingClientRect.width;

      setListWidth(width + "px");
      setListHeight(maxHeight + "px");
    }
  }, [dropdownRef, menuItemsRef]);

  return { listWidth, listHeight };
}

import { RefObject, useEffect, useState } from "react";

export function useDropdownStyles(
  dropdownRef: RefObject<HTMLDivElement | null>,
  menuItemsRef: RefObject<HTMLDivElement | null>,
) {
  const [listPosition, setListPosition] = useState<string | null>(null);
  const [listWidth, setListWidth] = useState<string | null>(null);
  const [listHeight, setListHeight] = useState<string | null>(null);

  useEffect(() => {
    if (dropdownRef.current && menuItemsRef.current) {
      const boundingClientRect = dropdownRef.current.getBoundingClientRect();
      const maxHeight = menuItemsRef.current.scrollHeight;

      const top = boundingClientRect.top;
      const height = boundingClientRect.height;
      const width = boundingClientRect.width;

      setListPosition(top + height + "px");
      setListWidth(width + "px");
      setListHeight(maxHeight + "px");
    }
  });

  return { listPosition, listWidth, listHeight };
}

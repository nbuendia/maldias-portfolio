import { RefObject, SetStateAction, useEffect, useRef } from "react";

export function useAsciiScroll(containerRef: RefObject<HTMLElement | null>, animStateSetter: (state: SetStateAction<boolean>) => void) {
  const observerRef = useRef<ResizeObserver | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const terminalPadding = parseFloat(
          window.getComputedStyle(entry.target).padding,
        );
        
        const artElem = entry.target.children.namedItem("art");
        if (!artElem) return;

        document.documentElement.style.setProperty("--ascii-art-width", `-${artElem.scrollWidth}px`);
        const isOverflowing = artElem.clientWidth <= artElem.scrollWidth - terminalPadding;
        
        animStateSetter(isOverflowing);
      }
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    }
  });
}

import { RefObject, SetStateAction, useEffect, useRef } from "react";

export function useAsciiScroll(containerRef: RefObject<HTMLElement | null>, animStateSetter: (state: SetStateAction<boolean>) => void) {
  const observerRef = useRef<ResizeObserver | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const elemPadding = parseFloat(
          window.getComputedStyle(entry.target).padding
        );
        
        const artElem = entry.target.children.namedItem("art") as HTMLElement | null;
        if (!artElem) return;

        const isScrollable = artElem.clientWidth <= artElem.scrollWidth - elemPadding;
        animStateSetter(isScrollable);
      }
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    }
  });
}

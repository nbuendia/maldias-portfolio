import { RefObject, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

export function useAsciiScroll(
  containerRef: RefObject<HTMLElement | null>,
  animStateSetter: ActionCreatorWithPayload<any, string>
) {
  const observerRef = useRef<ResizeObserver | null>(null);
  const dispatch = useDispatch();

  const handleAnimStateSetter = useCallback((state: boolean) => {
    dispatch(animStateSetter(state));
  }, [dispatch]);

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
        
        handleAnimStateSetter(isOverflowing);
      }
    });

    observerRef.current.observe(containerRef.current);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    }
  });
}

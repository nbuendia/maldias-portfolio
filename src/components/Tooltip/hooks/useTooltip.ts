import { RefObject, useEffect, useState } from "react";

export function useTooltip(
  tooltipRef: RefObject<HTMLSpanElement | null>,
  tooltipKidRefs: RefObject<HTMLSpanElement | null>,
  position: string,
) {
  const [isHovering, setIsHovering] = useState(false);
  const [exitHover, setExitHover] = useState(false);
  const [positionSpacing, setPositionSpacing] = useState<null | string>(null);
    
  useEffect(() => {    
    if (tooltipKidRefs?.current && tooltipRef?.current) {
      const tooltipSpecs = tooltipRef.current.getBoundingClientRect();
      const kidsSpecs = tooltipKidRefs.current.getBoundingClientRect();

      const kidLeft = kidsSpecs.left;
      const kidTop = kidsSpecs.top;
      const kidWidth = kidsSpecs.width;
      const kidHeight = kidsSpecs.height;

      const tooltipHeight = tooltipSpecs.height;
  
      if (position === "right") setPositionSpacing(kidLeft + kidWidth + "px");      
      if (position === "left") setPositionSpacing(kidLeft - (kidWidth/2) + "px");  
      if (position === "above") setPositionSpacing(kidTop - tooltipHeight - (kidHeight/2) + "px");  
      if (position === "below") setPositionSpacing(kidTop + (kidHeight) + "px");        
    }
  });

  return {
    isHovering,
    setIsHovering,
    exitHover,
    setExitHover,
    positionSpacing,
  };
}

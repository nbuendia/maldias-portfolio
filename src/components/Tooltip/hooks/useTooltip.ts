import { useEffect, useState } from "react";

export function useTooltip() {
  const [isHovering, setIsHovering] = useState(false);
  const [exitHover, setExitHover] = useState(false);
  const [positionSpacing, setPositionSpacing] = useState<null | string>(null);
    
  useEffect(() => {
    const elem = document.getElementById("children");
      
    if (elem) {
      const specs = elem?.getBoundingClientRect();
      const left = specs?.left;
      const width = specs?.width;
  
      setPositionSpacing(left + width + "px");      
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

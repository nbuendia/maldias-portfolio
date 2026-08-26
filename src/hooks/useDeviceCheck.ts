import { useEffect, useState } from "react";

export function useDeviceCheck() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const mobileRegex = /Mobi/i;
    const { userAgent, maxTouchPoints } = navigator;
  
    const isMobile = mobileRegex.test(userAgent);
    const hasTouchScreen = maxTouchPoints > 0;
  
    setIsMobileOrTablet(isMobile && hasTouchScreen);
  }, []);

  return { isMobileOrTablet };
}

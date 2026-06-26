import { useState, useEffect, useRef, useCallback } from 'react';

export function useBreakpoint(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  const prevMobile = useRef(window.innerWidth < breakpoint);

  const handleResize = useCallback(() => {
    const nowMobile = window.innerWidth < breakpoint;
    if (prevMobile.current !== nowMobile) {
      prevMobile.current = nowMobile;
      setIsMobile(nowMobile);
    }
  }, [breakpoint]);

  useEffect(() => {
    setIsMobile(window.innerWidth < breakpoint);
    const observer = new ResizeObserver(handleResize);
    observer.observe(document.documentElement);
    return () => observer.disconnect();
  }, [handleResize, breakpoint]);

  return isMobile;
}

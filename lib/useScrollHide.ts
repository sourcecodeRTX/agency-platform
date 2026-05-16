import { useEffect, useState, useRef } from 'react';

export function useScrollHide() {
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDirection = currentScrollY > lastScrollYRef.current ? 'down' : 'up';
          const isScrollingDown = scrollDirection === 'down';
          const scrollDelta = Math.abs(currentScrollY - lastScrollYRef.current);

          // Only hide/show after scrolling more than 10px
          if (scrollDelta > 10) {
            if (isScrollingDown && isVisible) {
              setIsVisible(false);
            } else if (!isScrollingDown && !isVisible && currentScrollY > 60) {
              setIsVisible(true);
            } else if (currentScrollY < 60) {
              setIsVisible(true);
            }

            lastScrollYRef.current = currentScrollY;
          }

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible]);

  return isVisible;
}

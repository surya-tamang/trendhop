import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0); // Current scroll position
  const [prevScrollPosition, setPrevScrollPosition] = useState(0); // Previous scroll position
  const [isVisible, setIsVisible] = useState(true); // Visibility state

  useEffect(() => {
    const handleScroll = () => {
      setPrevScrollPosition(scrollPosition); // Update previous scroll position
      const currentPosition = window.scrollY; // Get current scroll position
      setScrollPosition(currentPosition);

      // Update visibility
      if (currentPosition > prevScrollPosition && currentPosition > 50) {
        // Scrolling down, hide if not at the top
        setIsVisible(false);
      } else if (currentPosition < prevScrollPosition) {
        // Scrolling up, show
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup function
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, prevScrollPosition]); // Dependencies ensure updates on scroll

  return isVisible;
};

export default useScrollPosition;

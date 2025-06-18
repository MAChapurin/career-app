import { SCREEN_TYPES } from '@constants';
import { useState, useEffect } from 'react';

const START_WIDTH = {
  DESKTOP: 1024,
  TABLET: 1023.9,
  MOBILE: 767.9,
};

const useResize = () => {
  const getCurrentScreenType = (width) => {
    if (width <= START_WIDTH.MOBILE) {
      return SCREEN_TYPES.MOBILE;
    } else if (width <= START_WIDTH.TABLET) {
      return SCREEN_TYPES.TABLET;
    } else if (width >= START_WIDTH.DESKTOP) {
      return SCREEN_TYPES.DESKTOP;
    }
    return null;
  };

  const [currentScreenType, setCurrentScreenType] = useState(
    getCurrentScreenType(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = (event) => {
      const screenType = getCurrentScreenType(
        event.target.innerWidth,
        currentScreenType
      );
      if (screenType) {
        setCurrentScreenType(screenType);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return currentScreenType;
};

export default useResize;

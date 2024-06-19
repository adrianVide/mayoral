import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [isDesktop, setIsDesktop] = useState(false); 

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);

      setIsDesktop(window.innerWidth >= 1024);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  return isDesktop;
};

export default useWindowWidth;
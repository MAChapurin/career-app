import { useEffect, useRef } from 'react';

const useOutsideClickObserver = (callback) => {
  const ref = useRef(null);

  useEffect(() => {
    const clickHandler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [ref, callback]);

  return ref;
};

export default useOutsideClickObserver;

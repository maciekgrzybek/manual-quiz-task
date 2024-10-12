import { useEffect } from 'react';

export const useHandleEscapeKey = (handleClose: VoidFunction) => {
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        handleClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
};

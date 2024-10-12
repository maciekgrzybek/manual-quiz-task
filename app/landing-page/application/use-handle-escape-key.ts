import { useEffect } from 'react';

export const useHandleEscapeKey = (handleClose: VoidFunction) => {
  useEffect(() => {
    const close = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [handleClose]);
};

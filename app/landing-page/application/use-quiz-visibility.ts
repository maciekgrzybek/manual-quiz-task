import { useRef, useState } from 'react';

interface Props {
  isOpenByDefault?: boolean;
}

// We could pass information about quiz being started before (from a local storage for example
// or a search param). But that would need to be a product decision if we want to show
// the quiz to the user straight away.
export const useQuizVisibility = ({ isOpenByDefault = false }: Props = {}) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  const handleOpen = useRef(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'hidden';
    }
    setIsOpen(true);
  });

  const handleClose = useRef(() => {
    const body = document.querySelector('body');
    if (body) {
      body.style.overflow = 'auto';
    }
    setIsOpen(false);
  });

  return {
    isOpen,
    open: handleOpen.current,
    close: handleClose.current,
  };
};

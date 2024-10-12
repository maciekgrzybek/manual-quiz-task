import { useState } from 'react';

interface Props {
  isOpenByDefault?: boolean;
}

export const useQuiz = ({ isOpenByDefault = false }: Props) => {
  const [isOpen, setIsOpen] = useState(isOpenByDefault);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  };
};

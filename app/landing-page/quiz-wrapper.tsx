import React from 'react';
import { Quiz } from '../quiz/ui/quiz';
import { Question } from './application/use-quiz';
import { useHandleEscapeKey } from './application/use-handle-escape-key';

interface Props {
  handleClose: VoidFunction;
  questions: Question[];
}
export default function QuizWrapper({ handleClose, questions }: Props) {
  useHandleEscapeKey(handleClose);

  return (
    <div className="fixed inset-0 overflow-auto bg-white z-50 overscroll-none">
      <div className="max-w-md mx-auto p-4 pt-20">
        <button
          onClick={handleClose}
          className="fixed top-5 right-5 font-bold text-xl"
        >
          X
        </button>
        <Quiz questions={questions} />
      </div>
    </div>
  );
}

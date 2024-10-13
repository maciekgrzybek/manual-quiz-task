import React, { useState } from 'react';
import { Quiz } from '@/app/quiz';
import { useHandleEscapeKey } from './application/use-handle-escape-key';
import { quizStorage } from './application/quiz-storage';
import { Text } from '@/design-system/text/text';
import Button from '@/design-system/button/button';
import { getQuizInitialState } from './application/quiz-initial-state';

interface Props {
  handleClose: VoidFunction;
}

export default function QuizWrapper({ handleClose }: Props) {
  /*
   * We could go step further and extract additional quiz wrapper
   * so we could get the benefits of SSG.
   */
  useHandleEscapeKey(handleClose);
  const [mode, setMode] = useState<'continue' | 'start-fresh' | null>(null);
  const { questions, previousAnswers, previousQuestionIndex } =
    getQuizInitialState();

  return (
    <div className="fixed inset-0 overflow-auto bg-white z-50 overscroll-none">
      <div className="max-w-md mx-auto p-4 pt-20">
        <button
          onClick={handleClose}
          className="fixed top-5 right-5 font-bold text-xl"
        >
          X
        </button>

        {previousAnswers && mode === null ? (
          <div>
            <Text variant="h4" className="text-center mb-8">
              We can see that you already started the quiz. Do you want to
              continue or start fresh?
            </Text>
            <div className="flex gap-3 justify-center mx-auto">
              <Button variant="secondary" onClick={() => setMode('continue')}>
                Continue
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setMode('start-fresh');
                  quizStorage.clearAnswers();
                }}
              >
                Start fresh
              </Button>
            </div>
          </div>
        ) : (
          <Quiz
            questions={questions}
            onAnswer={quizStorage.saveAnswers}
            previousQuizState={{
              answers:
                mode === 'continue' && previousAnswers
                  ? previousAnswers
                  : undefined,
              questionIndex:
                mode === 'continue' ? previousQuestionIndex : undefined,
            }}
          />
        )}
      </div>
    </div>
  );
}

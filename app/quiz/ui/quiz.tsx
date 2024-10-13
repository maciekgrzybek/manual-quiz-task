'use client';

import React from 'react';
import { Question, useQuizFlow } from '../application/use-quiz-flow';
import Button from '@/design-system/button/button';
import { Text } from '@/design-system/text/text';
import { ChoiceTypeQuestion } from './choice-type-question';
import { AnswerIndex, Answers, QuestionIndex } from '@/app/quiz';

interface Props {
  questions: Question[];
  onAnswer: (questionIndex: QuestionIndex, answerIndex: AnswerIndex) => void;
  previousQuizState: {
    answers?: Answers;
    questionIndex?: QuestionIndex;
  };
}

export function Quiz({ questions, onAnswer, previousQuizState }: Props) {
  const {
    currentQuestion,
    currentQuestionIndex,
    answerQuestion,
    goBack,
    canGoBack,
    state,
    currentAnswerIndex,
  } = useQuizFlow({
    questions,
    previousAnswers: previousQuizState.answers,
    questionIndex: previousQuizState.questionIndex,
  });

  const handleAnswer = (answerIndex: AnswerIndex, isRejection: boolean) => {
    answerQuestion(answerIndex, isRejection);
    onAnswer(currentQuestionIndex, answerIndex);
  };

  const renderQuestion = () => {
    if (!currentQuestion) return null;

    switch (currentQuestion?.type) {
      case 'ChoiceType':
        return (
          <ChoiceTypeQuestion
            question={currentQuestion}
            handleAnswer={handleAnswer}
            currentAnswerIndex={currentAnswerIndex}
          />
        );
      default:
        return null;
    }
  };

  const renderQuizState = () => {
    // These should be moved to outside, so they consumer of the quiz domain can pass these as props
    switch (state) {
      case 'rejected':
        return (
          <div className="text-center">
            <Text variant="h3" className="mb-10">
              Unfortunately, we are unable to prescribe this medication for you.
            </Text>
            <Text variant="body">
              This is because finasteride can alter the PSA levels, which may be
              used to monitor for cancer. You should discuss this further with
              your GP or specialist if you would still like this medication.
            </Text>
          </div>
        );
      case 'finished':
        return (
          <div className="text-center">
            <Text variant="h3" className="mb-10">
              Great news!
            </Text>
            <Text variant="body">
              We have the perfect treatment for your hair loss. Proceed to{' '}
              <a
                href="https://www.manual.co"
                className="text-brand-primary-400 font-bold"
              >
                www.manual.co
              </a>{' '}
              , and prepare to say hello to your new hair!
            </Text>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderQuestion()}
      <div className="mb-8">{renderQuizState()}</div>
      {canGoBack && (
        <div className="flex justify-center">
          <Button onClick={goBack} variant="secondary" className="mb-20">
            Go Back
          </Button>
        </div>
      )}
    </div>
  );
}

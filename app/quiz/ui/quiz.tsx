'use client';

import React, { ComponentType } from 'react';
import { Question, useQuizFlow } from '../application/use-quiz-flow';
import Button from '@/design-system/button/button';
import { AnswerIndex, Answers, QuestionIndex, QuizState } from '@/app/quiz';
import { QuestionFactory } from './question-factory';
import { DefaultFinalState } from './default-final-state';
import { ProgressBar } from './progress-bar';

interface Props {
  questions: Question[];
  onAnswer: (questionIndex: QuestionIndex, answerIndex: AnswerIndex) => void;
  previousQuizState: {
    answers?: Answers;
    questionIndex?: QuestionIndex;
  };
  FinalStateComponent?: ComponentType<{ state: QuizState }>;
}

export function Quiz({
  questions,
  onAnswer,
  previousQuizState,
  // That way we can pass a specific FinalState component
  FinalStateComponent = DefaultFinalState,
}: Props) {
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

  return (
    <div>
      {state === 'in-progress' && (
        <ProgressBar step={currentQuestionIndex} max={questions.length} />
      )}
      <QuestionFactory
        currentQuestion={currentQuestion}
        handleAnswer={handleAnswer}
        currentAnswerIndex={currentAnswerIndex}
      />
      <div className="mb-8">
        <FinalStateComponent state={state} />
      </div>
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

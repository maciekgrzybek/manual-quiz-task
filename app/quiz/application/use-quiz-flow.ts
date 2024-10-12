import { useState, useEffect, useRef } from 'react';
import { QuizFlow } from '../domain/quiz-flow';

// Currently it's just one type, but for future safety we can make it easily expandible
type QuestionType = 'ChoiceType';

export interface BaseQuestion {
  question: string;
  type: QuestionType;
}

export interface ChoiceTypeAnswer {
  display: string;
  value: string | boolean;
  isRejection: boolean;
}

export type ChoiceTypeQuestion = BaseQuestion & {
  type: 'ChoiceType';
  options: ChoiceTypeAnswer[];
};

// Again, currently just one type, but we can easily add more types
export type Question = ChoiceTypeQuestion;

interface QuizData {
  questions: Question[];
}

export type AnswerQuestion = (
  answerIndex: number,
  isRejection: boolean
) => void;

export const useQuizFlow = (quizData: QuizData) => {
  const quizFlow = useRef(new QuizFlow(quizData.questions));
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(
    quizFlow.current.getCurrentQuestion()
  );

  useEffect(() => {
    if (quizData.questions.length > 0 && currentQuestion === null) {
      setCurrentQuestion(quizFlow.current.getCurrentQuestion());
    }
  }, [currentQuestion, quizData, quizFlow]);

  const answerQuestion: AnswerQuestion = (
    answerIndex: number,
    isRejection: boolean
  ) => {
    if (!quizFlow) return;

    quizFlow.current.answerQuestion(answerIndex, isRejection);

    setCurrentQuestion(quizFlow.current.getCurrentQuestion());
  };

  const goBack = () => {
    if (!quizFlow) return;

    quizFlow.current.goBack();
    setCurrentQuestion(quizFlow.current.getCurrentQuestion());
  };

  return {
    currentQuestion,
    answerQuestion,
    currentAnswerIndex: quizFlow.current.currentAnswerIndex(),
    goBack,
    canGoBack: quizFlow?.current.canGoBack() || false,
    state: quizFlow?.current.getState() || 'in-progress',
  };
};

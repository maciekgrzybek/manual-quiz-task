import {
  saveToLocalStorage,
  readFromLocalStorage,
  removeFromLocalStorage,
} from '@/app/shared/local-storage-manager';

import { AnswerIndex, Answers, QuestionIndex } from '@/app/quiz';

const KEY = 'quiz_answers';

const quizStorage = {
  saveAnswers: (questionIndex: QuestionIndex, answerIndex: AnswerIndex) => {
    const previousAnswers = readFromLocalStorage<Answers>(KEY);

    if (!previousAnswers || Object.keys(previousAnswers).length === 0) {
      saveToLocalStorage(KEY, { [questionIndex]: answerIndex });
      return;
    }

    saveToLocalStorage(KEY, {
      ...previousAnswers,
      [questionIndex]: answerIndex,
    });
  },

  getAnswers: () => {
    return readFromLocalStorage<Answers>(KEY);
  },

  clearAnswers: () => removeFromLocalStorage(KEY),
};

export { quizStorage };

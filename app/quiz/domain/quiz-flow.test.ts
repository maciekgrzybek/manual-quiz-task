import { expect, test, describe } from 'vitest';
import { QuizFlow } from './quiz-flow';

const sampleQuestions = [
  {
    id: '1',
    content: 'What is the capital of France?',
    answers: [
      { id: 'a', content: 'London', isRejection: false },
      { id: 'b', content: 'Paris', isRejection: false },
      { id: 'c', content: 'Berlin', isRejection: true },
      { id: 'd', content: 'Madrid', isRejection: true },
    ],
  },
  {
    id: '2',
    content: 'What is the capital of Poland?',
    answers: [
      { id: 'a', content: 'Krakow', isRejection: true },
      { id: 'b', content: 'Warsaw', isRejection: false },
      { id: 'c', content: 'Bialystok', isRejection: true },
      { id: 'd', content: 'Szczecin', isRejection: false },
    ],
  },
];

describe('quiz flow', () => {
  test('gets another question', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const firstQuestion = quizFlow.getCurrentQuestion();
    expect(firstQuestion?.id).toBe('1');
  });

  test('answers question and goes to next question', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const answerIndex = 1;
    quizFlow.answerQuestion(
      answerIndex,
      sampleQuestions[0].answers[answerIndex].isRejection
    );

    const firstQuestion = quizFlow.getCurrentQuestion();
    expect(firstQuestion?.id).toBe('2');

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 1 });
  });

  test('goes to the finished state', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const firstAnswerIndex = 1;
    quizFlow.answerQuestion(
      firstAnswerIndex,
      sampleQuestions[0].answers[firstAnswerIndex].isRejection
    );

    const secondAnswerIndex = 3;
    quizFlow.answerQuestion(
      secondAnswerIndex,
      sampleQuestions[1].answers[firstAnswerIndex].isRejection
    );

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 1, 1: 3 });

    expect(quizFlow.getState()).toBe('finished');
  });

  test('goes to the rejected state', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const firstAnswerIndex = 2;
    quizFlow.answerQuestion(
      firstAnswerIndex,
      sampleQuestions[0].answers[firstAnswerIndex].isRejection
    );

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 2 });

    expect(quizFlow.getState()).toBe('rejected');
  });

  test('starts at specific question with answer', () => {
    const quizFlow = new QuizFlow(sampleQuestions, 1, { 0: 2, 1: 0 });

    const firstQuestion = quizFlow.getCurrentQuestion();
    expect(firstQuestion?.id).toBe('2');

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 2, 1: 0 });
  });

  test('goes back to previous question and allows to answer it again', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const answerIndex = 1;
    quizFlow.answerQuestion(
      answerIndex,
      sampleQuestions[0].answers[answerIndex].isRejection
    );

    const secondQuestion = quizFlow.getCurrentQuestion();
    expect(secondQuestion?.id).toBe('2');

    quizFlow.goBack();

    const firstQuestion = quizFlow.getCurrentQuestion();
    expect(firstQuestion?.id).toBe('1');

    const secondAnswerIndex = 0;
    quizFlow.answerQuestion(
      secondAnswerIndex,
      sampleQuestions[0].answers[answerIndex].isRejection
    );

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 0 });
  });

  test('goes back to second previous question and allows to answer it again', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const answerIndex = 1;
    quizFlow.answerQuestion(
      answerIndex,
      sampleQuestions[0].answers[answerIndex].isRejection
    );

    const secondAnswerIndex = 0;
    quizFlow.answerQuestion(
      secondAnswerIndex,
      sampleQuestions[1].answers[secondAnswerIndex].isRejection
    );

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 1, 1: 0 });

    quizFlow.goBack();
    quizFlow.goBack();

    expect(quizFlow.getCurrentQuestion()?.id).toBe('1');

    const secondAttemptAnswerIndex = 2;
    quizFlow.answerQuestion(
      secondAttemptAnswerIndex,
      sampleQuestions[0].answers[secondAttemptAnswerIndex].isRejection
    );

    expect(quizFlow.getAnswers()).toEqual({ 0: 2, 1: 0 });
  });

  test('goes back to previous question from finished state and allows to answer it again', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const firstQuestionAnswerIndex = 1;
    quizFlow.answerQuestion(
      firstQuestionAnswerIndex,
      sampleQuestions[0].answers[firstQuestionAnswerIndex].isRejection
    );

    const secondQuestionAnswerIndex = 3;
    quizFlow.answerQuestion(
      secondQuestionAnswerIndex,
      sampleQuestions[1].answers[secondQuestionAnswerIndex].isRejection
    );

    const firstAnswers = quizFlow.getAnswers();
    expect(firstAnswers).toEqual({ 0: 1, 1: 3 });
    expect(quizFlow.getState()).toBe('finished');

    quizFlow.goBack();

    const firstQuestion = quizFlow.getCurrentQuestion();
    expect(firstQuestion?.id).toBe('2');

    const secondAnswerIndex = 0;
    quizFlow.answerQuestion(
      secondAnswerIndex,
      sampleQuestions[0].answers[firstQuestionAnswerIndex].isRejection
    );

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 1, 1: 0 });
  });

  test('goes back to previous question from rejected state and allows to answer it again', () => {
    const quizFlow = new QuizFlow(sampleQuestions);

    const firstQuestionAnswerIndex = 1;
    quizFlow.answerQuestion(
      firstQuestionAnswerIndex,
      sampleQuestions[0].answers[firstQuestionAnswerIndex].isRejection
    );

    const secondQuestionAnswerIndex = 0;
    quizFlow.answerQuestion(
      secondQuestionAnswerIndex,
      sampleQuestions[1].answers[secondQuestionAnswerIndex].isRejection
    );

    const firstAnswers = quizFlow.getAnswers();
    expect(firstAnswers).toEqual({ 0: 1, 1: 0 });
    expect(quizFlow.getState()).toBe('rejected');

    quizFlow.goBack();

    const firstQuestion = quizFlow.getCurrentQuestion();
    expect(firstQuestion?.id).toBe('2');

    const secondAnswerIndex = 0;
    quizFlow.answerQuestion(
      secondAnswerIndex,
      sampleQuestions[0].answers[firstQuestionAnswerIndex].isRejection
    );

    const answers = quizFlow.getAnswers();
    expect(answers).toEqual({ 0: 1, 1: 0 });
  });

  describe('edge cases', () => {
    test('cannot go back if first question', () => {
      const quizFlow = new QuizFlow(sampleQuestions);

      expect(quizFlow.getCurrentQuestion()?.id).toBe('1');

      quizFlow.goBack();

      expect(quizFlow.getCurrentQuestion()?.id).toBe('1');
    });

    test('cannot answer question when in completed state', () => {});

    test('cannot answer question when in rejected state', () => {});

    test('handles an empty question set', () => {});

    test('handles invalid answer', () => {});

    test('resets the quiz', () => {});
  });
});

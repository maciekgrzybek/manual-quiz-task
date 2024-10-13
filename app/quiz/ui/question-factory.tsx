import { AnswerQuestion, Question } from '../application/use-quiz-flow';
import { AnswerIndex } from '../domain/quiz-flow';
import { ChoiceTypeQuestion } from './choice-type-question';

interface Props {
  currentQuestion: Question | null;
  handleAnswer: AnswerQuestion;
  currentAnswerIndex: AnswerIndex;
}

export const QuestionFactory = ({
  currentQuestion,
  handleAnswer,
  currentAnswerIndex,
}: Props) => {
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

import {
  AnswerQuestion,
  ChoiceTypeQuestion as ChoiceTypeQuestionType,
} from '../application/use-quiz-flow';
import { Text } from '@/design-system/text/text';

interface Props {
  question: ChoiceTypeQuestionType;
  handleAnswer: AnswerQuestion;
  currentAnswerIndex: number;
}

export function ChoiceTypeQuestion({
  question,
  handleAnswer,
  currentAnswerIndex,
}: Props) {
  return (
    <div>
      <Text variant="h4" className="mb-12 text-center">
        {question.question}
      </Text>
      <div className="grid grid-cols-2 gap-3">
        {question.options.map((answer, index) => (
          <button
            key={index} // TODO figure this out
            onClick={() => handleAnswer(index, answer.isRejection)}
            className={`inline-flex items-center justify-center w-full p-5  border-2 rounded-lg border-neutral-100  hover:text-neutral-900 hover:border-neutral-300 ${
              currentAnswerIndex === index ? 'bg-brand-primary-100' : 'bg-white'
            }`}
          >
            <div dangerouslySetInnerHTML={{ __html: answer.display }}></div>
          </button>
        ))}
      </div>
    </div>
  );
}

export type QuestionType = 'ChoiceType';

export interface Answer {
  display: string;
  value: string | boolean;
  isRejection: boolean;
}

export interface Question {
  question: string;
  type: QuestionType;
  options: Answer[];
}

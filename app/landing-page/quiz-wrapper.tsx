import React from 'react';
import { Quiz } from '../quiz/ui/quiz';
import { useHandleEscapeKey } from './application/use-handle-escape-key';

type QuestionType = 'ChoiceType';

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

interface Props {
  handleClose: VoidFunction;
}

const getQuestions = () => {
  /*
   * Questions could come from an API, but for sake of this task
   * we can keep it as a hard-coded list.
   * If it would come from API, we would also do some validation
   * (zod, class-validator, typeBox or something similar)
   */
  const questions: Question[] = [
    {
      question: 'Which image best matches your hair loss?',
      type: 'ChoiceType',
      options: [
        {
          display:
            '<img alt="Temples" src="https://s3-eu-west-1.amazonaws.com/manualco/questions/temples-hairloss.png" srcset="https://s3-eu-west-1.amazonaws.com/manualco/questions/temples-hairloss%402x.png 2x" />',
          value: 'Temples',
          isRejection: false,
        },
        {
          display:
            '<img alt="Temples & Crown" src="https://s3-eu-west-1.amazonaws.com/manualco/questions/templescrown-hairloss.png" srcset="https://s3-eu-west-1.amazonaws.com/manualco/questions/templescrown-hairloss%402 x.png 2x"/>',
          value: 'Temples & Crown',
          isRejection: false,
        },
        {
          display:
            '<img alt="Patchy" src="https://s3-eu-west-1.amazonaws.com/manualco/questions/patchy-hairloss.png" srcset="https://s3-eu-west-1.amazonaws.com/manualco/questions/patchy-hairloss%402x.png 2x"/>',
          value: 'Patchy',
          isRejection: true,
        },
        {
          display:
            '<img alt="Moderate" src="https://s3-eu-west-1.amazonaws.com/manualco/questions/moderate-hairloss.png" srcset="https://s3-eu-west-1.amazonaws.com/manualco/questions/moderate-hairloss%402x.pn g 2x" />',
          value: 'Moderate',
          isRejection: false,
        },
        {
          display:
            '<img alt="Extensive" src="https://s3-eu-west-1.amazonaws.com/manualco/questions/extensive-hairloss.png" srcset="https://s3-eu-west-1.amazonaws.com/manualco/questions/extensive-hairloss%402x.pn g 2x"/>',
          value: 'Extensive',
          isRejection: true,
        },
        {
          display:
            '<img alt="Complete" src="https://s3-eu-west-1.amazonaws.com/manualco/questions/complete-hairloss.png" srcset="https://s3-eu-west-1.amazonaws.com/manualco/questions/complete-hairloss%402x.pn g 2x" />',
          value: 'Complete',
          isRejection: true,
        },
      ],
    },
    {
      question:
        'Have you ever been diagnosed with prostate cancer, or are you currently undergoing PSA/Prostate monitoring?',
      type: 'ChoiceType',
      options: [
        {
          display: 'Yes',
          value: true,
          isRejection: true,
        },
        {
          display: 'No',
          value: false,
          isRejection: false,
        },
      ],
    },
    {
      question:
        'Have you ever been diagnosed with breast cancer or noticed any changes in your breast tissue such as lumps, pain, nipple discharge or swelling?',
      type: 'ChoiceType',
      options: [
        {
          display: 'Yes',
          value: true,
          isRejection: true,
        },
        {
          display: 'No',
          value: false,
          isRejection: false,
        },
      ],
    },
  ];

  return questions;
};

export default function QuizWrapper({ handleClose }: Props) {
  /*
   * We could go step further and extract additional quiz wrapper
   * so we could get the benefits of SSG.
   */
  useHandleEscapeKey(handleClose);
  const questions = getQuestions();

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

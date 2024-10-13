import { Text } from '@/design-system/text/text';
import { QuizState } from '../domain/quiz-flow';

interface Props {
  state: QuizState;
}

export const DefaultFinalState = ({ state }: Props) => {
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

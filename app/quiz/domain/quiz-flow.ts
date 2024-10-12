type QuizState = 'in-progress' | 'finished' | 'rejected';

type QuestionIndex = number;
type AnswerIndex = number;

export class QuizFlow<TQuestion> {
  private questions: TQuestion[];
  private currentQuestionIndex: QuestionIndex;
  private state: QuizState;
  private answers: Record<QuestionIndex, AnswerIndex>;

  constructor(
    questions: TQuestion[],
    currentQuestionIndex: QuestionIndex = 0,
    answers: Record<QuestionIndex, AnswerIndex> = {}
  ) {
    this.questions = questions;
    this.currentQuestionIndex = currentQuestionIndex;
    this.state = 'in-progress';
    this.answers = answers;
  }

  public getCurrentQuestion(): TQuestion | null {
    if (this.isCompleted()) {
      return null;
    }

    return this.questions[this.currentQuestionIndex] || null;
  }

  public answerQuestion(answerIndex: number, isFailure: boolean): void {
    if (this.isCompleted()) {
      return;
    }
    this.answers[this.currentQuestionIndex] = answerIndex;
    if (isFailure) {
      this.state = 'rejected';
      return;
    }

    if (this.currentQuestionIndex === this.questions.length - 1) {
      this.state = 'finished';
      return;
    }

    this.currentQuestionIndex++;
  }

  public goBack(): void {
    if (this.isCompleted()) {
      this.state = 'in-progress';
      return;
    }
    if (!this.canGoBack()) {
      return;
    }
    this.currentQuestionIndex--;
  }

  public getAnswers(): Record<QuestionIndex, AnswerIndex> {
    return this.answers;
  }

  public getState(): QuizState {
    return this.state;
  }

  public canGoBack(): boolean {
    if (this.currentQuestionIndex === 0 && this.state !== 'in-progress') {
      return true;
    }
    return this.currentQuestionIndex > 0;
  }

  public isCompleted(): boolean {
    return this.state === 'finished' || this.state === 'rejected';
  }

  public isFinished(): boolean {
    return this.state === 'finished';
  }

  public isRejected(): boolean {
    return this.state === 'rejected';
  }

  public currentAnswerIndex() {
    return this.answers[this.currentQuestionIndex];
  }
}

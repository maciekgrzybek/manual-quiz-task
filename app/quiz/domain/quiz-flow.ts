type QuizState = 'in-progress' | 'finished' | 'rejected';

export type QuestionIndex = number;
export type AnswerIndex = number;
export type Answers = Record<QuestionIndex, AnswerIndex>;

export class QuizFlow<TQuestion> {
  private state: QuizState;

  constructor(
    private readonly questions: TQuestion[],
    private currentQuestionIndexInternal: QuestionIndex = 0,
    private readonly answers: Answers = {}
  ) {
    this.state = 'in-progress';
  }

  public getCurrentQuestion(): TQuestion | null {
    if (this.isCompleted()) {
      return null;
    }

    return this.questions[this.currentQuestionIndexInternal] || null;
  }

  public answerQuestion(answerIndex: number, isFailure: boolean): void {
    if (this.isCompleted()) {
      return;
    }
    this.answers[this.currentQuestionIndexInternal] = answerIndex;
    if (isFailure) {
      this.state = 'rejected';
      return;
    }

    if (this.currentQuestionIndexInternal === this.questions.length - 1) {
      this.state = 'finished';
      return;
    }

    this.currentQuestionIndexInternal++;
  }

  public goBack(): void {
    if (this.isCompleted()) {
      this.state = 'in-progress';
      return;
    }
    if (!this.canGoBack()) {
      return;
    }
    this.currentQuestionIndexInternal--;
  }

  public getAnswers(): Record<QuestionIndex, AnswerIndex> {
    return this.answers;
  }

  public getState(): QuizState {
    return this.state;
  }

  public canGoBack(): boolean {
    if (
      this.currentQuestionIndexInternal === 0 &&
      this.state !== 'in-progress'
    ) {
      return true;
    }
    return this.currentQuestionIndexInternal > 0;
  }

  public isCompleted(): boolean {
    return this.state === 'finished' || this.state === 'rejected';
  }

  public currentQuestionIndex() {
    return this.currentQuestionIndexInternal;
  }

  public currentAnswerIndex() {
    return this.answers[this.currentQuestionIndexInternal];
  }
}

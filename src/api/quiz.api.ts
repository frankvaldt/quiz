export interface IQuizGroup{
    title: string;
    quiz: IQuizApi[];
}

export interface IQuizApi {
    img?: string
    question: string;
    timer?: number;
    answers: IAnswers[];
}

export interface IAnswers{
    text: string;
    isCorrect?: boolean;
}
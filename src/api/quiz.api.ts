export interface IQuizGroup{
    title: string;
    quiz: IQuizApi[];
    id: string;
}

export interface IQuizApi {
    img?: string
    question: string;
    timer?: number;
    answers: IAnswers[];
    id: string;
}

export interface IAnswers{
    text: string;
    isCorrect?: boolean;
    id: string;
}
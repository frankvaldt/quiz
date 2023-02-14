export interface IQuizGroup{
    title: string;
    quiz: IQuiz[];
    id: string;
}

export interface IQuiz {
    img?: string
    question: string;
    timer?: number;
    answers: IAnswers[];
    id: string;
    idQuizGroup: string;
}

export interface IAnswers{
    text: string;
    isCorrect?: boolean;
    id: string;
    idQuiz:string;
}
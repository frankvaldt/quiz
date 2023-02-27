export interface IQuizGroup {
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

export interface IAnswers {
    text: string;
    isCorrect?: boolean;
    id: string;
    idQuiz: string;
}

export interface IStatisticForOffice {
    telegramId: string;
    userName: string;
    score: number;
    time: number;
    id: string;
}

export interface IStatistic {
    office: string;
    scores: IStatisticForOffice[];
}
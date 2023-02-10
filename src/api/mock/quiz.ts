import {IAnswers, IQuizGroup} from "../quiz.api";

export const quizGroups: IQuizGroup[] = [{
    title: "frist",
    id: '6',
    quiz: [{
        img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
        question: "Say My Name",
        timer: 70,
        id: '5',
        answers: [{
            text: "Walter",
            isCorrect: false,
            id: '1'
        }, {
            text: "white",
            isCorrect: false,
            id: '2'
        }, {
            text: "bob",
            isCorrect: false,
            id: '3'
        }, {
            text: "Haizenberg",
            isCorrect: false,
            id: '4'
        }],
    }]
}];


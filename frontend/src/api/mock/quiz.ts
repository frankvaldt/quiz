import {IAnswers, IQuizGroup} from "../quiz.interface";
import {uuid} from "../../utils/utils";


export const quizGroups: IQuizGroup[] = [{
    title: "frist",
    id: '111',
    quiz: [{
        img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
        question: "Say My Name",
        timer: 70,
        id: '1111',
        idQuizGroup: '111',
        answers: [{
            text: "Walter",
            isCorrect: false,
            id: uuid(),
            idQuiz: '1111',
        }, {
            text: "white",
            isCorrect: false,
            idQuiz: '1111',
            id: uuid()
        }, {
            text: "bob",
            isCorrect: false,
            idQuiz: '1111',
            id: uuid()
        }, {
            text: "Haizenberg",
            isCorrect: false,
            idQuiz: '1111',
            id: uuid()
        }],
    },
        {
            img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
            question: "I am the gay",
            timer: 20,
            id: '222',
            idQuizGroup: '111',
            answers: [{
                text: "Walter 3",
                isCorrect: false,
                idQuiz: '222',
                id: uuid()
            }, {
                text: "white 5",
                isCorrect: false,
                idQuiz: '222',
                id: uuid()
            }, {
                text: "bob",
                isCorrect: false,
                idQuiz: '222',
                id: uuid()
            }, {
                text: "Haizenberg",
                isCorrect: false,
                idQuiz: '222',
                id: uuid()
            }],
        }]
}, {
    title: "second",
    id: '123',
    quiz: [{
        img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
        question: "Lorem40",
        timer: 70,
        idQuizGroup: '123',
        id: '333',
        answers: [{
            text: "Walter",
            isCorrect: false,
            idQuiz: '333',
            id: uuid()
        }, {
            text: "white",
            isCorrect: false,
            idQuiz: '333',
            id: uuid()
        }, {
            text: "bob",
            isCorrect: false,
            idQuiz: '333',
            id: uuid()
        }, {
            text: "Haizenberg",
            isCorrect: false,
            idQuiz: '333',
            id: uuid()
        }],
    },
        {
            img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
            question: "I am the prat",
            timer: 20,
            id: '435',
            idQuizGroup: '123',
            answers: [{
                text: "Walter 3",
                isCorrect: false,
                id: uuid(),
                idQuiz: '435',
            }, {
                text: "white 5",
                isCorrect: false,
                idQuiz: '435',
                id: uuid()
            }, {
                text: "bob",
                isCorrect: false,
                idQuiz: '435',
                id: uuid()
            }, {
                text: "Haizenberg",
                isCorrect: false,
                idQuiz: '435',
                id: uuid()
            }],
        }]
}];


import {IAnswers, IQuizGroup} from "../quiz.api";
import {uuid} from "../../utils/utils";

export const quizGroups: IQuizGroup[] = [{
    title: "frist",
    id: uuid(),
    quiz: [{
        img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
        question: "Say My Name",
        timer: 70,
        id: uuid(),
        answers: [{
            text: "Walter",
            isCorrect: false,
            id: uuid()
        }, {
            text: "white",
            isCorrect: false,
            id: uuid()
        }, {
            text: "bob",
            isCorrect: false,
            id: uuid()
        }, {
            text: "Haizenberg",
            isCorrect: false,
            id: uuid()
        }],
    },
        {
            img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
            question: "I am the gay",
            timer: 20,
            id: uuid(),
            answers: [{
                text: "Walter 3",
                isCorrect: false,
                id: uuid()
            }, {
                text: "white 5",
                isCorrect: false,
                id: uuid()
            }, {
                text: "bob",
                isCorrect: false,
                id: uuid()
            }, {
                text: "Haizenberg",
                isCorrect: false,
                id: uuid()
            }],
        }]
},{
    title: "second",
    id: uuid(),
    quiz: [{
        img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
        question: "Lorem40",
        timer: 70,
        id: uuid(),
        answers: [{
            text: "Walter",
            isCorrect: false,
            id: uuid()
        }, {
            text: "white",
            isCorrect: false,
            id: uuid()
        }, {
            text: "bob",
            isCorrect: false,
            id: uuid()
        }, {
            text: "Haizenberg",
            isCorrect: false,
            id: uuid()
        }],
    },
        {
            img: "https://i0.wp.com/butwhytho.net/wp-content/uploads/2022/06/Spy-x-Family-Season-1-But-Why-Tho.jpg?fit=800%2C410&ssl=1",
            question: "I am the prat",
            timer: 20,
            id: uuid(),
            answers: [{
                text: "Walter 3",
                isCorrect: false,
                id: uuid()
            }, {
                text: "white 5",
                isCorrect: false,
                id: uuid()
            }, {
                text: "bob",
                isCorrect: false,
                id: uuid()
            }, {
                text: "Haizenberg",
                isCorrect: false,
                id: uuid()
            }],
        }]
}];


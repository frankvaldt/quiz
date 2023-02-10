import React, {useState} from "react";
import {ModalQuiz} from "../components/Modal/ModalQuiz";
import {PlusSquareTwoTone} from "@ant-design/icons";
import css from './EditQuize.module.css';
import {quizGroups} from "../api/mock/quiz";
import {IQuizApi, IQuizGroup} from "../api/quiz.api";
import {uuid} from "../utils/utils";

const initQuizGrop: IQuizGroup = {
    id: "",
    quiz: [] as IQuizApi[],
    title: ""

}
export const EditQuiz = (): JSX.Element => {
    const [quizGroup, setQuizGroup] = useState<IQuizGroup[]>(quizGroups);
    const [newQuizGrop, setNewQuizGrop] = useState<IQuizGroup>(initQuizGrop);
    const addNewQuizGroup = () =>{
        setQuizGroup(prevState => ([...prevState, newQuizGrop]));
    }
    return (
        <div className={css.wrapper}>
            <div className={css.add_icon}><PlusSquareTwoTone /></div>
            {quizGroup.map((quiz)=><ModalQuiz key={uuid()} quiz={quiz.quiz} title={quiz.title}/>)}
        </div>
    );
}
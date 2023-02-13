import React, {useEffect, useState} from "react";
import {ModalQuiz} from "../components/Modal/ModalQuiz";
import {PlusSquareTwoTone} from "@ant-design/icons";
import css from './EditQuize.module.css';
import {quizGroups} from "../api/mock/quiz";
import {IQuizApi, IQuizGroup} from "../api/quiz.api";
import {uuid} from "../utils/utils";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {setQuizGroups} from "../store/slices/quizGropSlice";

const initQuizGrop: IQuizGroup = {
    id: "",
    quiz: [] as IQuizApi[],
    title: ""
}
export const EditQuiz = (): JSX.Element => {
    const quizGroupFromState = useAppSelector(state => state.quizGrop.quizGrop);
    const dispatch = useAppDispatch();
    const [quizGroup, setQuizGroup] = useState(quizGroupFromState);
    useEffect(() => {
        dispatch(setQuizGroups(quizGroups));
    }, [dispatch]);
    useEffect(() => {
        setQuizGroup(quizGroupFromState);
    }, [quizGroupFromState]);
    return (
        <div className={css.wrapper}>
            <div className={css.add_icon}><PlusSquareTwoTone/></div>
            {quizGroupFromState.map((quiz) =>
                <div key={uuid()}>
                    <ModalQuiz quizGroup={quiz}/>
                </div>)}
        </div>
    );
}
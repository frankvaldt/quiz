import React, {useEffect, useState} from "react";
import {ModalQuiz} from "../components/Modal/ModalQuiz";
import {PlusSquareTwoTone} from "@ant-design/icons";
import css from './EditQuize.module.css';
import {quizGroups} from "../api/mock/quiz";
import {IQuiz, IQuizGroup} from "../api/quiz.api";
import {uuid} from "../utils/utils";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {removeQuizGroup, setQuizGroups} from "../store/slices/quizGropSlice";
import {AddGroupModal} from "../components/AddGroupModal/AddGroupModal";

const initQuizGrop: IQuizGroup = {
    id: "",
    quiz: [] as IQuiz[],
    title: ""
}
export const EditQuiz = (): JSX.Element => {
    const quizGroupFromState = useAppSelector(state => state.quizGrop.quizGrop);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(setQuizGroups(quizGroups));
    }, [dispatch]);
    const deleteQuizGroup = (id: string) => {
        dispatch(removeQuizGroup(id));
    }
    return (
        <div className={css.wrapper}>
            <div onClick={() => setOpen(true)} className={css.add_icon}>
                <PlusSquareTwoTone />
            </div>
            {quizGroupFromState.map((quiz) =>
                <div key={uuid()}>
                    <ModalQuiz quizGroup={quiz}
                               deleteHandler={() => deleteQuizGroup(quiz.id)}/>
                </div>)}
            <AddGroupModal open={open} setOpen={setOpen} />
        </div>
    );
}
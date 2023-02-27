import React, {useEffect, useState} from "react";
import {ModalQuiz} from "../components/Modal/ModalQuiz";
import {PlusSquareTwoTone} from "@ant-design/icons";
import css from './EditQuize.module.css';
import {uuid} from "../utils/utils";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {getQuizGroupsFromRequest, removeQuizGroup} from "../store/slices/quizGropSlice";
import {AddGroupModal} from "../components/AddGroupModal/AddGroupModal";
import {deleteQuizGroupHttp} from "../api/quiz.api";
import {Card} from "antd";

export const EditQuiz = (): JSX.Element => {
    const quizGroupFromState = useAppSelector(state => state.quizGrop.quizGrop);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(getQuizGroupsFromRequest());
    }, []);
    const deleteQuizGroup = (id: string) => {
        deleteQuizGroupHttp(id).then(() =>
            dispatch(getQuizGroupsFromRequest())
        );
    };

    return (
        <div className={css.wrapper}>
            <div onClick={() => setOpen(true)} className={css.add_icon}>
                <PlusSquareTwoTone/>
            </div>
            <Card className={css.card} title={"Ваши викторины:"}>
                {quizGroupFromState.map((quiz) =>
                    <div key={uuid()}>
                        <ModalQuiz quizGroup={quiz}
                                   deleteHandler={() => deleteQuizGroup(quiz.id)}/>
                    </div>)}
            </Card>
            <AddGroupModal open={open} setOpen={setOpen}/>
        </div>
    );
}
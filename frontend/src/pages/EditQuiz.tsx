import React, {useEffect, useState} from "react";
import {ModalQuiz} from "../components/Modal/ModalQuiz";
import css from './EditQuize.module.css';
import {uuid} from "../utils/utils";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {getQuizGroupsFromRequest} from "../store/slices/quizGropSlice";
import {AddGroupModal} from "../components/AddGroupModal/AddGroupModal";
import {deleteQuizGroupHttp} from "../api/quiz.api";
import {Button, Card, Typography} from "antd";



export const EditQuiz = (): JSX.Element => {
    const quizGroupFromState = useAppSelector(state => state.quizGrop.quizGrop);
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getQuizGroupsFromRequest())
    }, [dispatch]);

    const deleteQuizGroup = (id: string) => {
        deleteQuizGroupHttp(id).then(() =>
            dispatch(getQuizGroupsFromRequest())
        );
    };

    return (
        <div className={css.wrapper}>
            <div onClick={() => setOpen(true)} className={css.add_icon}>
                <Button type={'dashed'} className={css.create_button}>
                    Create a new quiz group
                </Button>
            </div>
            <Card className={css.card} title={"Your quizzes:"}>
                {quizGroupFromState.length > 0 ?
                    quizGroupFromState.map((quiz) =>
                        <div key={uuid()}>
                            <ModalQuiz quizGroup={quiz}
                                       deleteHandler={() => deleteQuizGroup(quiz.id)}/>
                        </div>):
                    <Typography.Title>You don't have any quiz grop</Typography.Title>
                    }
            </Card>
            <AddGroupModal open={open} setOpen={setOpen}/>
        </div>
    );
}
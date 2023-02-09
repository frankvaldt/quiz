import React, {Dispatch, SetStateAction} from "react";
import {Answer} from "./Answer";
import {AddAnswer} from "./AddAnswer";
import {Form} from "antd";
import css from "./../../ModalQuiz.module.css";
import {IAnswers, IQuizApi} from "../../../../api/quiz.api";
import {uuid} from "../../../../utils/utils";

export const AnswerContainer = (props: {
    answers: IAnswers[];
    setQuiz: Dispatch<SetStateAction<IQuizApi>>
}): JSX.Element => {
    const {answers, setQuiz} = props;
    return (
        <>
            {answers.length > 0 && (<Form.Item label="Answers">
                <div className={css.answer_container}>
                    {answers.map(answer => <Answer key={uuid()} text={answer.text} isCorrect={answer.isCorrect}/>)}
                </div>
            </Form.Item>)}
            <AddAnswer setQuiz={setQuiz}/>
        </>
    );
}
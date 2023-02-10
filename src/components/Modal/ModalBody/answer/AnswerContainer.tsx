import React, {Dispatch, SetStateAction, useState} from "react";
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
    const [localAnswers, setLocalAnswers] = useState(answers);
    return (
        <>
            {answers.length > 0 && (
                <Form.Item label="Answers" className={css.item}>
                    <div className={css.answer_container}>
                        {localAnswers.map(answer => <Answer key={uuid()} answer={answer}
                                                       setQuiz={setQuiz} setLocalAnswers={setLocalAnswers} />)}
                    </div>
                </Form.Item>)}
            <AddAnswer setLocalAnswers={setLocalAnswers} setQuiz={setQuiz}/>
        </>
    );
}
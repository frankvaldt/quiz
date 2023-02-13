import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {Answer} from "./Answer";
import {AddAnswer} from "./AddAnswer";
import {Form} from "antd";
import css from "./../../ModalQuiz.module.css";
import {IAnswers, IQuizApi, IQuizGroup} from "../../../../api/quiz.api";
import {uuid} from "../../../../utils/utils";

export const AnswerContainer = (props: {
    quizElem: IQuizApi;
    answers: IAnswers[];
    setQuiz: Dispatch<SetStateAction<IQuizGroup>>;
}): JSX.Element => {
    const {answers, setQuiz, quizElem} = props;

    return (
        <>
            {answers.length > 0 && (
                <Form.Item label="Answers" className={css.item}>
                    <div className={css.answer_container}>
                        {answers.map(answer => <Answer key={uuid()} answer={answer}
                                                       quizElem={quizElem}
                                                       setQuiz={setQuiz}/>)}
                    </div>
                </Form.Item>)}
            <AddAnswer setQuiz={setQuiz} quizElem={quizElem}/>
        </>
    );
}
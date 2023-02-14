import React, {Dispatch, SetStateAction, useCallback, useEffect, useState} from "react";
import {Answer} from "./Answer";
import {AddAnswer} from "./AddAnswer";
import {Form} from "antd";
import css from "./../../ModalQuiz.module.css";
import {IAnswers, IQuiz, IQuizGroup} from "../../../../api/quiz.api";
import {uuid} from "../../../../utils/utils";

export const AnswerContainer = (props: {
    quizElem: IQuiz;
    answers: IAnswers[];
    setQuestion: Dispatch<SetStateAction<IQuiz>>;
}): JSX.Element => {
    const {answers, setQuestion, quizElem} = props;

    return (
        <>
            {answers.length > 0 && (
                <Form.Item label="Answers" className={css.item}>
                    <div className={css.answer_container}>
                        {answers.map(answer => <Answer key={uuid()} answer={answer}
                                                       quizElem={quizElem}
                                                       setQuestion={setQuestion}/>)}
                    </div>
                </Form.Item>)}
            <AddAnswer setQuestion={setQuestion} quizElem={quizElem}/>
        </>
    );
}
import React from "react";
import {Answer} from "./Answer";
import {AddAnswer} from "./AddAnswer";
import {Form} from "antd";
import css from "./../../ModalQuiz.module.css";
import {IAnswers, IQuiz, IQuizGroup} from "../../../../api/quiz.interface";
import {uuid} from "../../../../utils/utils";
import {Updater} from "use-immer";

export const AnswerContainer = (props: {
    quizElem: IQuiz;
    answers: IAnswers[];
    updateProduct: Updater<IQuizGroup>;
}): JSX.Element => {
    const {answers, quizElem, updateProduct} = props;
    return (
        <>
            {answers.length > 0 && (
                <Form.Item label="Answers" className={css.item}>
                    <div className={css.answer_container}>
                        {answers.map(answer => <Answer key={uuid()} answer={answer}
                                                       quizElem={quizElem}
                                                       updateProduct={updateProduct}/>)}
                    </div>
                </Form.Item>)}
            <AddAnswer updateProduct={updateProduct} quizElem={quizElem}/>
        </>
    );
}
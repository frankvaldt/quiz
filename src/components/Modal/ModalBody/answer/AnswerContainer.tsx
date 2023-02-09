import React from "react";
import {Answer} from "./Answer";
import {AddAnswer} from "./AddAnswer";
import {Form} from "antd";
import css from "./../../ModalQuiz.module.css";

export const AnswerContainer = (): JSX.Element => {
    return (
        <>
            <Form.Item label="Answers" >
                <div className={css.answer_container}>
                    <Answer text={'lol'} isCorrect={false}/>
                    <Answer text={'kek'} isCorrect={true}/>
                </div>
            </Form.Item>
            <AddAnswer/>
        </>
    );
}
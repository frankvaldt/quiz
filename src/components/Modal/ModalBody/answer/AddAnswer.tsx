import React, {Dispatch, SetStateAction} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";
import css from "../../ModalQuiz.module.css";
import {Button, Checkbox, Form, Input} from "antd";
import {IQuizApi} from "../../../../api/quiz.api";

export const AddAnswer = (props: {
    setQuiz: Dispatch<SetStateAction<IQuizApi>>
}): JSX.Element => {
    const {setQuiz} = props;
    return (
        <Form.Item label="Add answer" valuePropName="AddAnswer">
            <div>
                <div className={css.answer_wrapper}>
                    <PlusCircleOutlined className={css.add_icon}/>
                    <div className={css.input}>
                        <Input placeholder="Add answer text"/>
                    </div>
                    <Checkbox>Is true</Checkbox>
                </div>
            </div>
        </Form.Item>
    );
}
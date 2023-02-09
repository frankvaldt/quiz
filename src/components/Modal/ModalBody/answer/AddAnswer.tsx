import React from "react";
import {PlusCircleOutlined} from "@ant-design/icons";
import css from "../../ModalQuiz.module.css";
import {Button, Checkbox, Form, Input} from "antd";

export const AddAnswer = (): JSX.Element => {
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
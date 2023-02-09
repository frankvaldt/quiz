import React from "react";
import {Card, Form, Input, InputNumber, Upload} from "antd";
import {DeleteOutlined, PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import css from '../../ModalQuiz.module.css';
import {AnswerContainer} from "../answer/AnswerContainer";

export const Question = (props: {
    setComponentDisabled: (a: boolean) => void;
    componentDisabled: boolean;
}): JSX.Element => {
    const {componentDisabled, setComponentDisabled} = props;
    const onFormLayoutChange = ({disabled}: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    };
    return (
        <Card className={css.question_wrapper}>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
            >
                <div className={css.remove_container}>
                    <DeleteOutlined className={css.remove}/>
                </div>
                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Enter a question" valuePropName="fileList">
                    <Input placeholder="Write a question"/>
                </Form.Item>
                <AnswerContainer/>
                <Form.Item label="Enter a timer value" valuePropName="fileList">
                    <InputNumber/>
                </Form.Item>
            </Form>
        </Card>
    );
}
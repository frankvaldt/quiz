import React, {ChangeEvent, useState} from "react";
import {Card, Form, Input, InputNumber, Upload} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import css from '../../ModalQuiz.module.css';
import {AnswerContainer} from "../answer/AnswerContainer";
import {IAnswers, IQuizApi} from "../../../../api/quiz.api";
import {isOnlyNumbers} from "../../../../utils/utils";

const initQuiz: IQuizApi = {
    answers: [] as IAnswers[],
    img: "",
    question: "",
    timer: 0,
    id: '',
}

export const Question = (props: {
    setComponentDisabled: (a: boolean) => void;
    componentDisabled: boolean;
    quizElem: IQuizApi;
}): JSX.Element => {
    const {componentDisabled, setComponentDisabled, quizElem} = props;
    const [quiz, setQuiz] = useState<IQuizApi>(quizElem ?? initQuiz);
    const onFormLayoutChange = ({disabled}: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    };

    console.log('quiz', quiz);

    const onChangeQuiz = (event: ChangeEvent<HTMLInputElement>) => {
        setQuiz(prevState => ({...prevState, [event.target.name]: event.target.value}));
    }

    return (
        <Card className={css.question_wrapper}>
            <Form
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
                    <Input name={"question"} value={quiz.question} placeholder="Write a question"
                           onChange={onChangeQuiz}/>
                </Form.Item>
                <AnswerContainer answers={quiz.answers} setQuiz={setQuiz}/>
                <Form.Item label="Enter a timer" valuePropName="fileList">
                    <InputNumber min={0} value={quiz.timer}
                                 onChange={(value) => {
                                     if (value && isOnlyNumbers(value.toString())){
                                         setQuiz((prevState => ({...prevState, timer: parseInt(value.toString())})))
                                     }
                                 }}/>
                </Form.Item>
            </Form>
        </Card>
    );
}
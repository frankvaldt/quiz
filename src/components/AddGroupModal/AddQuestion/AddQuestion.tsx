import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import {Card, Form, Input, InputNumber, Upload} from "antd";
import css from "../../Modal/ModalQuiz.module.css";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {isOnlyNumbers} from "../../../utils/utils";
import {IQuiz, IQuizGroup} from "../../../api/quiz.interface";
import {AnswerContainer} from "../../Modal/ModalBody/answer/AnswerContainer";
import {Updater} from "use-immer";

export const AddQuestion = (props: {
    quizElem: IQuiz;
    updateProduct: Updater<IQuizGroup>;
}): JSX.Element => {
    const {quizElem, updateProduct} = props;
    const [input, setInput] = useState<string>(quizElem.question ?? '');
    const [inputNumber, setInputNumber] = useState<number>(quizElem.timer ?? 0);
    const handelDeleteQuiz = () => {
        updateProduct(draft => {
            draft.quiz = draft.quiz.filter(elem => elem.id !== quizElem.id);
        });
    };
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    };
    const onBlurInput = useCallback(() => {
        updateProduct(draft => {
            const index = draft.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return;
            draft.quiz[index].question = input;
        });
    }, [input]);
    const onBlurInputNumber = useCallback(() => {
        updateProduct(draft => {
            const index = draft.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return;
            draft.quiz[index].timer = inputNumber;
        });
    }, [inputNumber]);
    return (
        <Card className={css.question_wrapper}>
            <Form layout="horizontal">
                <div className={css.remove_container}>
                    <DeleteOutlined className={css.remove} onClick={handelDeleteQuiz}/>
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
                    <Input name={"question"} value={input} onBlur={onBlurInput} placeholder="Write a question"
                           onChange={onChange}/>
                </Form.Item>
                <AnswerContainer quizElem={quizElem} answers={quizElem.answers}
                                 updateProduct={updateProduct}/>
                <Form.Item label="Enter a timer" valuePropName="fileList">
                    <InputNumber min={0} value={inputNumber} onBlur={onBlurInputNumber}
                                 onChange={(value) => {
                                     if (value && isOnlyNumbers(value.toString())) {
                                         setInputNumber(parseInt(value.toString()));
                                     }
                                 }}/>
                </Form.Item>
            </Form>
        </Card>
    );
}
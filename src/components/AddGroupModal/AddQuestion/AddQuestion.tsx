import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import {Card, Form, Input, InputNumber, Upload} from "antd";
import css from "../../Modal/ModalQuiz.module.css";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {isOnlyNumbers} from "../../../utils/utils";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {deleteQuiz} from "../../../store/slices/quizGropSlice";
import {IQuiz} from "../../../api/quiz.api";
import {AnswerContainer} from "../../Modal/ModalBody/answer/AnswerContainer";

export const AddQuestion = (props: {
    quizElem: IQuiz;
    id: string;
    setQuestion: Dispatch<SetStateAction<IQuiz>>;
    setLocalQuiz?: Dispatch<SetStateAction<IQuiz[]>>
}): JSX.Element => {
    const {id, quizElem, setQuestion, setLocalQuiz} = props;
    const dispatch = useAppDispatch();
    const [input, setInput] = useState<string>(quizElem.question ?? '');
    const [inputNumber, setInputNumber] = useState<number>(quizElem.timer ?? 0);
    const handelDeleteQuiz = () => {
        setLocalQuiz && setLocalQuiz(prevState => prevState.filter(elem=>elem.id!==quizElem.id));
    };
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    };
    const onBlurInput = useCallback(() => {
        setQuestion(prevState => ({...prevState, question: input}))
    }, [input]);
    const onBlurInputNumber = useCallback(() => {
        setQuestion(prevState => ({...prevState, timer: inputNumber}))
    }, [inputNumber]);
    return (
        <Card className={css.question_wrapper}>
            <Form
                layout="horizontal"
            >
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
                <AnswerContainer quizElem={quizElem} answers={quizElem.answers} setQuestion={setQuestion}/>
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
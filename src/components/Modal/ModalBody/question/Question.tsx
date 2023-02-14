import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import {Card, Form, Input, InputNumber, Upload} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import css from '../../ModalQuiz.module.css';
import {IAnswers, IQuiz, IQuizGroup} from "../../../../api/quiz.api";
import {isOnlyNumbers} from "../../../../utils/utils";
import {useAppDispatch} from "../../../../hooks/reduxHooks";
import {deleteQuiz} from "../../../../store/slices/quizGropSlice";
import {AnswerContainer} from "../answer/AnswerContainer";

const initQuiz: IQuiz = {
    answers: [] as IAnswers[],
    img: "",
    question: "",
    timer: 0,
    id: '',
    idQuizGroup:'',
}

export const Question = (props: {
    setComponentDisabled?: (a: boolean) => void;
    componentDisabled: boolean;
    quizElem: IQuiz;
    id: string;
    setQuiz: Dispatch<SetStateAction<IQuizGroup>>;
}): JSX.Element => {
    const {componentDisabled, setComponentDisabled, id, quizElem, setQuiz} = props;
    const dispatch = useAppDispatch();
    const [input, setInput] = useState<string>(quizElem.question ?? '');
    const [inputNumber, setInputNumber] = useState<number>(quizElem.timer ?? 0);
    const handelDeleteQuiz = () => {
        dispatch(deleteQuiz({id: id, idQuiz: quizElem.id}));
    };

    const onFormLayoutChange = ({disabled}: { disabled: boolean }) => {
        setComponentDisabled && setComponentDisabled(disabled);
    };
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    };

    const onBlurInput = useCallback(() => {
        setQuiz(prevState => {
            const index = prevState.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return prevState;
            return {
                ...prevState, quiz: [...prevState.quiz.slice(0, index),
                    {...prevState.quiz[index], question: input},
                    ...prevState.quiz.slice(index + 1)]
            };
        });
    }, [input]);

    const onBlurInputNumber = useCallback(() => {
        setQuiz(prevState => {
            const index = prevState.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return prevState;
            return {
                ...prevState, quiz: [...prevState.quiz.slice(0, index),
                    {...prevState.quiz[index], timer: inputNumber},
                    ...prevState.quiz.slice(index + 1)]
            };
        });
    }, [inputNumber]);

    return (
        <Card className={css.question_wrapper}>
            <Form
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
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
                <AnswerContainer quizElem={quizElem} answers={quizElem.answers} setQuiz={setQuiz}/>
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


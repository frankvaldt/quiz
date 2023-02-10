import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";
import css from "../../ModalQuiz.module.css";
import {Button, Checkbox, Form, Input} from "antd";
import {IAnswers, IQuizApi} from "../../../../api/quiz.api";
import {checkSpacesString, uuid} from "../../../../utils/utils";

export const AddAnswer = (props: {
    setQuiz: Dispatch<SetStateAction<IQuizApi>>
    setLocalAnswers: Dispatch<SetStateAction<IAnswers[]>>
}): JSX.Element => {
    const {setQuiz, setLocalAnswers} = props;
    const [inputAnswer, setInputAnswer] = useState<string>('');
    const [isTrue, setIsTrue] = useState<boolean>(false);
    const handlerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setInputAnswer(inputValue);
    };

    const addAnswer = () => {
        if (!checkSpacesString(inputAnswer)) {
            setLocalAnswers(prevState => [...prevState, {text: inputAnswer.trim(), isCorrect: !isTrue, id: uuid()}]);
            setQuiz((prevState) => ({
                ...prevState,
                answers: [...prevState.answers, {text: inputAnswer.trim(), isCorrect: !isTrue, id: uuid()}]
            }));
        }
    };
    return (
        <Form.Item label="Add answer" valuePropName="AddAnswer">
            <div className={css.answer_wrapper}>
                <PlusCircleOutlined className={css.add_icon} onClick={addAnswer}/>
                <div className={css.input}>
                    <Input placeholder="Add answer text" value={inputAnswer} onChange={handlerInputChange}/>
                </div>
                <Checkbox onChange={() => setIsTrue(prevState => !prevState)}>Is true</Checkbox>
            </div>
        </Form.Item>
    );
}
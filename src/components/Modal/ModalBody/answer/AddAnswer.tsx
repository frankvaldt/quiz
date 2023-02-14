import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";
import css from "../../ModalQuiz.module.css";
import {Checkbox, Form, Input} from "antd";
import {IQuiz, IQuizGroup} from "../../../../api/quiz.api";
import {checkSpacesString, uuid} from "../../../../utils/utils";

export const AddAnswer = (props: {
    quizElem: IQuiz;
    setQuiz: Dispatch<SetStateAction<IQuizGroup>>;
}): JSX.Element => {
    const {setQuiz, quizElem} = props;
    const [inputAnswer, setInputAnswer] = useState<string>('');
    const [isTrue, setIsTrue] = useState<boolean>(false);
    const handlerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setInputAnswer(inputValue);
    };

    const addAnswers = useCallback(() => {
        setQuiz(prevState => {
            const index = prevState.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return prevState;
            return {
                ...prevState, quiz: [...prevState.quiz.slice(0, index),
                    {
                        ...prevState.quiz[index], answers: [...prevState.quiz[index].answers,
                            {text: inputAnswer.trim(), isCorrect: isTrue, id: uuid(), idQuiz: prevState.quiz[index].id}]
                    },
                    ...prevState.quiz.slice(index + 1)]
            };
        });
    }, [inputAnswer, isTrue]);

    const addAnswer = () => {
        if (!checkSpacesString(inputAnswer)) {
          addAnswers();
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
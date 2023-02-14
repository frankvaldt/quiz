import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import {PlusCircleOutlined} from "@ant-design/icons";
import css from "../../ModalQuiz.module.css";
import {Checkbox, Form, Input} from "antd";
import {IQuiz, IQuizGroup} from "../../../../api/quiz.api";
import {checkSpacesString, uuid} from "../../../../utils/utils";
import {Updater} from "use-immer";

export const AddAnswer = (props: {
    quizElem: IQuiz;
    updateProduct: Updater<IQuizGroup>;
}): JSX.Element => {
    const {quizElem, updateProduct} = props;
    const [inputAnswer, setInputAnswer] = useState<string>('');
    const [isTrue, setIsTrue] = useState<boolean>(false);
    const handlerInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = event.target.value;
        setInputAnswer(inputValue);
    };

    const addAnswers = useCallback(() => {
        updateProduct(draft => {
            const index = draft.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return;
            draft.quiz[index].answers.push({text: inputAnswer.trim(), isCorrect: isTrue, id: uuid(), idQuiz: quizElem.id});
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
import React, {Dispatch, SetStateAction} from "react";
import {Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {IAnswers, IQuizApi} from "../../../../api/quiz.api";

export const Answer = (props: {
    answer: IAnswers;
    setQuiz: Dispatch<SetStateAction<IQuizApi>>
    setLocalAnswers: Dispatch<SetStateAction<IAnswers[]>>
}): JSX.Element => {
    const {answer, setQuiz, setLocalAnswers} = props;
    const {id, text, isCorrect} = answer;
    const color = isCorrect ? 'red' : 'green';
    const deleteButtonHandler = () => {
        setLocalAnswers((prevState) => {
            const filtered = prevState.filter((elem) => elem.id !== id);
            setQuiz((prev) => ({...prev, answers: filtered}));
            return filtered;
        });
    };
    return (
        <>
            <Button style={{color: color, borderColor: color}}>
                {text}
                <CloseCircleOutlined onClick={deleteButtonHandler}/>
            </Button>
        </>
    );
}
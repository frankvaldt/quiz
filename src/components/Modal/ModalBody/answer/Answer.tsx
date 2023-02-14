import React, {Dispatch, SetStateAction, useCallback} from "react";
import {Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {IAnswers, IQuiz, IQuizGroup} from "../../../../api/quiz.api";

export const Answer = (props: {
    answer: IAnswers;
    quizElem: IQuiz;
    setQuestion: Dispatch<SetStateAction<IQuiz>>;
}): JSX.Element => {
    const {answer, setQuestion, quizElem} = props;
    const {id, text, isCorrect} = answer;
    const color = !isCorrect ? '#1677ff' : 'green';

    const deleteAnswers = useCallback(() => {
        setQuestion(prevState => ({
            ...prevState,
            answers: [...prevState.answers.filter(elem => elem.id !== id)]
        }));
    }, []);

    const deleteButtonHandler = () => {
        deleteAnswers();
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
import React, {Dispatch, SetStateAction, useCallback} from "react";
import {Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {IAnswers, IQuizApi, IQuizGroup} from "../../../../api/quiz.api";

export const Answer = (props: {
    answer: IAnswers;
    quizElem: IQuizApi;
    setQuiz: Dispatch<SetStateAction<IQuizGroup>>
}): JSX.Element => {
    const {answer, setQuiz, quizElem} = props;
    const {id, text, isCorrect} = answer;
    const color = !isCorrect ? 'red' : 'green';

    const deleteAnswers = useCallback(() => {
        setQuiz(prevState => {
            const index = prevState.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return prevState;
            return {
                ...prevState, quiz: [...prevState.quiz.slice(0, index),
                    {
                        ...prevState.quiz[index],
                        answers: [...prevState.quiz[index].answers.filter(elem => elem.id !== id)]
                    },
                    ...prevState.quiz.slice(index + 1)]
            };
        });
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
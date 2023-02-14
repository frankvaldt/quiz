import React, {useCallback} from "react";
import {Button} from "antd";
import {CloseCircleOutlined} from "@ant-design/icons";
import {IAnswers, IQuiz, IQuizGroup} from "../../../../api/quiz.api";
import {Updater} from "use-immer";

export const Answer = (props: {
    answer: IAnswers;
    quizElem: IQuiz;
    updateProduct: Updater<IQuizGroup>;
}): JSX.Element => {
    const {answer, quizElem, updateProduct} = props;
    const {id, text, isCorrect} = answer;
    const color = !isCorrect ? '#1677ff' : 'green';

    const deleteAnswers = useCallback(() => {
        updateProduct(draft => {
            const index = draft.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return;
            draft.quiz[index].answers = draft.quiz[index].answers.filter(elem => elem.id !== id);
        });
    }, [id]);

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
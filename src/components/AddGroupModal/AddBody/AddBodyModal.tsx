import React, {Dispatch, SetStateAction, useState} from "react";
import {uuid} from "../../../utils/utils";
import {Question} from "../../Modal/ModalBody/question/Question";
import css from "../../Modal/ModalQuiz.module.css";
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {IQuiz, IQuizGroup} from "../../../api/quiz.api";

const init: IQuiz = {
    answers: [], id: "", img: "", question: "", timer: 0, idQuizGroup: '',
};

export const AddBodyModal = (props: {
    quizGroup: IQuizGroup;
    setQuiz: Dispatch<SetStateAction<IQuizGroup>>;
}): JSX.Element => {
    const {quizGroup, setQuiz} = props;
    const [quizElem] = useState<IQuiz>(init);
    console.log('quizElem', quizElem);
    return (
        <>
            <div className={css.icon_wrapper}>
                <PlusCircleOutlined className={css.add}/>
            </div>
            <Question quizElem={quizElem} key={uuid()}
                      componentDisabled={false}
                      id={quizGroup.id} setQuiz={setQuiz}
            />
        </>
    );
}
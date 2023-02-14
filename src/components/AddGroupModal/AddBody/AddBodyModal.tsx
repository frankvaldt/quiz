import React, {Dispatch, MutableRefObject, SetStateAction, useEffect, useState} from "react";
import {uuid} from "../../../utils/utils";
import css from "../../Modal/ModalQuiz.module.css";
import {PlusCircleOutlined} from "@ant-design/icons";
import {IQuiz, IQuizGroup} from "../../../api/quiz.api";
import {AddQuestion} from "../AddQuestion/AddQuestion";


export const AddBodyModal = (props: {
    question: IQuiz;
    setQuestion: Dispatch<SetStateAction<IQuiz>>;
    id: string;
}): JSX.Element => {
    const {question, setQuestion, id} = props;
    return (
        <>
            <div className={css.icon_wrapper}>
                <PlusCircleOutlined className={css.add}/>
            </div>
            <AddQuestion quizElem={question} key={uuid()}
                         id={id} setQuestion={setQuestion}
            />
        </>
    );
}
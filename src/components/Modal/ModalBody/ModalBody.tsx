import React, {Dispatch, SetStateAction, useState} from "react";
import css from '../ModalQuiz.module.css';
import {PlusCircleOutlined} from "@ant-design/icons";
import {IQuiz, IQuizGroup} from "../../../api/quiz.interface";
import {uuid} from "../../../utils/utils";
import {Updater} from "use-immer";
import {AddQuestion} from "../../AddGroupModal/AddQuestion/AddQuestion";

const init: IQuiz = {
    answers: [], id: "", img: "", question: "", timer: 0, idQuizGroup: '',
};

export const ModalBody = (props: {
    quizGroup: IQuizGroup;
    updateProduct: Updater<IQuizGroup>;
}): JSX.Element => {
    const {quizGroup, updateProduct} = props;
    const onClick = () => {
        updateProduct(draft => {
            draft.quiz.unshift({...init, idQuizGroup: quizGroup.id, id: uuid()});
        });
    }
    return (
        <>
            <div className={css.icon_wrapper} onClick={onClick}>
                <PlusCircleOutlined className={css.add}/>
            </div>
            {quizGroup.quiz.map(quizElem => <AddQuestion quizElem={quizElem} key={uuid()}
                                                    updateProduct={updateProduct}/>)}
        </>
    );
}
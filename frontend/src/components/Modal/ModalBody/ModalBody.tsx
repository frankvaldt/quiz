import React, {useState} from "react";
import css from '../ModalQuiz.module.css';
import {IQuiz, IQuizGroup} from "../../../api/quiz.interface";
import {uuid} from "../../../utils/utils";
import {Updater} from "use-immer";
import {AddQuestion} from "../../AddGroupModal/AddQuestion/AddQuestion";
import {Button} from "antd";

const init: IQuiz = {
    answers: [], id: "", img: "", question: "", timer: 0, idQuizGroup: '',
};

export const ModalBody = (props: {
    quizGroup: IQuizGroup;
    updateProduct: Updater<IQuizGroup>;
}): JSX.Element => {
    const {quizGroup, updateProduct} = props;
    const onClick = () => {
        if(quizGroup.quiz.at(-1)?.question.length===0){
            setDisableCreation(true);
            return;
        }
        updateProduct(draft => {
            draft.quiz.push({...init, idQuizGroup: quizGroup.id, id: uuid()});
        });
    }
    const [disableCreation, setDisableCreation] = useState(false);
    return (
        <>
            {quizGroup.quiz.map(quizElem => <AddQuestion quizElem={quizElem} key={uuid()}
                                                    updateProduct={updateProduct}/>)}
             <div className={css.create_a_question} onClick={onClick}>
                <Button type={'dashed'} disabled={disableCreation}>
                    Create a question
                </Button>
            </div>
        </>
    );
}
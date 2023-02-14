import React, {Dispatch, SetStateAction, useState} from "react";
import css from '../ModalQuiz.module.css';
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {IQuiz, IQuizGroup} from "../../../api/quiz.api";
import {uuid} from "../../../utils/utils";
import {QuestionElem} from "./question/QuestionElem";
import {AddQuestion} from "../../AddGroupModal/AddQuestion/AddQuestion";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {addQuestionToStart, addToStartGroup} from "../../../store/slices/quizGropSlice";

const init: IQuiz = {
    answers: [], id: "", img: "", question: "", timer: 0, idQuizGroup: '',
};

export const ModalBody = (props: {
    quizGroup: IQuizGroup;
    setQuiz: Dispatch<SetStateAction<IQuizGroup>>;
}): JSX.Element => {
    const {quizGroup, setQuiz} = props;
    const [question, setQuestion] = useState<IQuiz>({...init, idQuizGroup: quizGroup.id});
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const [localQuiz, setLocalQuiz] = useState(quizGroup.quiz);
    const onClick = () => {
        setLocalQuiz(prevState => [question, ...prevState]);
    }
    return (
        <>
            <div className={css.icon_wrapper} onClick={onClick}>
                <PlusCircleOutlined className={css.add}/>
            </div>
            {isOpen && <AddQuestion quizElem={question} key={uuid()}
                         id={quizGroup.id} setQuestion={setQuestion}
            />}
            {localQuiz.map(quizElem => <QuestionElem quizElem={quizElem} key={uuid()} id={quizGroup.id} setLocalQuiz={setLocalQuiz}/>)}
        </>
    );
}
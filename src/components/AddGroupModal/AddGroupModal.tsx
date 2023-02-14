import React, {ChangeEvent, Dispatch, SetStateAction, useRef, useState} from "react";
import Modal from "antd/es/modal/Modal";
import css from "../Modal/ModalQuiz.module.css";
import {Input} from "antd";
import {ModalFooter} from "../Modal/ModalFooter/ModalFooter";
import {IQuiz, IQuizGroup} from "../../api/quiz.api";
import {AddBodyModal} from "./AddBody/AddBodyModal";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {addQuestion, addQuizGroup} from "../../store/slices/quizGropSlice";
import {uuid} from "../../utils/utils";

const initQuizGroup: IQuizGroup = {
    id: "",
    quiz: [],
    title: ""
}

const init: IQuiz = {
    answers: [], id: "", img: "", question: "", timer: 0, idQuizGroup: '',
};

export const AddGroupModal = (props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    quizGroup?: IQuizGroup;
}): JSX.Element => {
    const {open, setOpen, quizGroup} = props;
    const [quiz, setQuiz] = useState<IQuizGroup>(quizGroup ?? initQuizGroup);
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState<IQuiz>(init);
    const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuiz((prevState) => ({...prevState, title: event.target.value}));
    };
    const handleCancel = () => {
        setOpen(false);
        setQuestion(init);
        setQuiz(quizGroup ?? initQuizGroup);
    };
    const handleOk = () => {
        const id = uuid();
        dispatch(addQuizGroup({...quiz, id: id}));
        dispatch(addQuestion({id: id, quiz: {...question, idQuizGroup: id}}))
        setOpen(false);
        setQuestion(init);
        setQuiz(quizGroup ?? initQuizGroup);
    };
    return (
        <Modal
            className={css.modal}
            open={open}
            width={'60%'}
            title={<Input bordered={false}
                          placeholder={'Add group title'}
                          onChange={handelInputChange}
                          value={quiz.title}/>} onOk={handleOk}
            onCancel={handleCancel}
            footer={<ModalFooter handleCancel={handleCancel} loading={false} handleOk={handleOk}/>}
        >
            <AddBodyModal question={question} id={quiz.id} setQuestion={setQuestion}/>
        </Modal>
    );
}
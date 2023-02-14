import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import Modal from "antd/es/modal/Modal";
import css from "../Modal/ModalQuiz.module.css";
import {Input} from "antd";
import {ModalFooter} from "../Modal/ModalFooter/ModalFooter";
import {IQuiz, IQuizGroup} from "../../api/quiz.api";
import {ModalBody} from "../Modal/ModalBody/ModalBody";
import {AddBodyModal} from "./AddBody/AddBodyModal";

const init:IQuizGroup = {
    id: "",
    quiz: [],
    title: ""
};

export const AddGroupModal = (props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}): JSX.Element => {
    const {open, setOpen} = props;
    const [input, setInput] = useState<string>('');
    const [quiz, setQuiz] = useState<IQuizGroup>(init);
    const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleOk = () => {
        setOpen(false);
    };
    return (
        <Modal
            className={css.modal}
            open={open}
            width={'60%'}
            title={<Input bordered={false} placeholder={'Add group title'} onChange={handelInputChange}
                          value={quiz.title}/>} onOk={handleOk}
            onCancel={handleCancel}
            footer={<ModalFooter handleCancel={handleCancel} loading={false} handleOk={handleOk}/>}
        >
            <AddBodyModal quizGroup={quiz} setQuiz={setQuiz}/>
        </Modal>
    );
}
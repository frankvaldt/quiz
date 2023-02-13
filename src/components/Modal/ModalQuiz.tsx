import React, {ChangeEvent, Dispatch, SetStateAction, useState} from "react";
import {Button, Input} from "antd";
import Modal from "antd/es/modal/Modal";
import {ModalFooter} from "./ModalFooter/ModalFooter";
import {ModalBody} from "./ModalBody/ModalBody";
import {DeleteOutlined} from "@ant-design/icons";
import css from './ModalQuiz.module.css';
import {IQuizGroup} from "../../api/quiz.api";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {changeTitleQuizGroup, removeQuizGroup} from "../../store/slices/quizGropSlice";

export const ModalQuiz = (props: {
    quizGroup: IQuizGroup;
}): JSX.Element => {
    const {quizGroup} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [quiz, setQuiz] = useState<IQuizGroup>(quizGroup);
    const dispatch = useAppDispatch();
    const showModal = () => {
        setOpen(true);
    };
    const handleCancel = () => {
        setOpen(false);
    };
    const handleOk = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setOpen(false);
        }, 3000);
    };

    const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTitleQuizGroup({
            id: quizGroup.id,
            title: event.target.value
        }));
    };

    const handlerDeleteQuizGroup = () => {
        dispatch(removeQuizGroup(quizGroup.id));
    }
    return (
        <>
            <div className={css.button_wrapper}>
                <Button type="primary" onClick={showModal}>
                    {quiz.title}
                </Button>
                <DeleteOutlined onClick={handlerDeleteQuizGroup} className={css.remove}/>
            </div>
            <Modal
                className={css.modal}
                open={open}
                width={'60%'}
                title={<Input bordered={false} onChange={handelInputChange} value={quiz.title}/>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={<ModalFooter handleCancel={handleCancel} loading={loading} handleOk={handleOk}/>}
            >
                <ModalBody quizGroup={quiz}/>
            </Modal>
        </>
    );
}
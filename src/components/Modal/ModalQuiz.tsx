import React, {ChangeEvent, useState} from "react";
import {Button, Input} from "antd";
import Modal from "antd/es/modal/Modal";
import {ModalFooter} from "./ModalFooter/ModalFooter";
import {ModalBody} from "./ModalBody/ModalBody";
import {DeleteOutlined} from "@ant-design/icons";
import css from './ModalQuiz.module.css';
import {IQuizGroup} from "../../api/quiz.api";
import {useImmer} from "use-immer";

export const ModalQuiz = (props: {
    quizGroup: IQuizGroup;
    deleteHandler: () => void;
}): JSX.Element => {
    const {quizGroup, deleteHandler} = props;
    const [open, setOpen] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [product, updateProduct] = useImmer<IQuizGroup>(quizGroup);

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
        updateProduct(draft => {draft.title = event.target.value});
    };
    return (
        <>
            <div className={css.button_wrapper}>
                <Button type="primary" onClick={showModal}>
                    {product.title}
                </Button>
                <DeleteOutlined onClick={deleteHandler} className={css.remove}/>
            </div>
            <Modal
                className={css.modal}
                open={open}
                width={'60%'}
                title={<Input bordered={false} placeholder={'Add group title'} onChange={handelInputChange}
                              value={product.title}/>}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={<ModalFooter handleCancel={handleCancel} loading={loading} handleOk={handleOk}/>}
            >
                <ModalBody quizGroup={product} updateProduct={updateProduct}/>
            </Modal>
        </>
    );
}
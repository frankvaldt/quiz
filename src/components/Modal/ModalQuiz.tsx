import React, {useState} from "react";
import {Button} from "antd";
import Modal from "antd/es/modal/Modal";
import {ModalFooter} from "./ModalFooter/ModalFooter";
import {ModalBody} from "./ModalBody/ModalBody";
import {DeleteOutlined} from "@ant-design/icons";
import css from './ModalQuiz.module.css';

export const ModalQuiz = (props: {
    title: string;
}): JSX.Element => {
    const {title} = props;
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
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
    return (
        <>
            <div className={css.button_wrapper}>
                <Button type="primary" onClick={showModal}>
                    {title}
                </Button>
                <DeleteOutlined className={css.remove}/>
            </div>
            <Modal
                open={open}
                title="Title"
                onOk={handleOk}
                onCancel={handleCancel}
                footer={<ModalFooter handleCancel={handleCancel} loading={loading} handleOk={handleOk}/>}
            >
                <ModalBody/>
            </Modal>
        </>
    );
}
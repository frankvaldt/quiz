import React, {ChangeEvent, Dispatch, SetStateAction, useRef, useState} from "react";
import Modal from "antd/es/modal/Modal";
import css from "../Modal/ModalQuiz.module.css";
import {Input} from "antd";
import {ModalFooter} from "../Modal/ModalFooter/ModalFooter";
import {IQuiz, IQuizGroup} from "../../api/quiz.api";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {addQuestion, addQuizGroup} from "../../store/slices/quizGropSlice";
import {uuid} from "../../utils/utils";
import {useImmer} from "use-immer";
import {ModalBody} from "../Modal/ModalBody/ModalBody";

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
    const [product, updateProduct] = useImmer<IQuizGroup>(initQuizGroup);
    const dispatch = useAppDispatch();
    const [question, setQuestion] = useState<IQuiz>(init);
    const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateProduct((draft) => {
            draft.title = event.target.value
        });
    };
    const handleCancel = () => {
        setOpen(false);
        setQuestion(init);
        updateProduct(quizGroup ?? initQuizGroup);
    };
    const handleOk = () => {
        const id = uuid();
        dispatch(addQuizGroup({...product, id: id}));
        dispatch(addQuestion({id: id, quiz: {...question, idQuizGroup: id}}))
        setOpen(false);
        setQuestion(init);
        updateProduct(quizGroup ?? initQuizGroup);
    };
    return (
        <Modal
            className={css.modal}
            open={open}
            width={'60%'}
            title={<Input bordered={false}
                          placeholder={'Add group title'}
                          onChange={handelInputChange}
                          value={product.title}/>} onOk={handleOk}
            onCancel={handleCancel}
            footer={<ModalFooter handleCancel={handleCancel} loading={false} handleOk={handleOk}/>}
        >
            <ModalBody quizGroup={product} updateProduct={updateProduct}/>
        </Modal>
    );
}

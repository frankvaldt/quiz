import React, {ChangeEvent, Dispatch, SetStateAction} from "react";
import Modal from "antd/es/modal/Modal";
import css from "../Modal/ModalQuiz.module.css";
import {Input} from "antd";
import {ModalFooter} from "../Modal/ModalFooter/ModalFooter";
import {IQuizGroup} from "../../api/quiz.interface";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {addQuizGroup} from "../../store/slices/quizGropSlice";
import {uuid} from "../../utils/utils";
import {useImmer} from "use-immer";
import {ModalBody} from "../Modal/ModalBody/ModalBody";
import {addQuizGroupHttp} from "../../api/quiz.api";

const initQuizGroup: IQuizGroup = {
    id: "",
    quiz: [],
    title: ""
}

export const AddGroupModal = (props: {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    quizGroup?: IQuizGroup;
}): JSX.Element => {
    const {open, setOpen, quizGroup} = props;
    const [product, updateProduct] = useImmer<IQuizGroup>({...initQuizGroup, id: uuid()});
    const dispatch = useAppDispatch();

    const handelInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        updateProduct((draft) => {
            draft.title = event.target.value
        });
    };
    const handleCancel = () => {
        setOpen(false);
        updateProduct(quizGroup ?? {...initQuizGroup, id: uuid()});
    };
    const handleOk = () => {
        dispatch(addQuizGroup(product));
        addQuizGroupHttp(product).then(() => {
            setOpen(false);
            updateProduct(quizGroup ?? {...initQuizGroup, id: uuid()});
        });
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

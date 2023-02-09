import React, {useState} from "react";
import css from '../ModalQuiz.module.css';
import {EditOutlined, PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Question} from "./question/Question";

export const ModalBody = (): JSX.Element => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    return (
        <>
            <div className={css.icon_wrapper} onClick={() => setComponentDisabled(prevState => !prevState)}>
                <PlusCircleOutlined className={css.add}/>
                <EditOutlined className={`${!componentDisabled && css.icon}`}/>
            </div>
            <Question componentDisabled={componentDisabled} setComponentDisabled={setComponentDisabled}/>
            <Question componentDisabled={componentDisabled} setComponentDisabled={setComponentDisabled}/>
        </>
    );
}
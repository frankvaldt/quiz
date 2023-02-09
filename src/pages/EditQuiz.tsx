import React from "react";
import {ModalQuiz} from "../components/Modal/ModalQuiz";
import {PlusSquareTwoTone} from "@ant-design/icons";
import css from './EditQuize.module.css';

export const EditQuiz = (): JSX.Element => {
    return (
        <div className={css.wrapper}>
            <div className={css.add_icon}><PlusSquareTwoTone /></div>
            <ModalQuiz title={'First'}/>
        </div>
    );
}
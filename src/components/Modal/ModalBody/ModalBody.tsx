import React, {useState} from "react";
import css from '../ModalQuiz.module.css';
import {EditOutlined, PlusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import {Question} from "./question/Question";
import {IQuizApi} from "../../../api/quiz.api";

export const ModalBody = (props: {
    quiz: IQuizApi[]
}): JSX.Element => {
    const {quiz} = props;
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);

    return (
        <>
            <div className={css.icon_wrapper} onClick={() => setComponentDisabled(prevState => !prevState)}>
                <PlusCircleOutlined className={css.add}/>
                <EditOutlined className={`${!componentDisabled && css.icon}`}/>
            </div>
            {quiz.map(quizElem => <Question quizElem={quizElem}
                                            componentDisabled={componentDisabled}
                                            setComponentDisabled={setComponentDisabled}/>)}

        </>
    );
}
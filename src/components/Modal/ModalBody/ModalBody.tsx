import React, {useState} from "react";
import css from '../ModalQuiz.module.css';
import {EditOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {Question} from "./question/Question";
import {IQuizGroup} from "../../../api/quiz.api";
import {uuid} from "../../../utils/utils";

export const ModalBody = (props: {
    quizGroup: IQuizGroup
}): JSX.Element => {
    const {quizGroup} = props;
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    return (
        <>
            <div className={css.icon_wrapper} onClick={() => setComponentDisabled(prevState => !prevState)}>
                <PlusCircleOutlined className={css.add}/>
                <EditOutlined className={`${!componentDisabled && css.icon}`}/>
            </div>
            {quizGroup.quiz.map(quizElem => <Question quizElem={quizElem} key={uuid()}
                                            componentDisabled={componentDisabled}
                                            id={quizGroup.id}
                                            setComponentDisabled={setComponentDisabled}/>)}

        </>
    );
}
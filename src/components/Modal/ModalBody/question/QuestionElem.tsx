import React, {Dispatch, SetStateAction, useState} from "react";
import {AddQuestion} from "../../../AddGroupModal/AddQuestion/AddQuestion";
import {uuid} from "../../../../utils/utils";
import {IQuiz} from "../../../../api/quiz.api";

export const QuestionElem = (props: {
    quizElem: IQuiz;
    id: string;
    setLocalQuiz?: Dispatch<SetStateAction<IQuiz[]>>
}): JSX.Element => {
    const {quizElem, id, setLocalQuiz} = props;
    const [question, setQuestion] = useState(quizElem);
    return <AddQuestion quizElem={question} key={uuid()} setLocalQuiz={setLocalQuiz}
                        id={id} setQuestion={setQuestion}
    />
}
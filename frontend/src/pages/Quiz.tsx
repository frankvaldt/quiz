import React from "react";
import {useAppSelector} from "../hooks/reduxHooks";
import {uuid} from "../utils/utils";
import {ModalQuiz} from "../components/Modal/ModalQuiz";

export const Quiz = (): JSX.Element => {
    const quizGroupFromState = useAppSelector(state => state.quizGrop.quizGrop);
    return (
        <>
            {quizGroupFromState.map((quiz) =>
                <div key={uuid()}>

                </div>)}
        </>
    );
}
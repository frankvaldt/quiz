import React, {ChangeEvent, useState} from "react";
import {Card, Form, Input, InputNumber, Upload} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import css from '../../ModalQuiz.module.css';
import {IAnswers, IQuizApi} from "../../../../api/quiz.api";
import {isOnlyNumbers} from "../../../../utils/utils";
import {useAppDispatch, useAppSelector} from "../../../../hooks/reduxHooks";
import {deleteQuiz, changeQuestion} from "../../../../store/slices/quizGropSlice";

const initQuiz: IQuizApi = {
    answers: [] as IAnswers[],
    img: "",
    question: "",
    timer: 0,
    id: '',
}

export const Question = (props: {
    setComponentDisabled: (a: boolean) => void;
    componentDisabled: boolean;
    quizElem: IQuizApi;
    id: string;
}): JSX.Element => {
    const quizGroupFromState = useAppSelector(state => state.quizGrop.quizGrop);
    const {componentDisabled, setComponentDisabled, id, quizElem} = props;
    const [tempState, setTempState] = useState(quizElem ?? initQuiz);
    const dispatch = useAppDispatch();

    const handelDeleteQuiz = () => {
        dispatch(deleteQuiz({id: id, idQuiz: quizElem.id}));
    };

    const onFormLayoutChange = ({disabled}: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    };

    const onChangeQuiz = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        dispatch(changeQuestion({id: id, idQuiz: quizElem.id, text: value.toString()}))
    };

    return (
        <Card className={css.question_wrapper}>
            <Form
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
            >
                <div className={css.remove_container}>
                    <DeleteOutlined className={css.remove} onClick={handelDeleteQuiz}/>
                </div>
                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Enter a question" valuePropName="fileList">
                    <Input name={"question"} value={tempState.question} placeholder="Write a question"
                           onChange={onChangeQuiz}/>
                </Form.Item>
                {/*<AnswerContainer answers={quizElem.answers} setQuiz={setLocalQuiz}/>*/}
                <Form.Item label="Enter a timer" valuePropName="fileList">
                    <InputNumber min={0} value={tempState.timer}
                                 onChange={(value) => {
                                     if (value && isOnlyNumbers(value.toString())) {
                                         setTempState((prevState => ({
                                             ...prevState,
                                             timer: parseInt(value.toString())
                                         })))
                                     }
                                 }}/>
                </Form.Item>
            </Form>
        </Card>
    );
}


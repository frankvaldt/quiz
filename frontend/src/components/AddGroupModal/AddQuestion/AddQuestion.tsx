import React, {ChangeEvent, Dispatch, SetStateAction, useCallback, useState} from "react";
import {Card, Form, Input, InputNumber, Upload, UploadFile, UploadProps} from "antd";
import css from "../../Modal/ModalQuiz.module.css";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {checkSpacesString, isOnlyNumbers} from "../../../utils/utils";
import {IQuiz, IQuizGroup} from "../../../api/quiz.interface";
import {AnswerContainer} from "../../Modal/ModalBody/answer/AnswerContainer";
import {Updater} from "use-immer";
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {BASE_URL} from "../../../paths/paths";

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
};

export const AddQuestion = (props: {
    quizElem: IQuiz;
    updateProduct: Updater<IQuizGroup>;
}): JSX.Element => {
    const {quizElem, updateProduct} = props;
    const [loading, setLoading] = useState(false);
    const [input, setInput] = useState<string>(quizElem.question ?? '');
    const [inputNumber, setInputNumber] = useState<number>(quizElem.timer ?? 0);
    const [imageUrl, setImageUrl] = useState<string>();
    const img = quizElem.img ?? '';
    const handleChange: UploadProps['onChange'] = (info: UploadChangeParam<UploadFile>) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as RcFile, url => {
                setLoading(false);
                setImageUrl(url);
                updateProduct(draft => {
                    const index = draft.quiz.findIndex(elem => elem.id === quizElem.id);
                    if (index === -1) return;
                    draft.quiz[index].img = url;
                })
                console.log('url', url);
            });
        }
    };
    const handelDeleteQuiz = () => {
        updateProduct(draft => {
            draft.quiz = draft.quiz.filter(elem => elem.id !== quizElem.id);
        });
    };
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value)
    };
    const onBlurInput = useCallback(() => {
        updateProduct(draft => {
            const index = draft.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return;
            draft.quiz[index].question = input;
        });
    }, [input]);
    const onBlurInputNumber = useCallback(() => {
        updateProduct(draft => {
            const index = draft.quiz.findIndex(elem => elem.id === quizElem.id);
            if (index === -1) return;
            draft.quiz[index].timer = inputNumber;
        });
    }, [inputNumber]);
    return (
        <Card className={css.question_wrapper}>
            <Form layout="horizontal">
                <div className={css.remove_container}>
                    <DeleteOutlined className={css.remove} onClick={handelDeleteQuiz}/>
                </div>
                <Form.Item label="Upload" valuePropName="fileList">
                    <div className={css.img_container}>
                        <Upload action={`${BASE_URL}/upload.do`} name={"image"} listType="picture-card"
                                onChange={handleChange} maxCount={1}>
                            <div>
                                <PlusOutlined/>
                                <div style={{marginTop: 8}}>Upload</div>
                            </div>
                        </Upload>
                        <div className={css.img}>
                            <img alt={"ur pic"}
                                 src={!checkSpacesString(img) ? quizElem.img : "https://www.whats-on-netflix.com/wp-content/uploads/2022/07/spy-x-family-part-2-coming-to-netflix.webp"}/>
                        </div>
                    </div>
                </Form.Item>
                <Form.Item label="Enter a question" valuePropName="fileList">
                    <Input name={"question"} value={input} onBlur={onBlurInput} placeholder="Write a question"
                           onChange={onChange}/>
                </Form.Item>
                <AnswerContainer quizElem={quizElem} answers={quizElem.answers}
                                 updateProduct={updateProduct}/>
                <Form.Item label="Enter a timer" valuePropName="fileList">
                    <InputNumber min={0} value={inputNumber} onBlur={onBlurInputNumber}
                                 onChange={(value) => {
                                     if (value && isOnlyNumbers(value.toString())) {
                                         setInputNumber(parseInt(value.toString()));
                                     }
                                 }}/>
                </Form.Item>
            </Form>
        </Card>
    );
}
import React from "react";
import {Button} from "antd";

export const Answer = (props: {
    text: string;
    isCorrect?: boolean;
}): JSX.Element => {
    const {text, isCorrect} = props;
    const color = isCorrect ? 'red' : 'green';
    return (
        <Button style={{color: color, borderColor: color}}>
            {text}
        </Button>
    );
}
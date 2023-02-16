import React from "react";
import {Button} from "antd";

export const ModalFooter = (props: {
    handleCancel: () => void;
    loading: boolean;
    handleOk: () => void;
}): JSX.Element => {
    const {handleCancel, loading, handleOk} = props;
    return (
        <div>
            <Button key="back" onClick={handleCancel}>
                Return
            </Button>
            <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                Submit
            </Button>

        </div>
    );
}
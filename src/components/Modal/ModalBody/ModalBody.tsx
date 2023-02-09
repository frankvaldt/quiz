import React, {useState} from "react";
import {Checkbox, Form, Upload} from "antd";
import {PlusOutlined} from "@ant-design/icons";

export const ModalBody = (): JSX.Element => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(true);
    const onFormLayoutChange = ({disabled}: { disabled: boolean }) => {
        setComponentDisabled(disabled);
    };
    return (
        <>
            <Checkbox checked={componentDisabled} onChange={e => setComponentDisabled(e.target.checked)}>
                Form disabled
            </Checkbox>
            <Form
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                onValuesChange={onFormLayoutChange}
                disabled={componentDisabled}
            >
                <Form.Item label="Upload" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined/>
                            <div style={{marginTop: 8}}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>
            </Form>
        </>
    );
}
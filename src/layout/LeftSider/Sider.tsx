import React, {useState} from "react";
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {PlusSquareOutlined} from "@ant-design/icons";

const items = [ {
    key: '1',
    icon: <PlusSquareOutlined />,
    label: 'Edit Quiz'
  }]

export const LeftSider = (): JSX.Element => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items}/>
            </Sider>
        </>
    );
}
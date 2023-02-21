import React, {useState} from "react";
import Sider from "antd/es/layout/Sider";
import {Menu} from "antd";
import {PlusSquareOutlined, TableOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";
import {MAIN_CONTENT, QUIZ_RESULT} from "../../paths/paths";

const items = [{
    key: '1',
    icon: <PlusSquareOutlined/>,
    label: 'Edit Quiz',
    url: MAIN_CONTENT
},
    {
        key: '2',
        icon: <TableOutlined/>,
        label: 'Table',
        url: QUIZ_RESULT
    }
]

export const LeftSider = (): JSX.Element => {
    const [collapsed, setCollapsed] = useState(true);

    return (
        <>
            <Sider collapsible collapsed={collapsed} onCollapse={value => setCollapsed(value)}>
                <div className="logo"/>
                <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
                    {items.map((elem, i) =>
                        <Menu.Item key={i} title="" icon={elem.icon}>
                            <Link to={elem.url || ''}>{elem.label}</Link>
                        </Menu.Item>)}
                </Menu>
            </Sider>
        </>
    );
}
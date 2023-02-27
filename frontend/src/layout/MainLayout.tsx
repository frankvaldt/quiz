import {Layout} from "antd";
import {Content, Header} from "antd/es/layout/layout";
import React from "react";
import css from "./MainLayout.module.css";
import {Outlet} from 'react-router-dom';
import {LeftSider} from "./LeftSider/Sider";

export const MainLayout = () => {
    return (
        <Layout className={css.mainContent}>
            <Header>
                <div className={css.header}>
                    <div>Admin panel</div>
                    <div className={css.avatar}/>
                </div>
            </Header>
            <Layout style={{minHeight: '100vh'}}>
                <LeftSider/>
                <Content>
                    <div>
                        <Outlet/>
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
}
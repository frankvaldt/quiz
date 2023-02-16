import React from 'react';
import './App.css';
import {MainRouter} from "./components/router/MainRouter";
import {ConfigProvider} from "antd";

function App() {
    return (
        <>
            <ConfigProvider>
                <MainRouter/>
            </ConfigProvider>
        </>
    );
}

export default App;

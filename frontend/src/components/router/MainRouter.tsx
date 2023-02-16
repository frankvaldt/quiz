import React from "react";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import RequireAuth from "./RequireAuth";
import {MainLayout} from "../../layout/MainLayout";
import {DASHBOARD_PATH, LOGIN, MAIN_CONTENT} from "../../paths/paths";
import {EditQuiz} from "../../pages/EditQuiz";
import {Auth} from "../../pages/auth/Auth";

export const MainRouter = (): JSX.Element => {
    const protectedLayout = (
        <RequireAuth>
            <MainLayout/>
        </RequireAuth>
    );
    return (
        <BrowserRouter>
            <Routes>
                <Route path={LOGIN} element={<Auth />} />
                <Route path={DASHBOARD_PATH} element={protectedLayout}>
                    <Route index/>
                    <Route path="*" element={<Navigate to={MAIN_CONTENT} replace/>}/>
                    <Route path={MAIN_CONTENT} element={<EditQuiz />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
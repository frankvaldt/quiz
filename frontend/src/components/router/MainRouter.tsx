import React, {useEffect} from "react";
import {BrowserRouter, Route, Routes, Navigate, useNavigate, useLocation} from "react-router-dom";
import RequireAuth from "./RequireAuth";
import {MainLayout} from "../../layout/MainLayout";
import {DASHBOARD_PATH, LOGIN, MAIN_CONTENT, QUIZ_RESULT} from "../../paths/paths";
import {EditQuiz} from "../../pages/EditQuiz";
import {Auth} from "../../pages/auth/Auth";
import {ResultQuiz} from "../../pages/ResultQuiz";

export const MainRouter = (): JSX.Element => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let url = localStorage.getItem('location') ?? MAIN_CONTENT;
        if (url === '/') url = MAIN_CONTENT;
        navigate(url)
    }, []);
    useEffect(() => {
        localStorage.setItem('location', location.pathname);
    }, [location.pathname]);
    const protectedLayout = (
        <RequireAuth>
            <MainLayout/>
        </RequireAuth>
    );
    return (
        <Routes>
            <Route path={LOGIN} element={<Auth/>}/>
            <Route path={DASHBOARD_PATH} element={protectedLayout}>
                <Route index/>
                <Route path="*" element={<Navigate to={MAIN_CONTENT} replace/>}/>
                <Route path={MAIN_CONTENT} element={<EditQuiz/>}/>
                <Route path={QUIZ_RESULT} element={<ResultQuiz/>}/>
            </Route>
        </Routes>
    );
}
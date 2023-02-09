import React from 'react';
import { Navigate } from 'react-router-dom';
import {useAppSelector} from "../../hooks/reduxHooks";
import {LOGIN} from "../../paths/paths";

const RequireAuth: React.FC<any> = ({ children }) => {
  const user = useAppSelector((state) => state.auth.user);

  return !user ? <>{children}</> : <Navigate to={LOGIN} replace />;
};

export default RequireAuth;

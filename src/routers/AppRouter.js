import React, { useContext } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { LoginScreen } from "../components/login/LoginScreen";
import { DashboardRoutes } from "./DashboardRoutes";
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { AuthContext } from '../auth/AuthContext';

const AppRouter = () => {
    const { user: { logged: isAuthenticated } } = useContext(AuthContext);
    return (
        <Router>
            <Switch>
                <PublicRoute isAuthenticated={isAuthenticated} exact path='/login' component={LoginScreen}></PublicRoute>
                <PrivateRoute isAuthenticated={isAuthenticated} path='/' component={DashboardRoutes}></PrivateRoute>
            </Switch>
        </Router>
    );
};

export default AppRouter;

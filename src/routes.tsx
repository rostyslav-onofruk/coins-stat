import React, {FunctionComponent, useState} from 'react';
import {Redirect, Route, Router, Switch} from 'react-router-dom';
import {createBrowserHistory, History} from 'history';
import PrivateRoute from './secure/PrivateRoute';
import Login from "./pages/Login/Login";
import Home from './pages/Home/Home';

export const history: History = createBrowserHistory();

const Routes: FunctionComponent = () => {
    const [isSignedIn, setIsSignedIn] = useState<string | null>(localStorage.getItem('userId'));

    window.addEventListener('storage', () => {
        setIsSignedIn(localStorage.getItem('userId'));
    });

    return (
        <Router history={history}>
            <Switch>
                <Route path="/login" component={Login}/>
                <PrivateRoute path='/' isSignedIn={!!isSignedIn} component={Home}/>
                <Redirect to="/" />
            </Switch>
        </Router>
    );
};

export default Routes;

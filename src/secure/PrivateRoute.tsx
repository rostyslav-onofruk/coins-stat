import React from 'react';
import {Redirect, Route, RouteProps} from 'react-router-dom';

interface PrivateRouteProps extends RouteProps {
    // tslint:disable-next-line:no-any
    component: any;
    isSignedIn: boolean;
}

const PrivateRoute = (props: PrivateRouteProps) => {
    const {component: Component, isSignedIn, ...rest} = props;

    return (
        <Route
            {...rest}
            render={(routeProps: RouteProps) =>
                isSignedIn ? (
                    <Component {...routeProps} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            state: {from: routeProps.location}
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
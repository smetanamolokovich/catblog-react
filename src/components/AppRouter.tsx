import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { privateRoutes, publicRoutes, RouteNames } from '@/router';

const AppRouter = () => {
    const auth = false;

    return auth ? (
        <Switch>
            {privateRoutes.map((props) => (
                <Route key={props.path} {...props} />
            ))}

            <Redirect to={RouteNames.HOME} />
        </Switch>
    ) : (
        <Switch>
            {publicRoutes.map((props) => (
                <Route key={props.path} {...props} />
            ))}

            <Redirect to={RouteNames.LOGIN} />
        </Switch>
    );
};

export default AppRouter;

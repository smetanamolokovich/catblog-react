import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { privateRoutes, publicRoutes, RouteNames } from '@/router';
import { useTypedSelector } from '@/hooks/useTypedSelector';

const AppRouter = () => {
    const { isAuth } = useTypedSelector((state) => state.auth);

    return isAuth ? (
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

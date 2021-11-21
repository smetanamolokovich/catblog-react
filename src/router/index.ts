import React from 'react';
import AdminPanel from '@/pages/admin/AdminPanel';
import Home from '@/pages/blog/Home';
import Login from '@/pages/Login';

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export const RouteNames = {
    HOME: '/',
    LOGIN: '/login',
    ADMIN_PANEL: '/admin',
};

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.HOME,
        component: Home,
        exact: true,
    },
    {
        path: RouteNames.LOGIN,
        component: Login,
        exact: true,
    },
];

export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.ADMIN_PANEL,
        component: AdminPanel,
        exact: true,
    },
];

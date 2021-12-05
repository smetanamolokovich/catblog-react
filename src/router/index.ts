import React from 'react';
import AdminPanel from '@/pages/admin/AdminPanel';
import Home from '@/pages/blog/Home';
import Login from '@/pages/admin//Login';
import CreateArticle from '@/pages/blog/CreateArticle';
import Article from '@/pages/blog/Article';
import UpdateArticle from '@/pages/admin/UpdateArticle';
import NotFound from '@/pages/blog/NotFound';

export interface IRoute {
    path: string;
    component: React.ComponentType;
    exact?: boolean;
}

export const RouteNames = {
    HOME: '/',
    LOGIN: '/login',
    ADMIN_PANEL: '/admin',
    CREATE_ARTICLE: '/create-article',
    UPDATE_ARTICLE: '/update-article/:articleId',
    ARTICLE: '/articles/:articleId',
    NOT_FOUND: '*',
};

export const publicRoutes: IRoute[] = [
    {
        path: RouteNames.LOGIN,
        component: Login,
        exact: true,
    },
    {
        path: RouteNames.ARTICLE,
        component: Article,
        exact: true,
    },
    {
        path: RouteNames.HOME,
        component: Home,
        exact: true,
    },
    {
        path: RouteNames.NOT_FOUND,
        component: NotFound,
        exact: false,
    },
];

export const privateRoutes: IRoute[] = [
    {
        path: RouteNames.HOME,
        component: Home,
        exact: true,
    },
    {
        path: RouteNames.ARTICLE,
        component: Article,
        exact: true,
    },
    {
        path: RouteNames.ADMIN_PANEL,
        component: AdminPanel,
        exact: true,
    },
    {
        path: RouteNames.CREATE_ARTICLE,
        component: CreateArticle,
        exact: true,
    },
    {
        path: RouteNames.UPDATE_ARTICLE,
        component: UpdateArticle,
        exact: true,
    },
];

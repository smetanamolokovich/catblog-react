import { IToken } from '@/models/auth';
import { IUser } from '@/models/user';

export interface AuthState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string;
    token: IToken;
}

export enum AuthActionTypes {
    SET_AUTH = 'SET_AUTH',
    SET_USER = 'SET_USER',
    SET_LOADING = 'SET_LOADING',
    SET_ERROR = 'SET_ERROR',
    SET_TOKEN = 'SET_TOKEN',
}

export interface SetAuthAction {
    type: AuthActionTypes.SET_AUTH;
    payload: boolean;
}
export interface SetUserAction {
    type: AuthActionTypes.SET_USER;
    payload: IUser;
}
export interface SetLoadingAction {
    type: AuthActionTypes.SET_LOADING;
    payload: boolean;
}
export interface SetErrorAction {
    type: AuthActionTypes.SET_ERROR;
    payload: string;
}
export interface SetTokenAction {
    type: AuthActionTypes.SET_TOKEN;
    payload: IToken;
}

export type AuthAction =
    | SetAuthAction
    | SetErrorAction
    | SetUserAction
    | SetLoadingAction
    | SetTokenAction;

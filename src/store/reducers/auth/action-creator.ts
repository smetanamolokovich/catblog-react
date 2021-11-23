import { IUser } from '@/models/user';
import { AppDispatch } from '@/store';
import {
    AuthActionTypes,
    SetAuthAction,
    SetErrorAction,
    SetLoadingAction,
    SetTokenAction,
    SetUserAction,
} from './types';
import { AuthService } from '@/services/authService';
import { IToken } from '@/models/auth';

export const AuthActionCreators = {
    setUser: (user: IUser): SetUserAction => ({
        type: AuthActionTypes.SET_USER,
        payload: user,
    }),
    setIsAuth: (payload: boolean): SetAuthAction => ({
        type: AuthActionTypes.SET_AUTH,
        payload,
    }),
    setIsLoading: (payload: boolean): SetLoadingAction => ({
        type: AuthActionTypes.SET_LOADING,
        payload,
    }),
    setError: (error: string): SetErrorAction => ({
        type: AuthActionTypes.SET_ERROR,
        payload: error,
    }),
    setToken: (token: IToken): SetTokenAction => ({
        type: AuthActionTypes.SET_TOKEN,
        payload: token,
    }),
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));

            const token = await AuthService.login(username, password);
            const expires = Date.now() + token.expires_in * 1000;

            localStorage.setItem(
                'user',
                JSON.stringify({ username, expires, accessToken: token.access_token })
            );

            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(AuthActionCreators.setToken({ ...token, expires_in: expires }));
            dispatch(
                AuthActionCreators.setUser({
                    username,
                    password,
                })
            );
            dispatch(AuthActionCreators.setError(''));
        } catch (err) {
            dispatch(AuthActionCreators.setError('Login failed. Please try again...'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('user');
        dispatch(AuthActionCreators.setIsAuth(false));
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setToken({} as IToken));
        dispatch(AuthActionCreators.setError(''));
    },
};

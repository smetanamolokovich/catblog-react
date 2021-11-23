import { IUser } from '@/models/user';
import { AppDispatch } from '@/store';
import {
    AuthActionTypes,
    SetAuthAction,
    SetErrorAction,
    SetLoadingAction,
    SetUserAction,
} from './types';
import { AuthService } from '@/services/authService';

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
    login: (username: string, password: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(AuthActionCreators.setIsLoading(true));

            const token = await AuthService.login(username, password);

            localStorage.setItem('auth', JSON.stringify(token));
            localStorage.setItem('isAuth', JSON.stringify('true'));
            localStorage.setItem('username', username);

            dispatch(AuthActionCreators.setIsAuth(true));
            dispatch(
                AuthActionCreators.setUser({
                    username,
                    password,
                })
            );
            dispatch(AuthActionCreators.setIsLoading(false));
            dispatch(AuthActionCreators.setError(''));
        } catch (err) {
            dispatch(AuthActionCreators.setError('Login failed. Please try again...'));
        }
    },
    logout: () => async (dispatch: AppDispatch) => {
        localStorage.removeItem('auth');
        localStorage.removeItem('isAuth');
        localStorage.removeItem('username');
        dispatch(AuthActionCreators.setIsAuth(false));
        dispatch(AuthActionCreators.setUser({} as IUser));
        dispatch(AuthActionCreators.setError(''));
    },
};

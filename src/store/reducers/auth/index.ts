import { IToken } from '@/models/auth';
import { IUser } from '@/models/user';
import { AuthAction, AuthActionTypes, AuthState } from './types';

const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: '',
    success: '',
    token: {} as IToken,
};

export default function authReducer(state = initialState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionTypes.SET_AUTH:
            return { ...state, isAuth: action.payload, isLoading: false };
        case AuthActionTypes.SET_USER:
            return { ...state, user: action.payload };
        case AuthActionTypes.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case AuthActionTypes.SET_ERROR:
            return { ...state, error: action.payload, isLoading: false };
        case AuthActionTypes.SET_SUCCESS:
            return { ...state, success: action.payload, isLoading: false };
        case AuthActionTypes.SET_TOKEN:
            return { ...state, token: action.payload };
        default:
            return state;
    }
}

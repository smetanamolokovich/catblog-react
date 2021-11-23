import { IUser } from '@/models/user';
import { AuthAction, AuthActionTypes, AuthState } from './types';

const initialState: AuthState = {
    isAuth: false,
    user: {} as IUser,
    isLoading: false,
    error: '',
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
        default:
            return state;
    }
}

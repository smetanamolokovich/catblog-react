import { IAuthSuccess } from '@/models/auth';
import { AxiosRequestHeaders } from 'axios';

const API_KEY = 'a816f2f0-02ec-41dc-a868-8e2f45b97eba';

export const authHeader = (): AxiosRequestHeaders => {
    const auth = localStorage.getItem('auth');

    const user: IAuthSuccess = auth && JSON.parse(auth);

    if (user && user.access_token) {
        return {
            Authorization: 'Bearer ' + user.access_token,
            accept: 'application/json',
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        };
    } else {
        return {
            accept: 'application/json',
            'X-API-KEY': API_KEY,
            'Content-Type': 'application/json',
        };
    }
};

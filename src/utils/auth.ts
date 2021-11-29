import { AxiosRequestHeaders } from 'axios';

// const API_KEY = '021993c0-c7f0-4b83-b091-0ce567138720';
export const authHeader = (apiKey: string, isFile = false): AxiosRequestHeaders => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.accessToken) {
        return {
            Authorization: 'Bearer ' + user.accessToken,
            accept: 'application/json',
            'X-API-KEY': apiKey,
            'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
        };
    } else {
        return {
            accept: 'application/json',
            'X-API-KEY': apiKey,
            'Content-Type': isFile ? 'multipart/form-data' : 'application/json',
        };
    }
};

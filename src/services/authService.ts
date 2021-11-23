import { IAuthSuccess } from '@/models/auth';
import { authHeader } from '@/utils/auth';
import axios from 'axios';

const API_URL = 'https://fullstack.exercise.applifting.cz/';

export class AuthService {
    public static async login(username: string, password: string): Promise<IAuthSuccess> {
        const { data } = await axios.post<IAuthSuccess>(
            API_URL + 'login',
            {
                username,
                password,
            },
            {
                headers: authHeader(),
            }
        );

        return data;
    }
}

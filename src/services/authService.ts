import { IAuthSuccess } from '@/models/auth';
import { authHeader } from '@/utils/auth';
import axios from 'axios';

export class AuthService {
    public static async login(username: string, password: string): Promise<IAuthSuccess> {
        const { data } = await axios.post<IAuthSuccess>(
            process.env.REACT_APP_API_URL + 'login',
            {
                username,
                password,
            },
            {
                headers: authHeader(process.env.REACT_APP_API_KEY || ''),
            }
        );

        return data;
    }
}

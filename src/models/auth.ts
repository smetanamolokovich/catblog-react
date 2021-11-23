export interface IAuthSuccess {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export interface IAuthError {
    code: string;
    message: string;
}

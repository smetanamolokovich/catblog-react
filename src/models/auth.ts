export interface IAuthSuccess {
    access_token: string;
    expires_in: number;
    token_type: string;
}

export interface IToken extends IAuthSuccess {}

export interface ITenants {
    apiKey: string;
}

export interface IAuthError {
    code: string;
    message: string;
}

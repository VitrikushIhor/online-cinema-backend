export type TypeRole = 'admin' | 'user' | undefined;
export interface SwaggerAuth {
    refreshToken: string;
    accessToken: string;
}

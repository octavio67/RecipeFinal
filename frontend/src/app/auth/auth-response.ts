export interface AuthResponse {
    user: {
        id: number;
        password: string;
        username: string;
        email: string;
        isAdmin: boolean;
    },
    access_token: string
}

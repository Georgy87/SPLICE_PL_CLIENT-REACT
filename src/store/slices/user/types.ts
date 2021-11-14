export type User = {
    email: string;
    password: string;
    fullname: string;
}

export type UserSliceState = {
    user: User | null;
    token: string | null;
    isAuth: boolean;
}
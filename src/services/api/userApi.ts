import { instance } from '../../core/axios';
import { Samples } from '../../store/slices/samples/types';
import { User } from '../../store/slices/user/types';

export const userApi = {
    async auth() {
        const { data } = await instance.get<{ user: User; token: string }>('auth');
        return data;
    },
    async login(payload: { email: string; password: string }) {
        const { email, password } = payload;

        const { data } = await instance.post<{ user: User; token: string; message: string }>('login', {
            email,
            password,
        });

        return data;
    },
    async registration(payload: User) {
        const { email, fullname, password } = payload;
        await instance.post('registration', { email, fullname, password });
    },
    async updateEmail(email: string | undefined) {
        const { data } = await instance.put<{user: User }>('users/email', { email });
        return data;
    },
    async updateFullName(fullname: string | undefined) {
        const { data } = await instance.put<User>('users/fullname', { fullname });
        return data;
    },
    async getLikedSamples() {
        const { data } = await instance.get<Samples[]>('users/liked-samples');
        return data;
    },
    async updateAvatar(formData: FormData) {
        const { data } = await instance.put<string>('users/avatar', formData);
        return data;
    },
};

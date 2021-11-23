import { instance } from '../../core/axios';
import { User } from '../../store/slices/user/types';

export const userApi = {
	async auth() {
		const { data } = await instance.get('auth');
		return data;
	},
	async login(payload: { email: string; password: string }) {
		const { email, password } = payload;
		const { data } = await instance.post('login', {
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
		const { data } = await instance.post('users/email', { email });
		return data;
	},
	async updateFullName(fullname: string | undefined) {
		const { data } = await instance.post('users/fullname', { fullname });
		return data;
	},
};

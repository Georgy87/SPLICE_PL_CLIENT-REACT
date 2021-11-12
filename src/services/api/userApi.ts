import { instance } from '../../core/axios';

export const userApi = {
	async auth() {
		const { data } = await instance.post('http://localhost:5000/api/auth');
		return data;
	},
	async login(payload: { email: string; password: string }) {
		const { email, password } = payload;
		const { data } = await instance.post(
			'http://localhost:5000/api/login',
			{
				email,
				password,
			},
		);
		return data;
	},
};

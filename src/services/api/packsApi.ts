import axios from 'axios';

export const packsApi = {
	async createPack(formData: FormData) {
		const { data } = await axios.post('http://localhost:5000/api/pack', formData);
		return data;
	},

	async getPacks() {
		const { data } = await axios.get('http://localhost:5000/api/pack');
		return data;
	},
};

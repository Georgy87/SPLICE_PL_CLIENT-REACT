import axios from 'axios';

export const samplesApi = {
	async createSamples(formData: FormData) {
		await axios.post('http://localhost:5000/api/samples', formData);
	},
};

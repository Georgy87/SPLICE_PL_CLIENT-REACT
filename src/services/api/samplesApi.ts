import axios from 'axios';

export const samplesApi = {
	async createSamples(formData: FormData, packId: string) {
		await axios.post(`http://localhost:5000/api/samples?packId=${packId}`, formData);
	},
};

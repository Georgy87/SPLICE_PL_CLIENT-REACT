import { instance } from '../../core/axios';

export const samplesApi = {
	async createSamples(formData: FormData, packId: string) {
		await instance.post(`samples?packId=${packId}`, formData);
	},
};

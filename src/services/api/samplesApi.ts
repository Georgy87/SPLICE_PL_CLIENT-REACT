import { instance } from '../../core/axios';

export const samplesApi = {
	async createSamples(formData: FormData, packId: string) {
		await instance.post(`samples?packId=${packId}`, formData);
	},
	async setLike(sampleId: string) {
		await instance.post(`samples/like?sampleId=${sampleId}`);
	},
	async deleteLike(sampleId: string) {
		await instance.delete(`samples/like?sampleId=${sampleId}`);
	},
};

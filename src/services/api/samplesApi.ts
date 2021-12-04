import { instance } from '../../core/axios';

export const samplesApi = {
	async createSamples(formData: FormData, packId: string) {
		const { data } = await instance.post<{ status: string}>(`samples?packId=${packId}`, formData);
		return data.status;
	},
	async setLike(sampleId: string) {
		await instance.post(`samples/like?sampleId=${sampleId}`);
	},
	async deleteLike(sampleId: string) {
		await instance.delete(`samples/like?sampleId=${sampleId}`);
	},
};

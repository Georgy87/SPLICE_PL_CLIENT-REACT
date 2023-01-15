import { instance } from '@core/axios';

export const samplesApi = {
	async setLike(sampleId: string) {
		await instance.post(`samples/like?sampleId=${sampleId}`);
	},
	async deleteLike(sampleId: string) {
		await instance.delete(`samples/like?sampleId=${sampleId}`);
	},
	async setSampleCategory(payload: { sampleId: string; category: string }) {
		const { sampleId, category } = payload;
		await instance.post(`samples/category?sampleId=${sampleId}&category=${category}`);
	},
	async setSampleBpm(payload: { sampleId: string; bpm: number }) {
		const { sampleId, bpm } = payload;
		await instance.post(`samples/bpm?sampleId=${sampleId}&bpm=${bpm}`);
	},
};

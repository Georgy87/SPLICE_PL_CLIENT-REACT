import { instance } from '../../core/axios';

export const samplesApi = {
	async createSamples(image: File, audio: File, audioCoordinates: number[], packId: string) {
		try {
			if (image && audio) {
				const formData = new FormData();
				formData.append('image', image);
				formData.append('audio', audio);
				formData.append('coordinates', JSON.stringify(audioCoordinates));
				await instance.post(`samples?packId=${packId}`, formData);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async setLike(sampleId: string) {
		await instance.post(`samples/like?sampleId=${sampleId}`);
	},
	async deleteLike(sampleId: string) {
		await instance.delete(`samples/like?sampleId=${sampleId}`);
	},
};

import { instance } from '../core/axios';

export const createSamples = async (file: File, audioCoordinates: number[], packId: string) => {
	try {
		if (file) {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('coordinates', JSON.stringify(audioCoordinates));
			await instance.post(`samples?packId=${packId}`, formData);
		}
	} catch (e) {
		console.log(e);
	}
};

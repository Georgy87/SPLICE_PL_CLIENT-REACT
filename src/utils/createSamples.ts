import { instance } from '../core/axios';

export const createSamples = async (image: File, audio: File, audioCoordinates: number[], packId: string) => {
	try {
		if (image && audio) {
			const formData = new FormData();
			formData.append('image', image);
			formData.append('audio', audio);
			formData.append('coordinates', JSON.stringify(audioCoordinates));
			const { data } = await instance.post(`samples?packId=${packId}`, formData);
			return data.status;
		}
	} catch (e) {
		console.log(e);
	}
};

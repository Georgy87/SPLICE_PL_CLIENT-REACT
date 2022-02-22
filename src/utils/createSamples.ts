import { instance } from '../core/axios';

export const createSamples = async (image: File, audio: File, audioCoordinates: number[], packId: string, fileId: string, duration: number) => {
	try {
		if (image && audio) {
			const formData = new FormData();
			formData.append('image', image);
			formData.append('audio', audio);
			formData.append('coordinates', JSON.stringify(audioCoordinates));
			formData.append('duration', JSON.stringify(duration));

			const { data } = await instance.post(`samples?packId=${packId}&fileId=${fileId}`, formData);
			
			return data;
		}
	} catch (e) {
		console.log(e);
	}
};


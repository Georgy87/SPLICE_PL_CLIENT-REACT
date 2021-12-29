import { instance } from '../core/axios';
import { workerInstanceCreateSample } from '../workers/WebWorkerEnabler';

export const createSamples = async (image: File, audio: File, audioCoordinates: number[], packId: string, fileId: string) => {
	try {
		if (image && audio) {
			const formData = new FormData();
			formData.append('image', image);
			formData.append('audio', audio);
			formData.append('coordinates', JSON.stringify(audioCoordinates));

			const { data } = await instance.post(`samples?packId=${packId}&fileId=${fileId}`, formData);
			
			return data;
		}
	} catch (e) {
		console.log(e);
	}
};


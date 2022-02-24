import { instance } from '../core/axios';
import { samplesToSendType } from '../store/slices/samples/types';

export const createSamples = async ({
	imageFile,
	audioFile,
	audioCoordinates,
	packId,
	fileId,
	duration,
}: samplesToSendType) => {
	try {
		if (imageFile && audioFile) {
			const formData = new FormData();
			formData.append('image', imageFile);
			formData.append('audio', audioFile);
			formData.append('coordinates', JSON.stringify(audioCoordinates));
			formData.append('duration', JSON.stringify(duration));

			const { data } = await instance.post(`samples?packId=${packId}&fileId=${fileId}`, formData);

			return data;
		}
	} catch (e) {
		console.log(e);
	}
};

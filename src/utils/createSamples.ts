import { samplesApi } from '@services/api/samplesApi';
import { CreateSampleResponseDto  } from '@services/api/types';

import { samplesToSendType } from '@slices/samples/types';

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

      const data: CreateSampleResponseDto = await samplesApi.create({ packId, fileId }, formData).promise;
      return data;
    }
  } catch (e) {
    console.log(e);
  }
};

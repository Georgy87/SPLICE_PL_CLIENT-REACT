import { samplesApi } from '../services/api/samplesApi';

export const createSamples = async (file: File, audioCoordinates: number[], packId: string) => {
    try {
        if (file) {
            const formData = new FormData();
            formData.append('file', file);
            await samplesApi.createSamples(formData, audioCoordinates, packId);
        }
    } catch (e) {
        console.log(e);
    }
};

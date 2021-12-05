import { instance } from '../core/axios';

export const sendFileImages = async (file: File, profileUpdate: boolean | undefined, sampleId: string) => {
    try {
        if (file && profileUpdate) {
            const formData = new FormData();
            formData.append('file', file);
            await instance.post(`samples/images?sampleId=${sampleId}`, formData);
        }
    } catch (e) {
        console.log(e);
    }
};

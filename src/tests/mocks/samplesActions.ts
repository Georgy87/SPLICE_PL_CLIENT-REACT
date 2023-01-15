import { Samples } from '@slices/samples/types';

const blob = new Blob();

export const samples: Samples[] = [
    {
        likes: [],
        audioCoordinates: '[17,43,36,33,9,7,7,7,6,7,5,7]',
        _id: '622002b7ad53bf0526655f19',
        sampleName: 'BIG_DR.wav',
        packId: '621fe5b9815ea94e0e103a89',
        audio: 'https://sample-cloud.storage.yandexcloud.net/SAMPLES-AUDIO/39f8091d-557f-4c59-a2af-e6c554ba4036.wav',
        duration: '3.4285714285714284',
        canvasImage:
            'https://sample-cloud.storage.yandexcloud.net/CANVAS-IMAGE/e70c64ca-40a9-4d85-af26-99c6fc53aaa5.png',
        packPicture:
            'https://sample-cloud.storage.yandexcloud.net/PACK-IMAGES/5dd58548-f621-4fad-b985-3a03d22dd574.jpeg',
        bpm: 140,
        category: 'drums',
    },
];

export const createSamplePayload: { file: File; packId: string; audioCoordinates: number[] } = {
    file: new File([blob], 'file.jpeg'),
    packId: '622002b7ad53bf0526655f19',
    audioCoordinates: [17, 43, 36, 33, 9, 7, 7, 7, 6, 7, 5, 7],
};

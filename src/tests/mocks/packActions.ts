import { ChartDataType, createPackType, Pack, PackProfile } from '../../store/slices/pack/types';

export let chartData: ChartDataType = {
    '2018': {
        January: { x: 0, y: 100 },
        February: { x: 20, y: 0 },
        March: { x: 30, y: 150 },
        April: { x: 40, y: 10 },
        May: { x: 50, y: 67 },
        June: { x: 60, y: 800 },
        July: { x: 70, y: 200 },
        August: { x: 80, y: 30 },
        September: { x: 90, y: 300 },
        October: { x: 100, y: 169 },
        November: { x: 110, y: 0 },
        December: { x: 120, y: 700 },
    },
    '2019': {
        January: { x: 0, y: 0 },
        February: { x: 20, y: 555 },
        March: { x: 30, y: 467 },
        April: { x: 40, y: 123 },
        May: { x: 50, y: 400 },
        June: { x: 60, y: 30 },
        July: { x: 70, y: 250 },
        August: { x: 80, y: 350 },
        September: { x: 90, y: 120 },
        October: { x: 100, y: 800 },
        November: { x: 110, y: 350 },
        December: { x: 120, y: 60 },
    },
    '2020': {
        January: { x: 0, y: 55 },
        February: { x: 20, y: 555 },
        March: { x: 30, y: 111 },
        April: { x: 40, y: 440 },
        May: { x: 50, y: 780 },
        June: { x: 60, y: 200 },
        July: { x: 70, y: 670 },
        August: { x: 80, y: 880 },
        September: { x: 90, y: 347 },
        October: { x: 100, y: 100 },
        November: { x: 110, y: 50 },
        December: { x: 120, y: 10 },
    },
    '2021': {
        January: { x: 0, y: 800 },
        February: { x: 20, y: 900 },
        March: { x: 30, y: 100 },
        April: { x: 40, y: 200 },
        May: { x: 50, y: 700 },
        June: { x: 60, y: 1000 },
        July: { x: 70, y: 400 },
        August: { x: 80, y: 344 },
        September: { x: 90, y: 111 },
        October: { x: 100, y: 50 },
        November: { x: 110, y: 80 },
        December: { x: 120, y: 370 },
    },
    '2022': {
        January: { x: 0, y: 1000 },
        February: { x: 20, y: 900 },
        March: { x: 30, y: 500 },
        April: { x: 40, y: 200 },
        May: { x: 50, y: 50 },
        June: { x: 60, y: 200 },
        July: { x: 70, y: 500 },
        August: { x: 80, y: 900 },
        September: { x: 90, y: 1000 },
        October: { x: 100, y: 300 },
        November: { x: 110, y: 700 },
        December: { x: 120, y: 0 },
    },
};

export const packProfile: PackProfile = {
    audio: 'https://sample-cloud.storage.yandexcloud.net/PACK-AUDIO/b6906d94-10b8-4794-a6e2-472a9f5a5862.wav',
    genre: 'Bass House',
    listens: 0,
    name: 'James Blake',
    packInfo: 'The next generation',
    picture: 'https://sample-cloud.storage.yandexcloud.net/PACK-IMAGES/5dd58548-f621-4fad-b985-3a03d22dd574.jpeg',
    userId: '618ebb5a6293c30f4156802a',
    _id: '621fe5b9815ea94e0e103a89',
    viewsData: chartData,
    samples: [
        {
            _id: '622002b7ad53bf0526655f19',
            audio: 'https://sample-cloud.storage.yandexcloud.net/SAMPLES-AUDIO/39f8091d-557f-4c59-a2af-e6c554ba4036.wav',
            packId: '621fe5b9815ea94e0e103a89',
            sampleName: 'BIG_DR.wav',
            audioCoordinates: '[1, 2, 3]',
            duration: '3.4285714285714284',
            likes: [],
            canvasImage:
                'https://sample-cloud.storage.yandexcloud.net/CANVAS-IMAGE/e70c64ca-40a9-4d85-af26-99c6fc53aaa5.png',
            bpm: 140,
            category: 'drums',
            packPicture:
                'https://sample-cloud.storage.yandexcloud.net/PACK-IMAGES/5dd58548-f621-4fad-b985-3a03d22dd574.jpeg',
        },
    ],
};

export const pack: Pack = {
    audio: 'https://sample-cloud.storage.yandexcloud.net/PACK-AUDIO/b6906d94-10b8-4794-a6e2-472a9f5a5862.wav',
    genre: 'Bass House',
    listens: 0,
    name: 'James Blake',
    packInfo: 'The next generation',
    picture: 'https://sample-cloud.storage.yandexcloud.net/PACK-IMAGES/5dd58548-f621-4fad-b985-3a03d22dd574.jpeg',
    userId: '618ebb5a6293c30f4156802a',
    _id: '621fe5b9815ea94e0e103a89',
    viewsData: chartData,
};

export const file = new File([''], 'filename.txt', {
    type: 'text/plain',
    lastModified: 2,
});

export const createPackpayload: createPackType = {
    info: {
        genre: 'jazz',
        authorName: 'Ivan Ignatov',
        packInfo: 'Test info',
    },
    picture: file,
    audio: file,
};


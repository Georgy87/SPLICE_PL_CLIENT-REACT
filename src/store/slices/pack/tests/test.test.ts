import { configureStore } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { instance } from '../../../../core/axios';
import { fetchGetPacks, fetchGetUserPacks } from '../actions';
import { fetchSetLike } from '../../samples/actions';

// describe('67087596', () => {
//     it('should pass', async () => {
//         const nameAndEmail = {
//             name: 'John Smith',
//             email: '123@123.com',
//         };

//         const postSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ post: [{ id: 5 }] });

//         const store = configureStore({
//             reducer: function (state = '', action) {
//                 switch (action.type) {
//                     case 'returns ID/fulfilled':
//                         return action.payload;
//                     default:
//                         return state;
//                 }
//             },
//         });

//         await store.dispatch(myFunc(nameAndEmail));
//         expect(postSpy).toBeCalledWith('/backendroute');
//         const state = store.getState();
//         expect(state).toEqual({ post: [{ id: 5 }] });
//     });
// });

describe('67087596', () => {
    it('should pass', async () => {
        const data = {
            packs: [{
                audio: "https://sample-cloud.storage.yandexcloud.net/PACK-AUDIO/b6906d94-10b8-4794-a6e2-472a9f5a5862.wav",
                genre: "Bass House",
                listens: 0,
                name: "James Blake",
                packInfo: "The next generation",
                picture: "https://sample-cloud.storage.yandexcloud.net/PACK-IMAGES/5dd58548-f621-4fad-b985-3a03d22dd574.jpeg",
                userId: "618ebb5a6293c30f4156802a",
                _id: "621fe5b9815ea94e0e103a89",
            }], totalPages: 1
        }

        const postSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce(data);

        const store = configureStore({
            reducer: function (state = '', action) {
                switch (action.type) {
                    case 'packs/getPacksStatus/fulfilled':
                        return action.payload;
                    default:
                        return state;
                }
            },
        });

        await store.dispatch(fetchGetPacks(2));
        expect(postSpy).toBeCalledWith('packs?page=2');
        const state = store.getState();
        expect(state).toEqual(data);
    });
});

describe('likes', () => {
    it('setLikes', async () => {
        const postSpy = jest.spyOn(instance, 'post');

        const store = configureStore({
            reducer: function (state = '', action) { },
        });

        await store.dispatch(fetchSetLike({ sampleId: '10' }));
        expect(postSpy).toBeCalledTimes(1);
    });
});

describe('670875', () => {
    it('should p', async () => {
        const data = [{
            audio: "https://sample-cloud.storage.yandexcloud.net/PACK-AUDIO/b6906d94-10b8-4794-a6e2-472a9f5a5862.wav",
            genre: "Bass House",
            listens: 0,
            name: "James Blake",
            packInfo: "The next generation",
            picture: "https://sample-cloud.storage.yandexcloud.net/PACK-IMAGES/5dd58548-f621-4fad-b985-3a03d22dd574.jpeg",
            userId: "618ebb5a6293c30f4156802a",
            _id: "621fe5b9815ea94e0e103a89",
        }]

        const postSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce(data);

        const store = configureStore({
            reducer: function (state = '', action) {
                switch (action.type) {
                    case 'packs/getUserPacksStatus/fulfilled':
                        return action.payload;
                    default:
                        return state;
                }
            },
        });

        await store.dispatch(fetchGetUserPacks());
        expect(postSpy).toBeCalledWith('packs/user-packs');
        const state = store.getState();
        expect(state).toEqual(data);
    });
});
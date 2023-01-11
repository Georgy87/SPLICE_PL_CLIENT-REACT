import { configureStore } from '@reduxjs/toolkit';
import { instance } from '../../core/axios';
import {
    fetchCreatePack,
    fetchGetPack,
    fetchGetPacks,
    fetchGetUserPacks,
    fetchSearchPacks,
} from '../../store/slices/pack/actions';
import { Pack } from '../../store/slices/pack/types';
import { createPackpayload, pack, packProfile } from '../mocks/packActions';

const store = configureStore({
    reducer: function (state = '', action) {
        switch (action.type) {
            case 'packs/createPackStatus/fulfilled':
                return action.payload;
            case 'packs/getPacksStatus/fulfilled':
                return action.payload;
            case 'packs/getUserPacksStatus/fulfilled':
                return action.payload;
            case 'packs/getPackStatus/fulfilled':
                return action.payload;
            case 'packs/getSearchPacksStatus/fulfilled':
                return action.payload;
            case 'packs/getSearchPacksStatus/fulfilled':
                return action.payload;
            default:
                return state;
        }
    },
});

describe('PACK ACTIONS TESTS', () => {
    it('Create pack', async () => {
        const packs: Pack[] = [pack];
        const data = packs;
        const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce({ data });

        await store.dispatch(fetchCreatePack(createPackpayload));
        expect(postSpy).toBeCalled();
        const state = store.getState();
        expect(state).toEqual(data);
    });

    it('Get packs', async () => {
        const data: { packs: Pack[]; totalPages: number } = {
            packs: [pack],
            totalPages: 2,
        };

        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });

        await store.dispatch(fetchGetPacks(2));
        expect(getSpy).toBeCalledWith('packs?page=2');
        const state = store.getState();
        expect(state).toEqual(data);
    });

    it('Get user packs', async () => {
        const packs = [pack];
        const data = packs;
        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });

        await store.dispatch(fetchGetUserPacks());
        expect(getSpy).toBeCalledWith('packs/user-packs');
        const state = store.getState();
        expect(state).toEqual(data);
    });

    it('Get pack', async () => {
        const tag = null;
        const data = packProfile;
        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });

        await store.dispatch(fetchGetPack({ packId: '621fe5b9815ea94e0e103a89', tag }));
        expect(getSpy).toBeCalledWith(`packs/pack?packId=621fe5b9815ea94e0e103a89&tag=${tag}`);
        const state = store.getState();
        expect(state).toEqual(data);
    });

    it('Search pack', async () => {
        const search = 'James Blake';
        const data = pack;
        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });

        await store.dispatch(fetchSearchPacks(search));
        expect(getSpy).toBeCalledWith(`packs/search-packs?search=${search}`);
        const state = store.getState();
        expect(state).toEqual(data);
    });
});

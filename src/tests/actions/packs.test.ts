import moxios from 'moxios';

import { instance } from '../../core/axios';
import {
    fetchCreatePack,
    fetchGetPack,
    fetchGetPacks,
    fetchGetUserPacks,
    fetchSearchPacks,
} from '@slices/pack/actions';
import { Pack } from '@slices/pack/types';
import { RootState } from '@store/types';
import { createStoreMock } from '@utils/tests';
import { createPackpayload, pack, packProfile } from '@mocks/packActions';

const mockStore = createStoreMock();

describe('PACK ACTIONS TESTS', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    it('create pack', async () => {
        const packs: Pack[] = pack;
        const data = packs;
       
        const expectedActions = {
            type: 'packs/createPackStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ packs: { packs: [] } } as RootState);

        const response = await store.dispatch(fetchCreatePack(createPackpayload));

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('get packs', async () => {
        const data: { packs: Pack[]; totalPage: number } = {
            packs: pack,
            totalPage: 2,
        };

        const expectedActions = {
            type: 'packs/getPacksStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ packs: { packs: [] } } as RootState);

        const response = await store.dispatch(fetchGetPacks(2));

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('get user packs', async () => {
        const data = pack;
        const expectedActions = {
            type: 'packs/getUserPacksStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ packs: { userPacks: [] } } as RootState);

        const response = await store.dispatch(fetchGetUserPacks());

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('get pack', async () => {
        const tag = null;
        const data = packProfile;

        const expectedActions = {
            type: 'packs/getPackStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ packs: { userPacks: [] } } as RootState);

        const response = await store.dispatch(fetchGetPack({ packId: '621fe5b9815ea94e0e103a89', tag }));

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('search pack', async () => {
        const search = 'James Blake';
        const data = pack;

        const expectedActions = {
            type: 'packs/getSearchPacksStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ packs: { userPacks: [] } } as RootState);

        const response = await store.dispatch(fetchSearchPacks(search));

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
});

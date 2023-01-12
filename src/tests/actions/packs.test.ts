import { instance } from '../../core/axios';
import {
    fetchCreatePack,
    fetchGetPack,
    fetchGetPacks,
    fetchGetUserPacks,
    fetchSearchPacks,
} from '../../store/slices/pack/actions';
import { Pack } from '../../store/slices/pack/types';
import { RootState } from '../../store/types';
import { createStoreMock } from '../../utils/tests';
import { createPackpayload, getPacksPayload, pack, packProfile } from '../mocks/packActions';

const mockStore = createStoreMock();
describe('PACK ACTIONS TESTS', () => {
    it('Create pack', async () => {
        const packs: Pack[] = pack;
        const data = packs;
        const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce({ data });
        const expectedActions = {
            type: 'packs/createPackStatus/fulfilled',
            payload: data,
        };
        const store = mockStore({ packs: { packs: [] } } as RootState);

        const response = await store.dispatch(fetchCreatePack(createPackpayload));

        expect(postSpy).toBeCalled();
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('Get packs', async () => {
        const data: { packs: Pack[]; totalPage: number } = {
            packs: pack,
            totalPage: 2,
        };

        const expectedActions = {
            type: 'packs/getPacksStatus/fulfilled',
            payload: data,
        };

        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });
        const store = mockStore({ packs: { packs: [] } } as RootState);

        const response = await store.dispatch(fetchGetPacks(2));

        expect(getSpy).toBeCalledWith('packs?page=2');
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('Get user packs', async () => {
        const data = pack;
        const expectedActions = {
            type: 'packs/getUserPacksStatus/fulfilled',
            payload: data,
        };

        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });
        const store = mockStore({ packs: { userPacks: [] } } as RootState);

        const response = await store.dispatch(fetchGetUserPacks());

        expect(getSpy).toBeCalledWith('packs/user-packs');
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('Get pack', async () => {
        const tag = null;
        const data = packProfile;

        const expectedActions = {
            type: 'packs/getPackStatus/fulfilled',
            payload: data,
        };
        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });
        const store = mockStore({ packs: { userPacks: [] } } as RootState);

        const response = await store.dispatch(fetchGetPack({ packId: '621fe5b9815ea94e0e103a89', tag }));

        expect(getSpy).toBeCalledWith(`packs/pack?packId=621fe5b9815ea94e0e103a89&tag=${tag}`);
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });

    it('Search pack', async () => {
        const search = 'James Blake';
        const data = pack;
        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });

        const expectedActions = {
            type: 'packs/getSearchPacksStatus/fulfilled',
            payload: data,
        };

        const store = mockStore({ packs: { userPacks: [] } } as RootState);

        const response = await store.dispatch(fetchSearchPacks(search));

        expect(getSpy).toBeCalledWith(`packs/search-packs?search=${search}`);
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
});

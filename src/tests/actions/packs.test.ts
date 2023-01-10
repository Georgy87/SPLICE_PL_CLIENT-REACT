import { configureStore } from '@reduxjs/toolkit';
import { instance } from '../../core/axios';
import { fetchCreatePack, fetchGetPack, fetchGetPacks, fetchGetUserPacks, fetchSearchPacks } from '../../store/slices/pack/actions';
import { createPackType, Pack } from '../../store/slices/pack/types';
import { pack, packProfile } from '../mocks/packActions';

const store = configureStore({
	reducer: function(state = '', action) {
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
	test('Create pack', async () => {
		const packs: Pack[] = [pack];
		const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce(packs);

		const file = new File([''], 'filename.txt', {
			type: 'text/plain',
			lastModified: 2,
		});

		const payload: createPackType = {
			info: {
				genre: 'jazz',
				authorName: 'Ivan Ignatov',
				packInfo: 'Test info',
			},
			picture: file,
			audio: file,
		};
	
		await store.dispatch(fetchCreatePack(payload));
		expect(postSpy).toBeCalled();
		const state = store.getState();
		expect(state).toEqual(packs);
	});

	test('Get packs', async () => {
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

	test('Get user packs', async () => {
		const packs = [pack];
		const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce(packs);

		await store.dispatch(fetchGetUserPacks());
		expect(getSpy).toBeCalledWith('packs/user-packs');
		const state = store.getState();
		expect(state).toEqual(packs);
	});

	test('Get pack', async () => {
		const tag = null;
		const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce(packProfile);

		await store.dispatch(fetchGetPack({ packId: '621fe5b9815ea94e0e103a89', tag }));
		expect(getSpy).toBeCalledWith(`packs/pack?packId=621fe5b9815ea94e0e103a89&tag=${tag}`);
		const state = store.getState();
		expect(state).toEqual(packProfile);
	});

	test('Search pack', async () => {
		const search = 'James Blake';
		const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce(pack);

		await store.dispatch(fetchSearchPacks(search));
		expect(getSpy).toBeCalledWith(`packs/search-packs?search=${search}`);
		const state = store.getState();
		expect(state).toEqual(pack);
	});
});
import moxios from 'moxios';

import { RootState } from '@store/types';
import { _deepClone } from '@utils/deepClone';
import { createStoreMock } from '@utils/tests';
import {
    fetchDeleteLike,
    fetchSetLike,
    fetchSetSampleBpm,
    fetchSetSampleCategory,
} from '@slices/samples/actions';
import { ENDPOINTS } from '@/constans/endpoints';

const mockStore = createStoreMock();

describe('SAMPLES ACTIONS', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    it('set like', async () => {
        const sampleId: string = 'a7923870643';

        const expectedActions = {
            type: 'sample/setLikeSampleStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchSetLike({ sampleId }));
        const config = moxios.requests.at(0).config;
        expect(config.url).toBe(ENDPOINTS.samples.setLike());
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
    it('delete like', async () => {
        const sampleId: string = 'a7923870643';


        const expectedActions = {
            type: 'sample/deleteLikeSampleStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchDeleteLike({ sampleId }));
        const config = moxios.requests.at(0).config;
        expect(config.url).toBe(ENDPOINTS.samples.deleteLike());
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
    it('set sample category', async () => {
        const sampleId: string = 'a7923870643';

        const expectedActions = {
            type: 'sample/setSampleCategoryStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchSetSampleCategory({ sampleId, category: 'bass' }));
        const config = moxios.requests.at(0).config;
        expect(config.url).toBe(ENDPOINTS.samples.setSampleCategory());
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
    it('set sample Bpm', async () => {
        const sampleId: string = 'a7923870643';

        const expectedActions = {
            type: 'sample/setSampleBpmStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchSetSampleBpm({ sampleId, bpm: 120 }));
        const config = moxios.requests.at(0).config;
        expect(config.url).toBe(ENDPOINTS.samples.setSampleBpm());
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
});

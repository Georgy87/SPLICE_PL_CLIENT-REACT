import { instance } from '../../core/axios';
import { RootState } from '../../store/types';
import { _deepClone } from '../../utils/deepClone';
import { createStoreMock } from '../../utils/tests';
import { fetchDeleteLike, fetchSetLike, fetchSetSampleBpm, fetchSetSampleCategory } from '../../store/slices/samples/actions';

const mockStore = createStoreMock();

describe('SAMPLES ACTIONS', () => {
    it('set like', async () => {
        const sampleId: string = 'a7923870643';
        const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce(undefined);

        const expectedActions = {
            type: 'sample/setLikeSampleStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchSetLike({ sampleId }));
        expect(postSpy).toBeCalledTimes(1);
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
    it('delete like', async () => {
        const sampleId: string = 'a7923870643';
        const deleteSpy = jest.spyOn(instance, 'delete').mockResolvedValueOnce(undefined);

        const expectedActions = {
            type: 'sample/deleteLikeSampleStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchDeleteLike({ sampleId }));
        expect(deleteSpy).toBeCalledTimes(1);
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
    it('set sample category', async () => {
        const sampleId: string = 'a7923870643';
        const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce(undefined);

        const expectedActions = {
            type: 'sample/setSampleCategoryStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchSetSampleCategory({ sampleId, category: 'bass' }));
        expect(postSpy).toBeCalledTimes(1);
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
    it('set sample Bpm', async () => {
        const sampleId: string = 'a7923870643';
        const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce(undefined);

        const expectedActions = {
            type: 'sample/setSampleBpmStatus/fulfilled',
        };

        const store = mockStore({ samples: {} } as RootState);
        await store.dispatch(fetchSetSampleBpm({ sampleId, bpm: 120 }));
        expect(postSpy).toBeCalledTimes(1);
        expect(store.getActions()[1].type).toBe(expectedActions.type);
    });
});

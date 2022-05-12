import '@testing-library/react';

import { deleteSampleFiles, initialState, samplesReducer, setCurrentStep, setSampleFiles } from './samplesSlice';

describe('SAMPLE REDUCER TEST', () => {
    test('setSampleFiles', () => {
        expect(samplesReducer(initialState, setSampleFiles({ id: '3', file: 'file', packId: '12' }))).toEqual({
            ...initialState,
            packId: '12',
            files: [{ id: '3', file: 'file' }],
        })
    })
    test('deleteSampleFiles', () => {
        expect(samplesReducer({ ...initialState, files: [{ id: '2', file: 'file' }] }, deleteSampleFiles('2'))).toEqual({
            ...initialState,
            files: [],
        })
    })
    test('setCurrentStep', () => {
        expect(samplesReducer(initialState, setCurrentStep(1))).toEqual({
            ...initialState,
            currentStep: 1,
        })
    })
})
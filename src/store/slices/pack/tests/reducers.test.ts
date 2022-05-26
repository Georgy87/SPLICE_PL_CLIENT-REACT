import '@testing-library/react';

import { packsReducer, initialState, setDefaultPackState, setTag, setLoading } from '../packSlice';

describe('PACK REDUCER TEST', () => {
    test('setDefaultPackState', () => {
        expect(packsReducer(initialState, setDefaultPackState())).toEqual({
            ...initialState,
        })
    })
    test('setTag', () => {
        expect(packsReducer(initialState, setTag('drums'))).toEqual({
            ...initialState,
            tag: 'drums',
        })
    })
    test('setLoading', () => {
        expect(packsReducer(initialState, setLoading(true))).toEqual({
            ...initialState,
            loading: true,
        })
    })
})
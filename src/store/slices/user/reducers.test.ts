import '@testing-library/react';

import { userReducer, logout, initialState } from './userSlice';

describe('USER REDUCER TEST', () => {
    test('logout', () => {
        expect(userReducer(initialState, logout())).toEqual({
            ...initialState,
        })
    })
})
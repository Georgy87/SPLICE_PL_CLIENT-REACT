import { userInitialState } from './../mocks/userActions';
import { userReducer } from '@slices/user/userSlice';
import { RootState } from '@store/types';
import { createStoreMock } from '@utils/tests';
import { user } from '../mocks/userActions';

const mockStore = createStoreMock();

describe('USER ACTIONS', () => {
    it('login', async () => {
        const data = { token: 'testtoken123', user: user.user, message: 'SUCCESS' };
        const fulfilledAction = {
            type: 'user/loginStatus/fulfilled',
            payload: data,
        };
      
        const store = mockStore({ user: userInitialState } as RootState);
        const state1 = userReducer(store.getState().user, fulfilledAction);
        expect(state1.isAuth).toBe(true);
        expect(state1.user).toEqual(user.user);

        const rejectedAction = {
            type: 'user/loginStatus/rejected',
            payload: 'Неправильный логин или пароль!',
        };

        const state2 = userReducer(store.getState().user, rejectedAction);
        expect(state2.errorMessage).toEqual('Неправильный логин или пароль!');
    });
    
});

import { fetchUpdateAvatar } from './../../store/slices/user/actions';
import { instance } from '../../core/axios';
import {
    fetchAuth,
    fetchGetLikedSamples,
    fetchLogin,
    fetchRegistration,
    fetchUpdateEmail,
    fetchUpdateFullName,
} from '../../store/slices/user/actions';
import { User } from '../../store/slices/user/types';
import { RootState } from '../../store/types';
import { _deepClone } from '../../utils/deepClone';
import { createStoreMock } from '../../utils/tests';
import { samples } from '../mocks/samplesActions';
import { payloadLogin, payloadRegistration, user } from '../mocks/userActions';
import { file } from '../mocks/packActions';

const mockStore = createStoreMock();

describe('USER ACTIONS', () => {
    it('registration', async () => {
        const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce(undefined);

        const store = mockStore({ user: {} } as RootState);
        await store.dispatch(fetchRegistration(payloadRegistration));
        expect(postSpy).toBeCalledTimes(1);
        expect(store.getActions()[1].type).toBe(fetchRegistration.fulfilled.type);
    });
    it('login', async () => {
        const data = { token: user.token, user: user.user, message: 'SUCCESS' };
        const expectedActions = {
            type: 'user/loginStatus/fulfilled',
            payload: data,
        };

        const postSpy = jest.spyOn(instance, 'post').mockResolvedValueOnce({ data });

        const store = mockStore({ user } as RootState);
        const response = await store.dispatch(fetchLogin(payloadLogin));

        expect(postSpy).toBeCalled();
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
    it('auth', async () => {
        const data = { token: user.token, user: user.user };
        const expectedActions = {
            type: 'user/authStatus/fulfilled',
            payload: data,
        };

        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });

        const store = mockStore({ user } as RootState);
        const response = await store.dispatch(fetchAuth());

        expect(getSpy).toBeCalledWith('auth');
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
    it('update email', async () => {
        const { user: obj } = user;
        const serverResponse = _deepClone(obj);
        if (serverResponse) serverResponse.email = 'goshana87@gmail.com';

        const data = { user: serverResponse };
        const expectedActions = {
            type: 'user/updateEmailStatus/fulfilled',
            payload: data,
        };

        const putSpy = jest.spyOn(instance, 'put').mockResolvedValueOnce({ data });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchUpdateEmail({ email: 'goshana87@gmail.com' }));

        expect(putSpy).toBeCalled();
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
    it('update fullname', async () => {
        const { user: obj } = user;
        const serverResponse = _deepClone(obj);
        if (serverResponse) serverResponse.fullname = 'Ben Gromov';

        const data = { user: serverResponse };
        const expectedActions = {
            type: 'user/updateFullNameStatus/fulfilled',
            payload: data,
        };

        const putSpy = jest.spyOn(instance, 'put').mockResolvedValueOnce({ data });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchUpdateFullName({ fullname: 'Swetlana Litvinenko' }));

        expect(putSpy).toBeCalled();
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
    it('get liked Samples', async () => {
        const serverResponse: RootState['user'] = _deepClone(user);
        serverResponse.samples = samples;
        const data = serverResponse;

        const expectedActions = {
            type: 'user/getLikedSamplesStatus/fulfilled',
            payload: data,
        };

        const getSpy = jest.spyOn(instance, 'get').mockResolvedValueOnce({ data });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchGetLikedSamples());

        expect(getSpy).toBeCalled();
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
    it('update avatar', async () => {
        const data: string = 'avatar.png';
        const serverResponse: RootState['user'] = _deepClone(user);
        serverResponse.avatar = data;
        const { user: userResponse } =  serverResponse;
        
        if (userResponse) userResponse.avatar = data;
    
        const expectedActions = {
            type: 'user/updateAvatarSamplesStatus/fulfilled',
            payload: data,
        };

        const putSpy = jest.spyOn(instance, 'put').mockResolvedValueOnce({ data });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchUpdateAvatar(file));

        expect(putSpy).toBeCalled();
        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
        console.log(store.getState());
    });
});

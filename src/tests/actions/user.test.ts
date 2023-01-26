import moxios from 'moxios';

import { fetchUpdateAvatar } from '@slices/user/actions';
import {
    fetchAuth,
    fetchGetLikedSamples,
    fetchLogin,
    fetchRegistration,
    fetchUpdateEmail,
    fetchUpdateFullName,
} from '@slices/user/actions';
import { UserSliceState } from '@slices/user/types';
import { RootState } from '@store/types';
import { _deepClone } from '@utils/deepClone';
import { createStoreMock } from '@utils/tests';
import { samples } from '@mocks/samplesActions';
import { payloadLogin, payloadRegistration, user } from '@mocks/userActions';
import { file } from '@mocks/packActions';
import { ENDPOINTS } from '@/constans/endpoints';

const mockStore = createStoreMock();

describe('USER ACTIONS', () => {
    beforeEach(() => {
        moxios.install();
    });

    afterEach(() => {
        moxios.uninstall();
    });
    it('registration', async () => {
        const store = mockStore({ user: {} } as RootState);
        await store.dispatch(fetchRegistration(payloadRegistration));
        const config = moxios.requests.at(0).config;
        expect(config.url).toBe(ENDPOINTS.user.registration());
        expect(store.getActions()[1].type).toBe(fetchRegistration.fulfilled.type);
    });
    it('login', async () => {
        const data = { token: user.token, user: user.user, message: 'SUCCESS' };
        const expectedActions = {
            type: 'user/loginStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ user } as RootState);
        const response = await store.dispatch(fetchLogin(payloadLogin));

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

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ user } as RootState);
        const response = await store.dispatch(fetchAuth());

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

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchUpdateEmail({ email: 'goshana87@gmail.com' }));

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

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchUpdateFullName({ fullname: 'Swetlana Litvinenko' }));

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
    it('get liked Samples', async () => {
        const serverResponse: UserSliceState = _deepClone(user);
        serverResponse.samples = samples;
        const data = serverResponse;

        const expectedActions = {
            type: 'user/getLikedSamplesStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchGetLikedSamples());

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
    it('update avatar', async () => {
        const data: string = 'avatar.png';
        const serverResponse: UserSliceState = _deepClone(user);
        serverResponse.avatar = data;
        const { user: userResponse } = serverResponse;

        if (userResponse) userResponse.avatar = data;

        const expectedActions = {
            type: 'user/updateAvatarSamplesStatus/fulfilled',
            payload: data,
        };

        moxios.wait(() => {
            const request = moxios.requests.at(0);
            request.respondWith({
                status: 200,
                response: data,
            });
        });

        const store = mockStore({ user: serverResponse } as RootState);
        const response = await store.dispatch(fetchUpdateAvatar(file));

        expect(store.getActions()[1].type).toEqual(expectedActions.type);
        expect(store.getActions()[1].payload).toEqual(expectedActions.payload);
        expect(response.payload).toEqual(data);
    });
});

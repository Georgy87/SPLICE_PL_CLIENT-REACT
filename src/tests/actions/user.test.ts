import { configureStore } from '@reduxjs/toolkit';
import { fetchLogin } from '../../store/slices/user/actions';
// import fetch from 'jest-fetch-mock';
global.fetch = jest.fn();
const response = {
    user: {
        _id: '618ebb5a6293c30f4156802a',
        avatar: 'https://sample-cloud.storage.yandexcloud.net/AVATAR/0ecfda8b-3c55-49dd-be51-b3d35b7412d5.png',
        confirm_hash: '$2b$08$mNb1dRGb61OOh./IWpYDFOwRq8yDOhWCpV44iwelIKHO6B1WYRgrK',
        createdAt: '2021-11-12T19:07:06.467Z',
        email: 'test@gmail.com',
        fullname: 'Георгий Петренко',
        password: '$2b$08$R.gsmRdXcysVzby/kzrV.Otca4eRDlCJgYR.B2Qr1H4x5q8.mglLi',
        updatedAt: '2023-01-07T13:02:49.460Z',
    },
    token: 'wdsjsklkjw134',
};

describe('USER ACTIONS', () => {
    it('should fetchLogin with resolved response', async () => {
        const mockResponse = response;
        //@ts-ignore
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(response),
        });
        const dispatch = jest.fn();

        const thunk = fetchLogin({ email: 'email', password: 'password' });

        //@ts-ignore
        await thunk(dispatch, () => {});

        const { calls } = dispatch.mock;
        const [start, end] = calls;
        //@ts-ignore
        expect(start[0].type).toBe(fetchLogin.pending().type);
        //@ts-ignore
        expect(end[0].type).toBe(fetchLogin.fulfilled().type);
        expect(end[0].payload).toBe(response);
    });

    it('should fetchLogin with rejected response', async () => {
        const mockResponse = response;
        //@ts-ignore
        fetch.mockResolvedValue({
            ok: false,
        });
        const dispatch = jest.fn();

        const thunk = fetchLogin({ email: 'email', password: 'password' });
        //@ts-ignore
        await thunk(dispatch, () => {});

        const { calls } = dispatch.mock;
        const [start, end] = calls;
        //@ts-ignore
        expect(start[0].type).toBe(fetchLogin.pending().type);
        //@ts-ignore
        expect(end[0].type).toBe(fetchLogin.rejected().type);
        expect(end[0].payload).toBe('Неправильный логин или пароль!');
        expect(end[0].meta.rejectedWithValue).toBe(true);
    });
});

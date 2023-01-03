import fetchMock from 'jest-fetch-mock';
import { cleanup, fireEvent, render, screen, waitFor, act } from '@testing-library/react';
import * as reduxHooks from 'react-redux';
import * as actions from './store/slices/user/actions';
import userEvent from '@testing-library/user-event';

// import { act } from 'react-dom/test-utils';

import { App } from './App';
// import { LoginPage } from './pages';
import { userSlice } from './store/slices/user/userSlice';
import { MOCK_INITIAL_STATE, renderWithRouter, renderWithStore } from './__tests__/testUtils';
import { mockedServerResponse } from './__mocks__/api.mocks';
import { selectAuth } from './store/selectors/userSelectors';
import { selectPacks } from './store/selectors/packsSelectors';
import { ButtonLayout } from './layouts/ButtonLayout/ButtonLayout';

// jest.mock('react-redux');

// describe('App', () => {
//     const user = {
//         password: '345345',
//         avatar: '',
//         confirm_hash: 'hsdfgsdfg',
//         createdAt: '534',
//         email: 'gosga@jmail',
//         fullname: '',
//         updatedAt: '',
//         _id: '',
//     };

//     const initState = {
//         ...MOCK_INITIAL_STATE,
//         user: userSlice.reducer(undefined, setAuth({ user, token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxOGViYjVhNjI5M2MzMGY0MTU2ODAyYSIsImlhdCI6MTY3MDg3MDA5MiwiZXhwIjoxNjczNDYyMDkyfQ.twvF3KBaNnVUXO_lDcYsU5e4ipG7dY978dXqFXQXTpY" })),
//     };

//     it('App snapshot', async () => {
//         const { store } = renderWithStore(<App />, initState);

//         // await waitFor(() =>
//         //     expect(store.getActions().map(({ type }) => type)).toEqual([
//         //         'packs/setLoading',
//         //         'packs/setDefaultPackState',
//         //         'packs/setPacks',
//         //     ])
//         // );
//         // console.log(store.getActions(), store.getState());
//     });

// });
// const mockDispatch = jest.fn();
// const mockSelector = jest.fn();

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    //  useAppDispatch: () => mockDispatch,
    //  useSelector: () => mockSelector,
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');
const mockOnSubmit = jest.fn();
describe('login', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    it('logineeee', async () => {
        // jest.spyOn(reduxHooks, 'useSelector').mockReturnValue(false);
        // mockedDispatch.mockReturnValue(jest.fn());

        // const result = renderWithStore(<LoginPage />);

        // expect(result).toMatchSnapshot();
    });

    it('dispatch action', async () => {
        // const dispatch = jest.fn();

        // mockedDispatch.mockReturnValue(dispatch);
        const mockedFetchLogin = jest.spyOn(actions, 'fetchLogin');

        // const { result } = renderWithStore(<LoginPage />);

        // await act(async () => {
        //     fireEvent.change(screen.getByTestId('login_input'), { target: { value: 'test@mail.ru' } });
        //     fireEvent.change(screen.getByTestId('password_input'), { target: { value: 'TestPassword123_' } });
        // });

        // fireEvent.change(screen.getByTestId('login_input'), {
        //     target: { value: 'test@mail.ru' },
        // });

        // fireEvent.change(screen.getByTestId('password_input'), {
        //     target: { value: 'TestPassword123_' },
        // });

        // expect(result.getByTestId('submit_button')).toBeTruthy();

        // fireEvent.submit(result.getByTestId('submit_button'));
        // await act(async () => {
        //     fireEvent.submit(result.getByTestId('submit_button'));
        // });

        // await act(async () => {
        //     fireEvent.submit(result.getByRole('button'));
        // });
        
        userEvent.type(screen.getByPlaceholderText(/Email/i), 'test@mail.ru');
        userEvent.type(screen.getByPlaceholderText(/Password/i), 'TestPassword123_');
        userEvent.click(screen.getByText(/submit/i));

        // //@ts-ignore
        // expect(screen.getByPlaceholderText('Email').value).toBe('test@mail.ru');
        // //@ts-ignore
        // expect(screen.getByPlaceholderText('Password').value).toBe('TestPassword123_');

        // expect(mockLogin).toHaveBeenCalledTimes(1);

        // expect(mockedFetchLogin).toHaveBeenCalledTimes(1);
        // expect(mockOnSubmit).toHaveBeenCalled();

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        });
    });
});

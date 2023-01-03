import { fireEvent, screen } from '@testing-library/react';
import * as reduxHooks from 'react-redux';

import { renderWithStore } from '../../utils/tests';
import { LoginPage } from '../../pages';
import { act } from 'react-dom/test-utils';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
}));

const mockedDispatch = jest.spyOn(reduxHooks, 'useDispatch');

describe('login', () => {
    it('Change inputs', async () => {
        const dispatch = jest.fn();
        // mockedDispatch.mockReturnValue(dispatch);
        // const mockedFetchLogin = jest.spyOn(actions, 'fetchLogin');
        const mockOnSubmit = jest.fn();

        const { result } = renderWithStore(<LoginPage />, {}, '/login');

        await act(async () => {
            fireEvent.change(result.getByTestId('login_input'), {
                target: { value: 'test@gmail.com' },
            });
            fireEvent.change(result.getByTestId('password_input'), {
                target: { value: '12345678' },
            });
        });

        await act(async () => {
            fireEvent.submit(result.getByTestId('submit_button'));
        });

        //@ts-ignore
        expect(screen.getByPlaceholderText('Email').value).toBe('test@gmail.com');
        //@ts-ignore
        expect(screen.getByPlaceholderText('Password').value).toBe('12345678');
        await act(async () => {
            fireEvent.click(screen.getByTestId('submit_button'));
        });

        expect(screen.getByTestId('submit_button')).toBeTruthy();
    });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderTest } from '../../tests/helpers/RenderTestApp';
import { renderWithRouter } from '../../tests/helpers/RenderWithRouter';
import { LoginPage } from './LoginPage';

describe('LoginPage component', () => {
	test('loginPage snapshot', async () => {
		const loginPage = render(renderTest(<LoginPage />));
		expect(loginPage).toMatchSnapshot();
	});

	test('with valid inputs', async () => {
		const { getByPlaceholderText, getByRole } = render(renderTest(< LoginPage />));
		await act(async () => {
			fireEvent.change(getByPlaceholderText('Email'), {
				target: { value: 'test@gmail.com' },
			});
			fireEvent.change(getByPlaceholderText('Password'), {
				target: { value: '12345678' },
			});
		});

		await act(async () => {
			fireEvent.submit(getByRole('button'));
		});
		
		//@ts-ignore
		expect(screen.getByPlaceholderText('Email').value).toBe('test@gmail.com');
		//@ts-ignore
		expect(screen.getByPlaceholderText('Password').value).toBe('12345678');
	});

});

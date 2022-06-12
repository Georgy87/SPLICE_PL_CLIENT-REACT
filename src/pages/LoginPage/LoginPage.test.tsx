import { render } from '@testing-library/react';
import { renderWithRouter } from '../../tests/helpers/RenderWithRouter';

import { LoginPage } from './LoginPage';

const setUp = () => shallow()
describe('LoginPage component', () => {
	test('LoginPage snapshot', async () => {
		const loginPage = render(renderWithRouter(<LoginPage />, '/login'));
		expect(loginPage).toMatchSnapshot();
	});
});

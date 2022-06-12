import { render } from '@testing-library/react';

import { renderWithRouter } from '../../tests/helpers/RenderWithRouter';
import { CreatePackPage } from './CreatePackPage';

describe('CreatePackPage component', () => {
	test('CreatePackPage snapshot', async () => {
		const createPackPage = render(renderWithRouter(<CreatePackPage />, '/profile/create'));
		expect(createPackPage).toMatchSnapshot();
	});
});

import { render } from '@testing-library/react';

import { renderTest } from '../../tests/helpers/RenderTestApp';
import { CreatePackPage } from './CreatePackPage';

describe('CreatePackPage component', () => {
	test('CreatePackPage snapshot', async () => {
		const createPackPage = render(renderTest(<CreatePackPage />));
		expect(createPackPage).toMatchSnapshot();
	});
});

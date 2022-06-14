import { render } from '@testing-library/react';

import { renderTest } from '../../tests/helpers/RenderTestApp';
import { UserPacksPage } from './UserPacksPage';

describe('UserPacksPage component', () => {
	test('UserPacksPage snapshot', async () => {
		const userPacksPage = render(renderTest(<UserPacksPage />));
		expect(userPacksPage).toMatchSnapshot();
	});
});

import { render } from '@testing-library/react';

import { renderTest } from '../../tests/helpers/RenderTestApp';
import { UserProfilePage } from './UserProfilePage';

describe('UserProfilePage component', () => {
	test('userProfilePage snapshot', async () => {
		const userProfilePage = render(renderTest(<UserProfilePage />));
		expect(userProfilePage).toMatchSnapshot();
	});
});

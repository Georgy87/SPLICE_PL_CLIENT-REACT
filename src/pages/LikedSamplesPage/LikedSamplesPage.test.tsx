import { render } from '@testing-library/react';

import { renderTest } from '../../tests/helpers/RenderTestApp';
import { LikedSamplesPage } from './LikedSamplesPage';

describe('LikedSamplesPage component', () => {
	test('LikedSamplesPage snapshot', async () => {
		const likedSamplesPage = render(renderTest(<LikedSamplesPage />));
		expect(likedSamplesPage).toMatchSnapshot();
	});
});

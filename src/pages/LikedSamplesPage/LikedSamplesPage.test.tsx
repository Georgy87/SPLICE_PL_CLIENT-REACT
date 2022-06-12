import { render } from '@testing-library/react';

import { renderWithRouter } from '../../tests/helpers/RenderWithRouter';
import { LikedSamplesPage } from './LikedSamplesPage';

describe('LikedSamplesPage component', () => {
	test('LikedSamplesPage snapshot', async () => {
		const likedSamplesPage = render(renderWithRouter(<LikedSamplesPage />, '/likes'));
		expect(likedSamplesPage).toMatchSnapshot();
	});
});

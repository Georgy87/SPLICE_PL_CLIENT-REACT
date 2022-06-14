import { render } from '@testing-library/react';
import { renderTest } from '../../tests/helpers/RenderTestApp';
import { PacksPage } from './PacksPage';

describe('PacksPage component', () => {
	test('PacksPage snapshot', async () => {
		const packsPage = render(renderTest(<PacksPage />));
		expect(packsPage).toMatchSnapshot();
	});
});

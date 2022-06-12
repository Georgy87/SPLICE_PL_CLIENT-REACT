import { render } from '@testing-library/react';
import { renderWithRouter } from '../../tests/helpers/RenderWithRouter';
import { PacksPage } from './PacksPage';


describe('PacksPage component', () => {
	test('PacksPage snapshot', async () => {
		const packsPage = render(renderWithRouter(<PacksPage />));
		expect(packsPage).toMatchSnapshot();
	});
});

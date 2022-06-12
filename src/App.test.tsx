import { render } from '@testing-library/react';

import { App } from './App';
import { RenderTestApp } from './tests/helpers/RenderTestApp';
import { renderWithRouter } from './tests/helpers/RenderWithRouter';

describe('App component', () => {
	test('App snapshot', async () => {
		const app = render(renderWithRouter(<App />));
		expect(app).toMatchSnapshot();
	});
});

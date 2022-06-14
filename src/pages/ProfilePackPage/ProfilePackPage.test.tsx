import { render } from '@testing-library/react';
import { renderTest } from '../../tests/helpers/RenderTestApp';
import { ProfilePackPage } from './ProfilePackPage';

describe('ProfilePackPage component', () => {
	test('profilePackPage snapshot', async () => {
		const profilePackPage = render(renderTest(<ProfilePackPage />));
		expect(profilePackPage).toMatchSnapshot();
	});
});

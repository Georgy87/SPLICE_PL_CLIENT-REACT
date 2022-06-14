import { render } from '@testing-library/react';

import { renderTest } from '../../tests/helpers/RenderTestApp';
import { RegistrationPage } from './RegistrationPage';

describe('RegistrationPage component', () => {
	test('registrationPage snapshot', async () => {
		const registrationPage = render(renderTest(<RegistrationPage />));
		expect(registrationPage).toMatchSnapshot();
	});
});

import { render } from '@testing-library/react';
import { renderTest } from '../../tests/helpers/RenderTestApp';

import { AvatarEditorPage } from './AvatarEditorPage';

describe('AvatarEditorPage component', () => {
	test('AvatarEditorPage snapshot', async () => {
		const avatarEditorPage = render(renderTest(<AvatarEditorPage />));
		expect(avatarEditorPage).toMatchSnapshot();
	});
});

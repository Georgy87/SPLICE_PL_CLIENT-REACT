import { render } from '@testing-library/react';
import { renderWithRouter } from '../../tests/helpers/RenderWithRouter';
import { AvatarEditorPage } from './AvatarEditorPage';

describe('AvatarEditorPage component', () => {
	test('AvatarEditorPage snapshot', async () => {
		const avatarEditorPage = render(renderWithRouter(<AvatarEditorPage />, '/profile/avatar'));
		expect(avatarEditorPage).toMatchSnapshot();
	});
});

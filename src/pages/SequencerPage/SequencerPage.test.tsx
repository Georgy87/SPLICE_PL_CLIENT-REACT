import { render } from '@testing-library/react';

import { renderTest } from '../../tests/helpers/RenderTestApp';
import { SequencerPage } from './SequencerPage';

describe('SequencerPage component', () => {
	test('sequencerPage snapshot', async () => {
		const sequencerPage = render(renderTest(<SequencerPage />));
		expect(sequencerPage).toMatchSnapshot();
	});
});

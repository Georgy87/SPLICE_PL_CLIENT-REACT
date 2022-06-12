import { render } from '@testing-library/react';
import { pack } from '../../store/slices/pack/testData';
import { renderWithRouter } from '../../tests/helpers/RenderWithRouter';
import { PackItem } from './PackItem';

describe('PackItem component', () => {
	test('PackItem snapshot', async () => {
		const packItem = render(
			renderWithRouter(<PackItem pack={pack} id='621fe5b9815ea94e0e103a89' index={0} />),
		);
		expect(packItem).toMatchSnapshot();
	});
});

import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '../../store';

export const renderTest = (component: React.ReactChild) => {
	return (
		<Provider store={store}>
			<MemoryRouter>
				{component}
			</MemoryRouter>
		</Provider>
	);
};

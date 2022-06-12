import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppRouter } from '../../router/AppRouter';
import { store } from '../../store';

export const renderWithRouter = (component: React.ReactChild, initialRoute = '/') => {
	return (
		<Provider store={store}>
			<MemoryRouter initialEntries={[initialRoute]}>
				<AppRouter />
				{component}
			</MemoryRouter>
		</Provider>
	);
};

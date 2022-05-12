import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppRouter } from '../../router/AppRouter';
import { store } from '../../store';

type PropsType = {
	children: React.ReactNode;
};

export const RenderTestApp: React.FC<PropsType> = ({ children }) => {
	return (
		<Provider store={store}>
			<MemoryRouter>
				<AppRouter />
				{children}
			</MemoryRouter>
		</Provider>
	);
};

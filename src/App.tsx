import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Navbar } from './components/Navbar/Navbar';
import { PlayerContextProvider } from './context/PlayerContextProvider/PlayerContextProvider';
import { fetchAuth } from './store/slices/user/actions';
import { AppRouter } from './router/AppRouter';

import styles from './App.module.scss';

export const App = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchAuth());
	}, []);

	return (
		<PlayerContextProvider>
			<div className={styles.appContainer}>
				<div className={styles.navbarBlock}>
					<Navbar />
				</div>
				<div className={styles.pagesBlock}>
					<AppRouter />
				</div>
			</div>
		</PlayerContextProvider>
	);
};

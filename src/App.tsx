import React, { useEffect } from 'react';
import { Route, Switch, useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { PacksPage } from './pages/PacksPage/PacksPage';
import { Navbar } from './components/Navbar/Navbar';
import { UserProfilePage } from './pages/UserProfilePage/UserProfilePage';
import { CreatePackPage } from './pages/CreatePackPage/CreatePackPage';
import { ProfilePackPage } from './pages/ProfilePackPage/ProfilePackPage';
import { LoginPage } from './pages/LoginPage/LoginPage';
import {
	defaultState,
	PlayerContextProvider,
} from './context/PlayerContextProvider/PlayerContextProvider';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { fetchAuth } from './store/slices/user/userSlice';
import { selectUser } from './store/selectors/userSelectors';
import { UserPacksPage } from './pages/UserPacksPage/UserPacksPage';

import styles from './App.module.scss';

export const App: React.FC = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	useEffect(() => {
		// if (!user) {
		// 	history.push('login');
		// }

		dispatch(fetchAuth());
	}, []);
	
	return (
		<PlayerContextProvider>
			<div className={styles.appContainer}>
				<div className={styles.navbarBlock}>
					<Navbar />
				</div>
				<div className={styles.pagesBlock}>
					<Switch>
						<Route path='/login' component={LoginPage} exact />
						<Route path='/registration' component={RegistrationPage} exact />
						<Route
							path={'/'}
							component={() => <PacksPage pageName={'main-packs'} />}
							exact
						/>
						<Route path='/profile-pack/:packId?' component={ProfilePackPage} exact />

						<Route path='/profile' component={UserProfilePage} exact />
						<Route path='/profile/create' component={CreatePackPage} exact />
						<Route path='/profile/packs' component={UserPacksPage} exact />
					</Switch>
				</div>
			</div>
		</PlayerContextProvider>
	);
};

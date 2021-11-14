import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { PacksPage } from './pages/PacksPage/PacksPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Navbar } from './components/Navbar/Navbar';
import { ProfilePage } from './pages/UserProfilePage/UserProfilePage';
import { CreatePackPage } from './pages/CreatePackPage/CreatePackPage';
import { ProfilePackPage } from './pages/ProfilePackPage/ProfilePackPage';

import { LoginPage } from './pages/LoginPage/LoginPage';
import { PlayerContext } from './context/PlayerContext/PlayerContext';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';
import { fetchAuth } from './store/slices/user/userSlice';

import styles from './styles/App.module.scss';
import { selectUser } from './store/selectors/userSelectors';

export const App: React.FC = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectUser);

	useEffect(() => {
		if (user) {
			dispatch(fetchAuth());
		}
	}, []);
	return (
		<PlayerContext>
			<div className={styles.appContainer}>
				<div className={styles.navbarBlock}>
					<Navbar />
				</div>
				<div className={styles.pagesBlock}>
					<Switch>
						{/* <Route
								path={['/home', '/']}
								component={MainPage}
								exact
							/> */}
						<Route path='/login' component={LoginPage} exact />
						<Route
							path='/registration'
							component={RegistrationPage}
							exact
						/>
						<Route path={'/'} component={PacksPage} exact />
						<Route
							path='/profile-pack/:packId?'
							component={ProfilePackPage}
							exact
						/>

						<Route path='/profile' component={ProfilePage} exact />
						<Route
							path='/profile/create'
							component={CreatePackPage}
							exact
						/>
					</Switch>
				</div>
			</div>
		</PlayerContext>
	);
};

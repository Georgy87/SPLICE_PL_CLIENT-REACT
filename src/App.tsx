import React from 'react';
import { Route, Switch } from 'react-router';

import { PacksPage } from './pages/Packs/PacksPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Navbar } from './components/Navbar/Navbar';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { CreatePackPage } from './pages/CreatePackPage/CreatePackPage';
import { ProfilePackPage } from './pages/ProfilePackPage/ProfilePackPage';

import { LoginPage } from './pages/LoginPage/LoginPage';

import { PlayerContext } from './context/PlayerContext/PlayerContext';
import { PlayerSamplesContext } from './context/SamplesPlayerContext/SamplesPlayerContext';

import styles from './styles/App.module.scss';
import { RegistrationPage } from './pages/RegistrationPage/RegistrationPage';

export const App: React.FC = () => {
	return (
		<PlayerContext>
				<div className={styles.appContainer}>
					<div className={styles.navbarBlock}>
						<Navbar />
					</div>
					<div className={styles.pagesBlock}>
						<Switch>
							<Route
								path={['/home', '/']}
								component={MainPage}
								exact
							/>
							<Route path='/login' component={LoginPage} exact />
							<Route path='/registration' component={RegistrationPage} exact />
							<Route path='/packs' component={PacksPage} />
							<Route
								path='/profile-pack/:packId?'
								component={ProfilePackPage}
								exact
							/>

							<Route
								path='/profile'
								component={ProfilePage}
								exact
							/>
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

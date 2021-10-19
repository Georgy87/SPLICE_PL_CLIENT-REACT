import React from 'react';
import { Route, Switch } from 'react-router';

import { PacksPage } from './pages/Packs/PacksPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Navbar } from './components/Navbar/Navbar';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { CreatePackPage } from './pages/CreatePackPage/CreatePackPage';
import { PlayerContext } from './context/PlayerContext/PlayerContext';
import { ProfilePackPage } from './pages/ProfilePackPage/ProfilePackPage';

import styles from './styles/App.module.scss';
import { PlayerSamplesContext } from './context/SamplesPlayerContext/SamplesPlayerContext';

export const App: React.FC = () => {
	return (
		<PlayerContext>
			<PlayerSamplesContext>
				<div className={styles.appContainer}>
					<div className={styles.navbarBlock}>
						<Navbar />
					</div>

					<div className={styles.pagesBlock}>
						<Switch>
							<Route path='/home' component={MainPage} exact />
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
			</PlayerSamplesContext>
		</PlayerContext>
	);
};

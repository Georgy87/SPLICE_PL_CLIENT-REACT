import React from 'react';
import { Route, Switch } from 'react-router';

import { PacksPage } from './pages/Packs/PacksPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Navbar } from './components/Navbar/Navbar';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { CreatePackPage } from './pages/CreatePackPage/CreatePackPage';

import styles from './styles/App.module.scss';

export const App: React.FC = () => {
	return (
		<div className={styles.appContainer}>
			<div className={styles.navbarBlock}>
				<Navbar />
			</div>

			<div className={styles.pagesBlock}>
				<Switch>
					<Route path='/' component={MainPage} exact />
					<Route path='/packs' component={PacksPage} />
					<Route path='/profile' component={ProfilePage} exact />
					<Route
						path='/profile/create'
						component={CreatePackPage}
						exact
					/>
				</Switch>
			</div>
		</div>
	);
};

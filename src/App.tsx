import React from 'react';
import { Route, Switch } from 'react-router';

import { PacksPage } from './pages/Packs/PacksPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Navbar } from './components/Navbar/Navbar';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { CreatePackPage } from './pages/CreatePackPage/CreatePackPage';
import { PlayerContext } from './context/PlayerContext';
import { useTypedSelector } from './hooks/useTypedSelector';

import styles from './styles/App.module.scss';

export const App: React.FC = () => {
	const { active, pause, volume } = useTypedSelector((state) => state.player);

	let sound = new Audio();

	const setSrc = (src: string) => {
		sound.src = src;
		console.log(src);
	};

	return (
		<PlayerContext>
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
		</PlayerContext >
	);
};

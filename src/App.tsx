import React from 'react';
import { Route, Switch } from 'react-router';

import { MainLayout } from './layouts/MainLayout';
import { PacksPage } from './pages/Packs/PacksPage';
import { MainPage } from './pages/MainPage/MainPage';
import { Navbar } from './components/Navbar/Navbar';

export const App: React.FC = () => {
	return (
		<>
			<Navbar />
			<Switch>
				<Route path='/' component={MainPage} exact />
				<Route path='/packs' component={PacksPage} />
			</Switch>
		</>
	);
};

import React from 'react';
import { Route, Switch } from 'react-router';

import MainLayout from './layouts/MainLayout';
import { PacksPage } from './pages/packs/PacksPage';

import './App.css';

function App() {
	return (
		<div className="App">
			<MainLayout />
			<Switch>
				<Route path='/packs' component={PacksPage}/>
			</Switch>
		</div>
	);
}

export default App;

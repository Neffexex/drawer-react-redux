import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import './styles/app.scss';
import SettingBar from './components/SettingBar'
import Toolbar from './components/Toolbar'
import Canvas from './components/Canvas'



function App() {
	return (
		<div className="app">
			<Switch>
				<Route path='/:id'>
					<SettingBar />
						<div className="contentWrap">
						<Toolbar/>
						<Canvas/>
						</div>
				</Route>
				<Redirect  to={`f${(+new Date()).toString(16)}`} />
			</Switch>
		</div>
	);
}

export default App;

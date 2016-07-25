import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Dimensions,
	DrawerLayoutAndroid
} from 'react-native';

import MainApp from './containers/main-app'
import Splash from './containers/splash'

class Root extends Component {

	constructor(props) {
		super(props);
		this.routeConfig = [
			{name: 'SplashScreen', index: 0},
			{name: 'MainApp', index: 1}
		];
	}

	render() {
		let app = MainApp;
		return (
			<Navigator
				initialRoute={this.routeConfig[0]}
				configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft}
				renderScene={this._renderScene}
				/>
		)
	}

	_renderScene(route, navigator) {

		if (route.name === 'SplashScreen') {
			return <Splash navigator={navigator} />;
		}
		if (route.name === 'MainApp') {
			return <MainApp navigator={navigator} />;
		}
	}
}

const styles = StyleSheet.create({

});

export default Root;

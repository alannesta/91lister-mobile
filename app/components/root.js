import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Dimensions,
	DrawerLayoutAndroid
} from 'react-native';

import MovieList from './containers/movie-list'
import TabView from './containers/tab-view'
import Toolbar from './containers/toolbar'
import LoginForm from './containers/login-form'

const DRAWER_WIDTH_LEFT = 56;

class Root extends Component {
	constructor(props) {
		super(props);
		this._renderApp = this._renderApp.bind(this);
	}

	render() {
		return (
			<DrawerLayoutAndroid
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
				keyboardDismissMode="on-drag"
				ref={(drawer) => { this.drawer = drawer; }}        //! for using this.drawer.open()
				// ref="drawer"
				renderNavigationView={this._renderDrawerContent.bind(this)}
				statusBarBackgroundColor="#589c90">
				{this._renderApp()}
			</DrawerLayoutAndroid>
		);
	}

	componentDidMount() {
		console.log('did mount: ', this.drawer);
	}

	_renderDrawerContent() {
		return (
			<LoginForm />
		)
	}

	_renderApp() {
		let tab = TabView;
		return (
			<View style={styles.container}>
				<Toolbar
					drawer={this.drawer}
				/>
				<Navigator
					initialRoute={{ name: 'home', component: tab }}
					configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft}
					renderScene={(route, navigator) => {
					   	let Component = route.component;
					   	return <Component {...route.params} navigator={navigator} />
							}}
					/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	toolbar: {
		backgroundColor: '#E9EAED',
		height: 56,
	},
	drawerContentWrapper: {
		flex: 1,
		backgroundColor: 'white',
	},
});

export default Root;

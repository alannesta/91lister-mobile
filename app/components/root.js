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

const DRAWER_WIDTH_LEFT = 56;

class Root extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<DrawerLayoutAndroid
				drawerPosition={DrawerLayoutAndroid.positions.Left}
				drawerWidth={Dimensions.get('window').width - DRAWER_WIDTH_LEFT}
				keyboardDismissMode="on-drag"
				ref={(drawer) => { this.drawer = drawer; }}        //! for using this.drawer.open()
				renderNavigationView={this._renderDrawerContent}
				statusBarBackgroundColor="#589c90">
				{this._renderApp()}
			</DrawerLayoutAndroid>
		);
	}

	_renderDrawerContent() {
		return (
			<View>
				<Text>Drawer Content</Text>
			</View>
		)
	}

	_renderApp() {
		let tab = TabView;
		return (
			<View style={styles.container}>
				<Toolbar/>
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

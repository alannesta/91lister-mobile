import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Image,
	Dimensions,
	StatusBar,
	TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

import MovieList from './containers/movie-list'
import Splash from './containers/splash'
import UserProfile from './containers/user-profile'
import Settings from './containers/settings'

class Root extends Component {

	constructor(props) {
		super(props);
		this.routeConfig = [
			{name: 'SplashScreen', index: 0},
			{name: 'MovieList', index: 1},
			{name: 'UserProfile', index: 2},
			{name: 'Settings', index: 3},
			{name: 'NoConnection', index: 4}
		];
		this._getRouteMapper = this._getRouteMapper.bind(this);
	}

	render() {
		return (
			<Navigator
				style={styles.appContainer}
				initialRoute={this.routeConfig[0]}
				configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft}
				renderScene={this._renderScene}
				navigationBar={
					<Navigator.NavigationBar
		       routeMapper={this._getRouteMapper()}
					 style={styles.navBar}
		     />
				}
			/>
		)
	}

	_renderScene(route, navigator) {
		if (route.name === 'SplashScreen') {
			return <Splash navigator={navigator} />;
		}
		if (route.name === 'MovieList') {
			return <MovieList navigator={navigator} />;
		}
		if (route.name === 'UserProfile') {
			return <UserProfile navigator={navigator} />;
		}
		if (route.name === 'Settings') {
			return <Settings navigator={navigator} />;
		}
		if (route.name === 'NoConnection') {
			return <Text>Please Check your network connection!</Text>
		}
	}

	_getRouteMapper() {
		return {
				 LeftButton: (route, navigator, index, navState) => {
					 switch(route.name) {
						case 'SplashScreen':
								return null;
						case 'UserProfile':
							 return (
								<TouchableOpacity
									onPress={() => {
										// console.log('nav State', navState);
										if (navState.routeStack.length > 1) {
											navigator.pop();
										} else {
											// in this case, coming from the splash screen state
											navigator.replace(this.routeConfig[1])
										}
									}}
									style={styles.navBarItem}
								>
									<Text>MovieList</Text>
								</TouchableOpacity>
							);
						case 'MovieList':
							return (
								<TouchableOpacity
									onPress={() => navigator.push(this.routeConfig[3])}
									style={styles.navBarItem}
									>
									<Text>Settings</Text>
								</TouchableOpacity>
							)
						case 'Settings':
							return (
								<TouchableOpacity
									onPress={() => navigator.pop()}
									style={styles.navBarItem}
									>
									<Text>Done</Text>
								</TouchableOpacity>
							)
						default:
							return null;
					 }
				 },
				 RightButton: (route, navigator, index, navState) => {
					 switch(route.name) {
						case 'SplashScreen':
								return null;
						case 'MovieList':
							 return (
								<TouchableOpacity
									onPress={() => navigator.push(this.routeConfig[2])}
									style={styles.navBarItem}
								>
									<Image style={styles.userPorfile} source={require('../images/user-profile.png')} />
								</TouchableOpacity>
							);
						default:
							return null;
					 }
				 },
				 Title: (route, navigator, index, navState) =>{
					 return (
							 <Text style={styles.navBarItem}>{route.name}</Text>
					 );
				 }
		}
	}
}

const styles = StyleSheet.create({
	appContainer: {
		flex: 1
	},
	navBar: {
		height: 60,
		borderBottomWidth: 1,
		borderColor: 'grey'
	},
	navBarItem: {
		padding: 10
	},
	userPorfile: {
		width: 20,
		height: 20
	}
});

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Root);

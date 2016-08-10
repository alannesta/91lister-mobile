import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View,
	Dimensions,
	StatusBar,
	TouchableOpacity
} from 'react-native';

import MovieList from './containers/movie-list'
import Splash from './containers/splash'
// import LoginForm from './presentationals/login-form'
import UserProfile from './containers/user-profile'

class Root extends Component {

	constructor(props) {
		super(props);
		this.routeConfig = [
			{name: 'SplashScreen', index: 0},
			{name: 'MovieList', index: 1},
			{name: 'UserProfile', index: 2}
		];
		this._getRouteMapper = this._getRouteMapper.bind(this);
	}

	render() {
		return (
			<Navigator
				initialRoute={this.routeConfig[0]}
				configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft}
				renderScene={this._renderScene}
				navigationBar={
					<Navigator.NavigationBar
		       routeMapper={this._getRouteMapper()}
		       style={{justifyContent:'center', alignItems:'center'}}
		     />
				}
				style={{justifyContent:'center', alignItems:'center'}}
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
	}

	_getRouteMapper() {
		return {
				 LeftButton: (route, navigator, index, navState) => {
					 return (
						 <TouchableOpacity
							 onPress={() => navigator.push(this.routeConfig[2])}
						 >
							 <Text>Cancel</Text>
						 </TouchableOpacity>
					 );
				 },
				 RightButton: (route, navigator, index, navState) => {
					 return (
						 <Text>Done</Text>
					 );
				 },
				 Title: (route, navigator, index, navState) =>{
					 return (
							 <Text>{route.name}</Text>
					 );
				 }
		}
	}
}

const styles = StyleSheet.create({

});

export default Root;

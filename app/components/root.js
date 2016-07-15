import React, {Component} from 'react';
import {
	StyleSheet,
	Text,
	Navigator,
	View
} from 'react-native';

import MovieList from './containers/movie-list';
class Root extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		let movieList = MovieList;
		return (
			<Navigator
				initialRoute={{ name: 'home', component: movieList }}
				configureScene={(route, routeStack) => Navigator.SceneConfigs.FloatFromLeft}
				renderScene={(route, navigator) => {
				   	let Component = route.component;
				   	return <Component {...route.params} navigator={navigator} />
			 		}}
				/>

		);
	}
}

export default Root;

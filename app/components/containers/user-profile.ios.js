/*
 @flow weak
*/
import React, {Component} from 'react'
import { connect } from 'react-redux'
import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	NetInfo,
	InteractionManager
} from 'react-native';

import LoginForm from '../presentationals/login-form'
import SearchWidget from '../presentationals/search-widget'

import { updateNetworkStatus } from '../../actions/app-actions'
import {fetchMovieList} from '../../actions/movie-list-actions'
import {updateMovieQuery} from '../../actions/toolbar-actions'

import { authenticate } from '../../actions/user-actions';

class UserProfile extends Component {

	_login: Function;
	_searchMovies: Function;

	constructor(props) {
		super(props);
		this._login = this._login.bind(this);
    this._searchMovies = this._searchMovies.bind(this);
	}

	render() {
    let {user: {status: {loggedIn, username}}, movieList: {query}} = this.props;

		if (loggedIn) {
			return (
				<View style={styles.container}>
					<SearchWidget
						onSearch={this._searchMovies}
						query={query}
						/>
					<Text style={{marginTop: 50}}>Welcome and enjoy {username} !</Text>
				</View>
			)
		} else {

			return (
				<View style={styles.container}>
					<LoginForm onLogin={this._login}/>
				</View>
			)
		}
	}

	componentDidMount() {

	}

	_renderDrawerContent() {
		let {user: {status: {loggedIn, username}}, movieList: {query}} = this.props;

		if (loggedIn) {
			return (
				<View style={styles.container}>
					<SearchWidget
						onSearch={this._searchMovies}
						query={query}
						/>
					<Text style={{marginTop: 50}}>Welcome and enjoy {username} !</Text>
				</View>
			)
		} else {
			return (
				<View style={styles.container}>
					<LoginForm onLogin={this._login}/>
				</View>
			)
		}
	}

	_searchMovies(userQuery) {
		let {dispatch, movieList: {movieQuery}, navigator} = this.props;
		// reset display count to 10 on new searches
		let newQuery = Object.assign({}, movieQuery, {
			query: userQuery,
			count: 10
		})
		dispatch(updateMovieQuery(newQuery, true)).then(() => {
			console.log(navigator.state.routeStack);
			if (navigator.state.routeStack.length>1) {
				navigator.pop();
			} else {
				navigator.replace({name: 'MovieList', index: 1})
			}
		});
	}

	_login(username, password) {
		let {dispatch, movieList: {movieQuery}, navigator} = this.props;
		InteractionManager.runAfterInteractions(() => {
			dispatch(authenticate(username, password)).then(() => {
				dispatch(fetchMovieList(movieQuery)).then(() => {
					// navigate to list page on login success
					navigator.replace({name: 'MovieList', index: 1})
				});
			}).catch((err) => {
				// err handled at fetchMovieList action level
			});
		});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
    justifyContent: 'center'
	},
});

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(UserProfile);

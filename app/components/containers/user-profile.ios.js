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
import { authenticate } from '../../actions/user-actions';


class UserProfile extends Component {

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
		let {dispatch, movieList: {mSince, order}, navigator} = this.props;
		return dispatch(fetchMovieList({
			query: userQuery,
			since: mSince,
			order: order
		})).then(() => {
			// update the query in redux store
			dispatch({
				type: "UPDATE_QUERY",
				query: userQuery
			});
			// console.log(navigator.state.routeStack);
			if (navigator.state.routeStack.length>1) {
				navigator.pop();
			} else {
				navigator.replace({name: 'MovieList', index: 1})
			}
		})
	}

	_login(username, password) {
		let {dispatch, movieList: {mSince, order, query}, navigator} = this.props;
		InteractionManager.runAfterInteractions(() => {
			dispatch(authenticate(username, password)).then(() => {
				dispatch(fetchMovieList({
						since: mSince,
						order: order,
						query: query
				})).then(() => {
					// navigate to list page on login success
					navigator.replace({name: 'MovieList', index: 1})
				});

			}).catch((err) => {
				// NO-OP?
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

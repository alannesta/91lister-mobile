/**
 * Container Component for Movie list page
 * @flow weak
 */
import React, {Component} from 'react';
import * as actions from '../../actions/movie-list-actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Movie from '../presentationals/movie';
import AppStorage from '../../utils/app-storage';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	TouchableOpacity,
	Animated,
	InteractionManager
} from 'react-native';

import type {TMovie} from '../../types/flowtypes'

class MovieList extends Component {

	// flow type declaration
	bindedMovieActionCreators:any;
	dataSource:any;
	_renderRow:Function;

	static defaultProps:{};

	constructor(props) {
		super(props);
		let {dispatch} = props;
		// avoid binding action creators on renderRow method
		this.bindedMovieActionCreators = bindActionCreators(actions, dispatch);
		this.dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});

		this._renderRow = this._renderRow.bind(this);
	}

	componentDidMount() {
		let {dispatch} = this.props;	// dispatch is injected by connect() call
		AppStorage.init().then(function() {
			InteractionManager.runAfterInteractions(() => {
				dispatch(actions.fetchMovieList());
			});
		}).catch((err) => {
			// fetch movie list anyways
			InteractionManager.runAfterInteractions(() => {
				dispatch(actions.fetchMovieList());
			});
		});
	}

	render() {
		let {movieData: {movies, total}, isRefreshing} = this.props;
		return (
			<ListView
				dataSource={this.dataSource.cloneWithRows(movies)}
				renderRow={this._renderRow}
				renderSeparator={this._renderSeparator}
				onEndReachedThreshold={10}
				onEndReached={this._loadMoreMovies.bind(this)}
				enableEmptySections={true}
				removeClippedSubviews={false}    // fix android device listview crash: https://github.com/facebook/react-native/issues/5934
				//renderFooter={this.renderFooter.bind(this)}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={this._onRefresh.bind(this)}
						colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
						progressBackgroundColor="#ffffff"/>
					}
				/>
		)
	}

	_renderRow(movie:TMovie) {

		return (
			<Movie
				movie={movie}
				toggleLike={this.bindedMovieActionCreators.toggleLike}
				/>
		)
	}

	_renderSeparator(sectionID, rowID) {
		return (
			<View style={styles.separator} key={rowID}/>
		)
	}

	/**
	 * Load more movies when end of list is reached
	 * @private
	 */
	_loadMoreMovies() {
		let {dispatch, movieData: {movies, total}, mSince, order} = this.props;	// TODO: refactor order reducer
		if (movies.length < total) {
			InteractionManager.runAfterInteractions(() => {
				dispatch(actions.fetchMovieList(movies.length + 10, mSince, order));
			});
		}
	}

	/**
	 * When swipe down, check if there is new movies
	 * @private
	 */
	_onRefresh() {
		let {dispatch, movieData: {movies}, mSince, order} = this.props;
		InteractionManager.runAfterInteractions(() => {
			var count = movies.length > 0 ? movies.length : 10;	// TODO: this is a temporary solution
			dispatch(actions.fetchMovieList(count, mSince, order));
		});
	}
}

const styles = StyleSheet.create({
	separator: {
		backgroundColor: '#eeeeee',
		height: 1
	}
});

function mapStateToProps(state) {
	return state.movieListPage;
}

export default connect(mapStateToProps)(MovieList);

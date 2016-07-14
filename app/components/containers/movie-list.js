/**
 * Container Component for Movie list page
 */
import React, {Component} from 'react';
import * as actions from '../../actions/movie-list-actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Movie from './movie';

import {
	StyleSheet,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	TouchableOpacity,
	InteractionManager,
	Animated,
} from 'react-native';

class MovieList extends Component {

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
 		dispatch(actions.fetchMovieList('all'));
	}

	render() {
		let {movieData: {movies, total}, isRefreshing} = this.props;
		//let movieActionCreators = bindActionCreators(actions, dispatch);

		return (
			<ListView
				dataSource={this.dataSource.cloneWithRows(movies)}
				renderRow={this._renderRow}
				renderSeparator={this._renderSeparator}
				onEndReachedThreshold={10}
				onEndReached={this._loadMoreMovies.bind(this)}
				enableEmptySections={true}
				removeClippedSubviews={false} 	// fix android device listview crash: https://github.com/facebook/react-native/issues/5934
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

	_renderRow(movie) {

		return (
			<Movie
				movie={movie}
				{...this.bindedMovieActionCreators}
				/>
		)
	}

	_renderSeparator(sectionID, rowID) {
		return (
			<View style={styles.separator} key={rowID} />
		)
	}

	/**
	 * Load more movies when end of list is reached
	 * @private
	 */
	_loadMoreMovies() {
		console.log('load more movies');
		let {dispatch, movieData: {movies, total}} = this.props;
		console.log('current movies:' + movies.length);
		if (movies.length < total) {
			dispatch(actions.fetchMovieList('all', movies.length + 10))
		}
	}

	/**
	 * When swipe down, check if there is new movies
	 * @private
	 */
	_onRefresh() {
		console.log('on refresh');
		let {dispatch} = this.props;
		dispatch(actions.fetchMovieList('all'));
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

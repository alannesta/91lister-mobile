/**
 * Container Component for Movie list page
 * @flow weak
 */
import React, {Component} from 'react';
import * as actions from '../../actions/movie-list-actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Movie from '../presentationals/movie';
import {
	StyleSheet,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	TouchableOpacity,
	Animated,
	InteractionManager,
	Modal
} from 'react-native';

import type {TMovie} from '../../types/flowtypes'

class MovieList extends Component {

	// flow type declaration
	bindedMovieActionCreators:any;
	dataSource:any;
	_renderRow:Function;
	_selectMovie: Function;
	state:{modalVisible: boolean, isRefreshing: boolean};

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
		this._selectMovie = this._selectMovie.bind(this);
		this.state = {
			modalVisible: false,
			isRefreshing: false
		};
	}

	componentDidMount() {
		let {dispatch} = this.props;	// dispatch is injected by connect() call
		InteractionManager.runAfterInteractions(() => {
			dispatch(actions.fetchMovieList());
		});
	}

	render() {
		let {movieData: {movies, total}, isRefreshing, selectedMovie} = this.props;
		return (
			<View style={styles.container}>
			<ListView
				style={styles.listView}
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
						progressViewOffset={120}
						colors={['#3ad564']}
						progressBackgroundColor="#ffffff"/>
					}
				/>
				<Modal
				 style={styles.modal}
				 animationType={'fade'}
				 transparent={false}
				 visible={this.state.modalVisible}
				 onRequestClose={() => {}}
				 >
				 <Text>{selectedMovie.title}</Text>
				 <TouchableOpacity
						onPress={() => {this.setState({modalVisible: false})}}
				 >
				 		<Text>Close</Text>
				 </TouchableOpacity>
			 </Modal>
			</View>
		)
	}

	_renderRow(movie:TMovie) {
		return (
			<Movie
				movie={movie}
				onPress={() => {this._selectMovie(movie)}}
				toggleLike={this.bindedMovieActionCreators.toggleLike}
				/>
		)
	}

	_renderSeparator(sectionID, rowID) {
		return (
			<View style={styles.separator} key={rowID}/>
		)
	}

	_selectMovie(movie) {
		let {dispatch} = this.props;
		this.setState({modalVisible: true});
		dispatch(actions.selectMovie(movie));
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
	},
	container: {
		flex: 1		//essential!! for the onEndReached bug:
	},
	ListView: {

	},
	modal: {

	}
});

function mapStateToProps(state) {
	return state.movieListPage;
}

export default connect(mapStateToProps)(MovieList);

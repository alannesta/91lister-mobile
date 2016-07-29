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
			rowHasChanged: (row1, row2) => row1.id !== row2.id
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
			this.setState({isRefreshing: true});
			dispatch(actions.fetchMovieList()).then(() => {
				this.setState({isRefreshing: false});
			});
		});
	}

	render() {
		let {movieData: {movies, total}, selectedMovieData: {selectedMovie, fileUrl}} = this.props;
		return (
			<View style={styles.container}>
				<ListView
					style={styles.listView}
					dataSource={this.dataSource.cloneWithRows(movies)}
					renderRow={this._renderRow}
					renderSeparator={this._renderSeparator}
					onEndReachedThreshold={5}
					onEndReached={this._loadMoreMovies.bind(this)}
					enableEmptySections={true}
					removeClippedSubviews={false}    // fix android device listview crash: https://github.com/facebook/react-native/issues/5934
					//renderFooter={this.renderFooter.bind(this)}
					refreshControl={
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._onRefresh.bind(this)}
							progressViewOffset={120}
							colors={['#3ad564']}
							progressBackgroundColor="#ffffff"/>
						}
				/>
				<Modal
				 animationType={'fade'}
				 transparent={true}
				 visible={this.state.modalVisible}
				 onRequestClose={() => {}}
				 >
				 <View style={styles.modalBackground}>
				 	<View style={styles.modalContainer}>
						<Text>{selectedMovie.title}</Text>
						<Text style={styles.movieFileLink}>{fileUrl}</Text>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {this._getMovieFileUrl(selectedMovie)}}>
							<Text>Enjoy</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.modalButton}
							onPress={() => {this.setState({modalVisible: false})}}>
							<Text>Close</Text>
						</TouchableOpacity>
					</View>
				 </View>

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

	_getMovieFileUrl(movie) {
		let {dispatch} = this.props;
		dispatch(actions.getMovieFileUrl(movie));
	}

	/**
	 * Load more movies when end of list is reached
	 * @private
	 */
	_loadMoreMovies() {
		let {dispatch, movieData: {movies, total}, mSince, order} = this.props;	// TODO: refactor order reducer
		if (movies.length < total) {
			this.setState({isRefreshing: true});
			InteractionManager.runAfterInteractions(() => {
				dispatch(actions.fetchMovieList(movies.length + 10, mSince, order)).then(() => {
					this.setState({isRefreshing: false});
				});
			});
		}
	}

	/**
	 * When swipe down, check if there is new movies
	 * @private
	 */
	_onRefresh() {
		let {dispatch, movieData: {movies}, mSince, order} = this.props;
		this.setState({isRefreshing: true});
		InteractionManager.runAfterInteractions(() => {
			var count = movies.length > 0 ? movies.length : 10;	// TODO: this is a temporary solution
			dispatch(actions.fetchMovieList(count, mSince, order)).then(() => {
				this.setState({isRefreshing: false});
			});
		});
	}
}

const styles = StyleSheet.create({
	separator: {
		backgroundColor: '#eeeeee',
		height: 1
	},
	container: {
		flex: 1,		//essential!! for the onEndReached bug
	},
	ListView: {

	},
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	modalContainer: {
		height: 250,
		width: 300,
		borderRadius: 10,
		backgroundColor: '#fff',
		padding: 5
	},
	movieFileLink: {

	},
	modalButton: {
		width: 50,
		padding: 5,
		borderRadius: 3,
		marginTop: 20
	}
});

function mapStateToProps(state) {
	return state.movieListPage;
}

export default connect(mapStateToProps)(MovieList);

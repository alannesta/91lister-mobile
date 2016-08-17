/**
 * Container Component for Movie list page
 * @flow weak
 */
import React, {Component} from 'react';
import * as actions from '../../actions/movie-list-actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import Movie from '../presentationals/movie';
import MovieDetailModal from '../presentationals/movie-detail-modal'
import {
	StyleSheet,
	View,
	Text,
	Image,
	ListView,
	RefreshControl,
	TouchableOpacity,
	InteractionManager,
	Modal,
	ActivityIndicator,
	Dimensions,
	Platform
} from 'react-native';

import type {TMovie} from '../../types/flowtypes'

class MovieList extends Component {

	// flow type declaration
	bindedMovieActionCreators:any;
	dataSource:any;
	_renderRow:Function;
	_selectMovie: Function;
	_getMovieFileUrl: Function;
	state:{modalVisible: boolean, isRefreshing: boolean, loadingIndicator: boolean, IOSloadMore: boolean};

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
		this._getMovieFileUrl = this._getMovieFileUrl.bind(this);
		// view state: modals, loading indicator, refreshing indicator
		this.state = {
			modalVisible: false,
			isRefreshing: false,
			loadingIndicator: false,
			IOSloadMore: false
		};
	}

	componentDidMount() {
		let {dispatch, order, query, mSince} = this.props;	// dispatch is injected by connect() call
		InteractionManager.runAfterInteractions(() => {
			this.setState({isRefreshing: true});
			dispatch(actions.fetchMovieList({
				since: mSince,
				order: order,
				query: query
			})).then(() => {
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
					refreshControl={
						Platform.OS === 'android'?
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._onRefresh.bind(this)}
							progressViewOffset={120}
							colors={['#3ad564']}
							progressBackgroundColor="#ffffff"/>
							:
						<RefreshControl
							refreshing={this.state.isRefreshing}
							onRefresh={this._onRefresh.bind(this)}
							/>
						}
				/>
				{Platform.OS === 'ios' && this.state.IOSloadMore ? <ActivityIndicator style={styles.loadmoreSpinner} size="small"/>: null}
				<MovieDetailModal
					modalVisible={this.state.modalVisible}
					loadingIndicator={this.state.loadingIndicator}
					closeModal={() => {	this.setState({ modalVisible: false, loadingIndicator: false})}}
					enjoyMovie={this._getMovieFileUrl}
					movie={selectedMovie}
					fileUrl={fileUrl}
				 />
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

	/**
	 * Display movie info in a modal
	 * @private
	 */
	_selectMovie(movie) {
		let {dispatch} = this.props;
		dispatch(actions.selectMovie(movie)).then(() => {
			this.setState({modalVisible: true});
		});
	}

	/**
	 * resolve real movie url
	 * @private
	 */
	_getMovieFileUrl(movie) {
		let {dispatch} = this.props;
		this.setState({loadingIndicator: true});
		InteractionManager.runAfterInteractions(() => {
			dispatch(actions.getMovieFileUrl(movie)).then(() => {
				this.setState({loadingIndicator: false});
			});
		});
	}

	/**
	 * Load more movies when end of list is reached
	 * @private
	 */
	_loadMoreMovies() {
		let {dispatch, movieData: {movies, total}, mSince, order, query} = this.props;	// TODO: refactor order reducer
		if (movies.length < total) {
			this._androidRefreshIndicator(true);
			this.setState({IOSloadMore: true});
			InteractionManager.runAfterInteractions(() => {
				dispatch(actions.fetchMovieList({
					count: movies.length + 10,
					since: mSince,
					order: order,
					query: query
				})).then(() => {
					this._androidRefreshIndicator(false);
					this.setState({IOSloadMore: false});
				});
			});
		}
	}

	/**
	 * When swipe down, check if there is new movies
	 * @private
	 */
	_onRefresh() {
		let {dispatch, movieData: {movies}, mSince, order, query} = this.props;
		this._androidRefreshIndicator(true);
		InteractionManager.runAfterInteractions(() => {
			dispatch(actions.fetchMovieList({
				count: movies.length,
				since: mSince,
				order: order,
				query: query
			})).then(() => {
				this._androidRefreshIndicator(false);
			});
		});
	}

	_androidRefreshIndicator(flag: boolean) {
		if (Platform.OS === 'android') {
			this.setState({isRefreshing: flag});
		}
	}
}

const WINDOW_HEIGHT = Dimensions.get('window').height;

const stylesheet = {
	separator: {
		backgroundColor: '#eeeeee',
		height: 1
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
	loadmoreSpinner: {
		marginBottom: 10
	},
	movieFileLink: {

	},
	modalButton: {
		width: 50,
		padding: 5,
		borderRadius: 3,
		marginTop: 20
	}
}

stylesheet.container = Platform.OS === 'ios'? { marginTop: 61,	height: WINDOW_HEIGHT-61} : {flex: 1};

const styles = StyleSheet.create(stylesheet);

function mapStateToProps(state) {
	return state.movieList;
}

export default connect(mapStateToProps)(MovieList);

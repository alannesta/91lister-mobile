/**
 * Container Component for Movie list page
 */
import React, {Component} from 'react';
import * as actions from '../../actions/movie-list-actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

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
		this.state = {
			isRefreshing: false
		}
	}

	componentDidMount() {
		let {dispatch} = this.props;	// dispatch is injected by connect() call
 		dispatch(actions.fetchMovieList('all'));
	}

	render() {
		let {movies} = this.props;
		//let movieActionCreators = bindActionCreators(actions, dispatch);

		return (
			<ListView
				dataSource={this.dataSource.cloneWithRows(movies)}
				renderRow={this._renderRow}
				renderSeparator={this._renderSeparator}
				//onEndReachedThreshold={10}
				//renderFooter={this.renderFooter.bind(this)}
				refreshControl={
				<RefreshControl
					refreshing={this.state.isRefreshing}
					onRefresh={this._onRefresh.bind(this)}
					colors={['#ff0000', '#00ff00', '#0000ff','#3ad564']}
					progressBackgroundColor="#ffffff"/>}
				/>
		)
	}

	_renderRow(movie) {

		return (
			<View>
				<Text>{movie.name}</Text>
			</View>
		)
	}

	_renderSeparator(sectionID, rowID) {
		return (
			<View style={styles.separator} key={rowID} />
		)
	}

	_onRefresh() {
		let {dispatch} = this.props;	// dispatch is injected by connect() call
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

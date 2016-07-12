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
	TouchableOpacity,
	InteractionManager,
	Animated,
} from 'react-native';

class MovieList extends Component {

	constructor(props) {
		super(props);
		this.dataSource = new ListView.DataSource({
			rowHasChanged: (row1, row2) => row1 !== row2
		});
	}

	componentDidMount() {
		let {dispatch} = this.props;	// dispatch is injected by connect() call
 		dispatch(actions.fetchMovieList('all'));
	}

	render() {
		let {movies, dispatch} = this.props;
		let movieActionCreators = bindActionCreators(actions, dispatch);

		return (
			<ListView
				dataSource={this.dataSource.cloneWithRows(movies)}
				renderRow={this._renderRow}
				//onEndReached={this.onEndReach.bind(this)}
				onEndReachedThreshold={10}
				//renderFooter={this.renderFooter.bind(this)}
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
}

function mapStateToProps(state) {
	return state.movieListPage;
}

export default connect(mapStateToProps)(MovieList);

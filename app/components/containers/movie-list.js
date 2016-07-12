/**
 * Container Component for Movie list page
 */
import React, {Component} from 'react';
import * as actions from '../../actions/movie-list-actions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import TabContent from './tab-content';

class MovieList extends Component {

	constructor(props) {
		super(props);
		this.switchTab = this.switchTab.bind(this);
	}

	componentDidMount() {
		let {dispatch, tab} = this.props;	// dispatch is injected by connect() call
 		dispatch(actions.fetchMovieList(tab));
	}

	switchTab(nextTab) {
		let {tab, dispatch} = this.props;
		if (nextTab !== tab) {
			dispatch(actions.switchTab(nextTab));
		}
	}

	render() {
		let {movies, tab, dispatch} = this.props;
		let movieActionCreators = bindActionCreators(actions, dispatch);

		return (
			<section>
				<section>
					<nav>
						<ul>
							<li onClick={this.switchTab.bind(this, 'all')}>All</li>
							<li onClick={this.switchTab.bind(this, 'favourite')}>Favourite</li>
							<li onClick={this.switchTab.bind(this, 'trending')}>Trending</li>
						</ul>
					</nav>
				</section>
				<section>
					<TabContent
						content={movies}
						{...movieActionCreators}
						/>
				</section>
			</section>
		)
	}
}

function mapStateToProps(state) {
	return state.movieListPage;
}

export default connect(mapStateToProps)(MovieList);

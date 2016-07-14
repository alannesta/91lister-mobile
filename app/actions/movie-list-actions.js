import {fetchMovie, toogleLikeApi} from '../mockApi';

export const fetchMovieList = (tab, count, order) => {
	return dispatch => {
		dispatch(refreshingFlag(true));
		fetchMovie(tab, count, order).then(function(res) {
			return res.json();
		}).then(function(result) {
			//console.log('movies fetched: ', result);
			dispatch({
				type: 'MOVIE_FETCHED',
				movies: result.movies,
				total: result.total
			});
			dispatch(refreshingFlag(false));
		});
	}
};

export const toggleLike = (movie) => {
	return dispatch => {
		toogleLikeApi(movie).then(function(res) {
			return res.json();
		}).then(function(updatedMovie) {
			dispatch({
				type: 'MOVIE_UPDATED',
				movie: updatedMovie
			})
		});
	}
};

const refreshingFlag = (isRefreshing) => {
	return {
		type: 'REFRESHING_FLAG',
		isRefreshing: isRefreshing
	};
};

// need to find a way to decouple these composited actions, where should this logic go?
export const switchTab = (tab) => {
	return dispatch => {
		fetchMovie(tab).then(function(res) {
			return res.json();
		}).then(function(movies) {
			dispatch({
				type: 'MOVIE_FETCHED',
				data: movies
			});

			dispatch({
				type: "SWITCH_TAB",
				tab: tab
			})
		});
	}
};

/*
	@flow weak
*/
import {fetchMovie, toogleLikeApi} from '../api';

export const fetchMovieList = (count: ?number, since: ?Date, order: ?string) => {
	return dispatch => {
		dispatch(refreshingFlag(true));
		return fetchMovie(count, since, order).then(function(result) {
			//console.log('movies fetched: ', result);
			dispatch({
				type: 'MOVIE_FETCHED',
				movies: result.movies,
				total: result.total,
				order: 'trend'
			});
			dispatch(refreshingFlag(false));
			return true;
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

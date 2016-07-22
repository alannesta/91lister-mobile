/*
	@flow weak
*/
import {
	fetchMovie,
	toogleLikeApi
} from '../api';

export const fetchMovieList = (count: ? number, since : ? number, order : ? string) => {
	return dispatch => {
		dispatch(refreshingFlag(true));
		return fetchMovie(count, since, order).then(function(result) {
			dispatch(refreshingFlag(false));
			dispatch({
				type: 'MOVIE_FETCHED',
				movies: result.movies,
				total: result.total
			});
			return true;
		}).catch((err) => {
			dispatch({
				type: 'MOVIE_FETCH_FAIL',
				movies: [],
				total: 0
			});
			dispatch(refreshingFlag(false));
			return false;
		});
	}
};

export const toggleLike = (movie) => {
	return dispatch => {
		toogleLikeApi(movie).then(function(updatedMovie) {
			dispatch({
				type: 'MOVIE_UPDATED',
				movie: updatedMovie
			})
		}).catch((err) => {
			//TODO: Toast
		});
	}
};

const refreshingFlag = (isRefreshing) => {
	return {
		type: 'REFRESHING_FLAG',
		isRefreshing: isRefreshing
	};
};

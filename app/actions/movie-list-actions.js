/*
	@flow weak
*/
import {
	fetchMovie,
	toogleLikeApi
} from '../api';

import type {
	TMovie,
	TMovieState,
	TMovieListState
} from '../types/flowtypes'

import {
	ToastAndroid
} from 'react-native'

export const fetchMovieList = (count: ? number, since : ? number, order : ? string) => {
	return dispatch => {
		dispatch(refreshingFlag(true));
		return fetchMovie(count, since, order).then(function(result) {
			// two dispatches here will cause two movie-list view renders, heavy?
			dispatch(refreshingFlag(false));
			dispatch({
				type: 'MOVIE_FETCHED',
				movies: result.movies,
				total: result.total
			});
			return true;
		}).catch((err) => {
			console.log(err);
			if (err.code === 'SESSION_EXPIRED') {
				dispatch({
          type: 'USER_AUTHENTICATION_FAILED'
        });
				ToastAndroid.show('Please login again', ToastAndroid.SHORT);
			}
			if (err.code === 'REQUEST_FAILED') {
				ToastAndroid.show('Fail to fetch movie', ToastAndroid.SHORT);
			}
			dispatch({
				type: 'MOVIE_FETCH_FAIL'
			});
			dispatch(refreshingFlag(false));
			return false;
		});
	}
};

export const toggleLike = (movie: TMovie) => {
	return dispatch => {
		toogleLikeApi(movie).then(function(updatedMovie) {
			ToastAndroid.show('Movie updated successfully', ToastAndroid.SHORT);
			dispatch({
				type: 'MOVIE_UPDATED',
				movie: updatedMovie
			});
		}).catch((err) => {
			if (err.code === 'SESSION_EXPIRED') {
				dispatch({
          type: 'USER_AUTHENTICATION_FAILED'
        });
				ToastAndroid.show('Please login again', ToastAndroid.SHORT);
			}
		});
	}
};

const refreshingFlag = (isRefreshing: boolean) => {
	return {
		type: 'REFRESHING_FLAG',
		isRefreshing: isRefreshing
	};
};

/*
	@flow weak
*/
import {
	fetchMovie,
	toogleLikeApi,
	getMovieFileUrl as getMovieFileUrlAPI
} from '../api';
import AppStorage from '../utils/app-storage'

import type {
	TMovie,
	TMovieState,
	TMovieQueryParams
} from '../types/flowtypes'

import {
	ToastAndroid,
	Platform,
	AlertIOS
} from 'react-native'

export const fetchMovieList = (options: TMovieQueryParams) => {
	return dispatch => {
		return fetchMovie(options).then(function(result) {
			// two dispatches here will cause two movie-list view renders, heavy?
			return dispatch({
				type: 'MOVIE_FETCHED',
				movies: result.movies,
				total: result.total
			});
		}).catch((err) => {
			// TODO: extract general error handler

			// User session expired, for now, no redirection to login page will happen
			if (err.code === 'SESSION_EXPIRED') {
				if (Platform.OS === 'ios') {
					AlertIOS.alert('Session Expired', 'Please Login Again');
				} else {
					ToastAndroid.show('Please login again', ToastAndroid.SHORT);
				}
				return dispatch({
          type: 'USER_AUTHENTICATION_FAILED'
        });
			}
			// could be 5xx server error
			if (err.code === 'REQUEST_FAILED') {
				if (Platform.OS === 'ios') {
					AlertIOS.alert('Fail to fetch movie');
				} else {
					ToastAndroid.show('Fail to fetch movie', ToastAndroid.SHORT);
				}
			}
			// fetch error, could
			if (err.message === 'Network request failed') {
				if (Platform.OS === 'ios') {
					AlertIOS.alert('Could not connect to server, please check if server is online');
				} else {
					ToastAndroid.show('Could not connect to server, please check if server is online', ToastAndroid.SHORT);
				}
			}
			return dispatch({
				type: 'MOVIE_FETCH_FAIL'
			});
		});
	}
};

export const toggleLike = (movie: TMovie) => {
	return dispatch => {
		toogleLikeApi(movie).then(function(updatedMovie) {
			if (Platform.OS === 'ios') {

			} else {
				ToastAndroid.show('Movie updated successfully', ToastAndroid.SHORT);
			}
			dispatch({
				type: 'MOVIE_UPDATED',
				movie: updatedMovie
			});
		}).catch((err) => {
			if (err.code === 'SESSION_EXPIRED') {
				dispatch({
          type: 'USER_AUTHENTICATION_FAILED'
        });
				if (Platform.OS === 'ios') {
					AlertIOS.alert('Session Expired', 'Please Login Again');
				} else {
					ToastAndroid.show('Please login again', ToastAndroid.SHORT);
				}
			}
		});
	}
};

export const selectMovie = (movie: TMovie) => {
	return dispatch => {
		return AppStorage.getFileUrl(movie.id).then((fileUrl) => {
			dispatch({
				type: 'SELECT_MOVIE',
				movie: movie,
				fileUrl: fileUrl
			});
		}).catch((err) => {
			dispatch({
				type: 'SELECT_MOVIE',
				movie: movie
			});
		})
	}
}

export const getMovieFileUrl = (movie: TMovie) => {
	return dispatch => {
		return getMovieFileUrlAPI(movie).then(function(fileUrl){
			// cache it without blocking ui updates
			AppStorage.cacheFileUrl(movie.id, fileUrl).then(() => {
				console.log('cache file url for: ' + movie.id);
			});
			dispatch({
				type: 'UPDATE_FILEURL_SUCCESS',
				fileUrl
			});
		}).catch((err) => {
			console.log('get movie url error: ' + err);
			const generalError = 'Fail to resolve the url for this movie';
			dispatch({
				type: 'UPDATE_FILEURL_SUCCESS',
				fileUrl: err && err.message? generalError + ': ' +err.message : generalError
			});
		});
	}
}

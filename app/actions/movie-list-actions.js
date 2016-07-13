import {fetchMovie, favour} from '../mockApi';

export const fetchMovieList = (tab, count, order) => {
	return dispatch => {
		dispatch(refreshingFlag(true));
		fetchMovie(tab, count, order).then(function(res) {
			return res.json();
		}).then(function(movies) {
			console.log('movies fetched: ', movies);
			dispatch({
				type: 'MOVIE_FETCHED',
				data: movies
			});
			dispatch(refreshingFlag(false));
		});
	}
};

export const addToFav = (movie) => {
	return dispatch => {
		favour(movie).then(function(res) {
			return res.json();
		}).then(function(movieFaved) {
			dispatch({
				type: 'MOVIE_FAVOURED',
				data: movieFaved
			})
		});
	}
};

// need to find a way to decouple these composited actions, where should this logic go?
export const switchTab = (tab) => {
	return dispatch => {
		fetchMovie(tab).then(function(res) {
			return res.json();
		}).then(function(movies) {
			console.log('movies fetched: ', movies);
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

const refreshingFlag = (isRefreshing) => {
	return {
		type: 'REFRESHING_FLAG',
		isRefreshing: isRefreshing
	};
};

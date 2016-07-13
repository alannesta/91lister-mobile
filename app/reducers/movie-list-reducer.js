import {combineReducers} from 'redux';

const moviesReducer = (state = {movies: [], total: 0}, action) => {
	switch (action.type) {
		case 'MOVIE_FETCHED':
			return {
				movies: [...action.movies],
				total: action.total
			};
		case 'MOVIE_FAVOURED':
			return state;
		default:
			return state;
	}
};

const tabReducer = (state = 'all', action)  => {
	if (action.type === 'SWITCH_TAB') {
		return action.tab;
	}else {
		return state;
	}
};

const refreshFlagReducer = (state=false, action) => {
	if (action.type === "REFRESHING_FLAG") {
		return action.isRefreshing;
	}
	return state;
};

// using more explicit syntax for better naming
const movieListReducer = combineReducers({
		movieData: moviesReducer,
		tab: tabReducer,
		isRefreshing: refreshFlagReducer
});

export default movieListReducer


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
		case 'MOVIE_UPDATED':
			let index = findMovieByID(state.movies, action.movie);
			//state.movies[index] = action.movie;
			return {
				total: state.total,
				movies: [...state.movies.slice(0, index), action.movie, ...state.movies.slice(index+1)]
			};
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

function findMovieByID(movies, movie) {
	for (let i=0; i<movies.length; i++) {
		if (movies[i].id === movie.id) {
			return i;
		}
	}
	return -1;
}

export default movieListReducer


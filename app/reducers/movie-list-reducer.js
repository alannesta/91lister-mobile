/*
 *	@flow weak
 */
import {
	combineReducers
} from 'redux';
import type {
	TMovie,
	TMovieState,
	TMovieListState
} from '../types/flowtypes'

const defaultMovieState: TMovieState = {
	movies: [],
	total: 0
};

const defaultSelectedMovieState: TMovie = {
	id: '',
	title: '',
	url: '',
	viewCount: 0,
	trend: 0,
	liked: false,
	thumbnail: '',
	favourite: 0
}

const moviesReducer = (state = defaultMovieState, action) => {
	switch (action.type) {
		case 'MOVIE_FETCHED':
			return {
				movies: action.movies,
				total: action.total
			};

		case 'MOVIE_FETCH_FAIL':
			return state;

		case 'MOVIE_UPDATED':
			let index = findMovieByID(state.movies, action.movie);
			//state.movies[index] = action.movie;
			return {
				total: state.total,
				movies: [...state.movies.slice(0, index), action.movie, ...state.movies.slice(index + 1)]
			};

		default:
			return state;
	}
};

const selectedMovieReducer = (state = defaultSelectedMovieState, action) => {
	switch(action.type) {
		case 'SELECT_MOVIE':
			return action.movie;
		default:
			return state;
	}
}

const tabReducer = (state = 'all', action) => {
	if (action.type === 'SWITCH_TAB') {
		return action.tab;
	} else {
		return state;
	}
};

// default time set to start of unix time
const movieSinceReducer = (state = 0, action) => {
	if (action.type === "MOVIE_TIMESINCE_CHANGED") {
		return action.date;
	}
	return state;
}

const orderReducer = (state = 'trend', action) => {
	if (action.type === "CHANGE_MOVIE_ORDER") {
		return action.order
	}
	return state;
}

function findMovieByID(movies, movie) {
	for (let i = 0; i < movies.length; i++) {
		if (movies[i].id === movie.id) {
			return i;
		}
	}
	return -1;
}

// using more explicit syntax for better naming
const movieListReducer = combineReducers({
	movieData: moviesReducer,
	selectedMovie: selectedMovieReducer,
	tab: tabReducer,
	mSince: movieSinceReducer,
	order: orderReducer
});

export default movieListReducer

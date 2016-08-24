/*
 *	@flow weak
 */
import {
	combineReducers
} from 'redux';
import type {
	TMovie,
	TMovieState
} from '../types/flowtypes'

// sub state type declaration
type TMovieData = {
	movies: Array<TMovie>,
	total: number
}

type TSelectedMovieData = {
	selectedMovie: TMovie,
	fileUrl: string
}

const defaultMovieState: TMovieData = {
	movies: [],
	total: 0
};

const defaultSelectedMovieState: TMovie = {
	id: 0,
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
			return ({
				movies: action.movies,
				total: action.total
			}:TMovieData);

		case 'MOVIE_FETCH_FAIL':
			return state;

		case 'MOVIE_UPDATED':
			let index = findMovieByID(state.movies, action.movie);
			//state.movies[index] = action.movie;
			return ({
				total: state.total,
				movies: [...state.movies.slice(0, index), action.movie, ...state.movies.slice(index + 1)]
			}: TMovieData);

		default:
			return state;
	}
};

const selectedMovieReducer = (state = {selectedMovie: defaultSelectedMovieState, fileUrl: ''}, action) => {
	switch(action.type) {
		case 'SELECT_MOVIE':
			return ({
				selectedMovie: action.movie,
				fileUrl: action.fileUrl? action.fileUrl : ''
			}: TSelectedMovieData)
		case 'UPDATE_FILEURL_SUCCESS':
			return ({
				selectedMovie: state.selectedMovie,
				fileUrl: action.fileUrl
			}: TSelectedMovieData)
		default:
			return state;
	}
}

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

const likedReducer = (state = false, action) => {
	if (action.type === "CHANGE_LIKED_FILTER") {
		return action.liked;
	}
	return state;
}

const countReducer = (state = 10, action) => {
	if (action.type === "UPDATE_MOVIE_COUNT") {
		return action.count;
	}
	return state;
}

const queryReducer = (state='', action) => {
	if (action.type === "UPDATE_QUERY") {
		return action.query;
	}
	return state;
}

function findMovieByID(movies, movie: TMovie) {
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
	selectedMovieData: selectedMovieReducer,
	movieQuery: {
		query: queryReducer,
		mSince: movieSinceReducer,
		order: orderReducer,
		liked: likedReducer,
		count: countReducer
	}
});

export default movieListReducer

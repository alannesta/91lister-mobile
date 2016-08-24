/*
 *	@flow weak
 */
import {
	combineReducers
} from 'redux';
import type {
	TMovie,
	TMovieState,
	TMovieQueryState
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

const defaultMovieQueryState: TMovieQueryState = {
	count: 10,
	mSince: 0,
	query: "",
	likedFilter: false,
	order: "trend"
};

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

const movieQueryReducer = (state = defaultMovieQueryState, action) => {
	if (action.type === "UPDATE_MOVIE_QUERY") {
		return Object.assign({}, state, action.movieQuery);
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
	movieQuery: movieQueryReducer
});

export default movieListReducer

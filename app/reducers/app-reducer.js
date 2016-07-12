import {combineReducers} from 'redux';
import movieListPageReducer from './movie-list-reducer';

const appReducer = combineReducers({
	movieListPage: movieListPageReducer
});

export default appReducer;


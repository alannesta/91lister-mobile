import {
	combineReducers
} from 'redux';
import movieListReducer from './movie-list-reducer';
import userReducer from './user-reducer';

const appReducer = combineReducers({
	movieListPage: movieListReducer,
	user: userReducer
});

export default appReducer;

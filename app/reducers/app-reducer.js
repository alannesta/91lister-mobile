import {
	combineReducers
} from 'redux';
import movieListReducer from './movie-list-reducer';
import userReducer from './user-reducer';
import deviceStatusReducer from './device-status';


const appReducer = combineReducers({
	movieList: movieListReducer,
	user: userReducer,
	deviceStatus: deviceStatusReducer
});

export default appReducer;

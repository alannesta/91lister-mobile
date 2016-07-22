/*
 * @flow weak
 */
import {
	combineReducers
} from 'redux';

const loginStatusReducer = (state = {
	loggedIn: false,
	username: ''
}, action) => {
	switch (action.type) {
		case 'USER_AUTHENTICATION_SUCCESS':
			return {
				loggedIn: true,
				username: action.username
			}
		case 'USER_AUTHENTICATION_FAILED':
			return {
				loggedIn: false,
				username: ''
			}
		default:
			return state;
	}
}

const userReducer = combineReducers({
	status: loginStatusReducer
});

export default userReducer;

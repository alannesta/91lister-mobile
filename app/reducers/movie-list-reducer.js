import {combineReducers} from 'redux';

const moviesReducer = (state = [], action) => {
	switch (action.type) {
		case 'MOVIE_FETCHED':
			return [...action.data];
		case 'MOVIE_FAVOURED':
			return [...state, {
				"name": "WonderLand",
				"viewCount": 181543,
				"trending": 5555,
				"favourite": true,
				"imageUrl": "",
				"url": ""
			}];
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

// using more explicit syntax
const movieListReducer = combineReducers({
		movies: moviesReducer,
		tab: tabReducer
});

export default movieListReducer


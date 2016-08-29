var utils = require('../app/utils/utils');
import reducer from '../app/reducers/movie-list-reducer'

const INITIAL_STATE = {
	movieData: {
		movies: [],
		total: 0
	},
	selectedMovieData: {
		selectedMovie: {
			id: 0,
			title: '',
			url: '',
			viewCount: 0,
			trend: 0,
			liked: false,
			thumbnail: '',
			favourite: 0
		},
		fileUrl: ''
	},
	movieQuery: {
		query: '',
		startDate: 0,
		order: 'trend',
		count: 10,
		likedFilter: false,
		endDate: utils.startOfTodayTimestamp()
	}
};

const mockedMovies = [...MOCK_MOVIES];


describe('movie-list-reducer', () => {

	it('should return the initial state', () => {
		const initialState = reducer(undefined, {});
		expect(initialState).to.deep.equal(INITIAL_STATE);
	});

	it('should update selectedMovieData state correctly', () => {
		const updatedState1 = reducer(INITIAL_STATE, {
			type: 'SELECT_MOVIE',
			movie: mockedMovies[1],
		});

		expect(updatedState1).to.deep.equal(Object.assign({}, INITIAL_STATE, {
			selectedMovieData: {
				selectedMovie: mockedMovies[1],
				fileUrl: ''
			}
		}));

		const updatedState2 = reducer(updatedState1, {
			type: 'UPDATE_FILEURL_SUCCESS',
			fileUrl: 'http://www.mock.com'
		});

		expect(updatedState2).to.deep.equal(Object.assign({}, updatedState1, {
			selectedMovieData: {
				selectedMovie: mockedMovies[1],
				fileUrl: 'http://www.mock.com'
			}
		}));
	});

	it('should update movieData state correctly', () => {
		const updatedState = reducer(INITIAL_STATE, {
			type: 'MOVIE_FETCHED',
			movies: mockedMovies,
			total: 3
		});

		expect(updatedState).to.deep.equal(Object.assign({}, INITIAL_STATE, {
			movieData: {
				movies: mockedMovies,
				total: 3
			}
		}));
	});

	it('should update movieQuery state correctly', () => {
		const updatedState = reducer(INITIAL_STATE, {
			type: 'UPDATE_MOVIE_QUERY',
			movieQuery: {
				query: '3some',
				startDate: 0,
				order: 'trend',
				count: 20,
				likedFilter: true,
				endDate: 20000
			}
		});

		expect(updatedState).to.deep.equal(Object.assign({}, INITIAL_STATE, {
			movieQuery: {
				query: '3some',
				startDate: 0,
				order: 'trend',
				count: 20,
				likedFilter: true,
				endDate: 20000
			}
		}));
	});

})

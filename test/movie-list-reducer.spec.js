import reducer from '../app/reducers/movie-list-reducer'

describe('movie-list-reducer', () => {
  it('should return the initial state', () => {
    const initialState = reducer(undefined, {});
    const expectedState = {
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
    	query: '',
    	mSince: 0,
    	order: 'trend'
    }
    expect(initialState).to.deep.equal(expectedState);
  });
})

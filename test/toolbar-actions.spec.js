import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as ToolbarActions from '../app/actions/toolbar-actions'
var MovieListActions = require('../app/actions/movie-list-actions'); // less ES6 in test to reduce noise
var sinon = require('sinon');

const store = configureMockStore([thunk])({});
const newMovieQuery = {
	count: 20,
	mSince: 100000,
	query: "",
	likedFilter: true,
	order: "trend"
};

describe.only('Toolbar actions', function() {

  it('should updateMovieQuery correctly without refetch movies', function() {
    expect(store.dispatch(ToolbarActions.updateMovieQuery(newMovieQuery, false))).to.deep.equal(
      {
        type: "UPDATE_MOVIE_QUERY",
        movieQuery: newMovieQuery
      }
    )
  });

  it('should updateMovieQuery correctly and then refetch movies', function(done) {
    var stub = sinon.stub(MovieListActions, 'fetchMovieList');
    stub.withArgs(newMovieQuery).returns(mockFetchMovieAction);
    
    function mockFetchMovieAction() {
      return Promise.resolve({
          type: 'ANY_ACTION'  // for redux-thunk middleware
      });
    }

    store.dispatch(ToolbarActions.updateMovieQuery(newMovieQuery, true)).then(() => {
      console.log('refetch success with correct args');
      done();
    });
  });
});

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as MovieListActions from '../app/actions/movie-list-actions'
var API = require('../app/api');
var sinon = require('sinon');
var stub;

const store = configureMockStore([thunk])({});
const defaultMovieQuery = {
	count: 10,
	startDate: 0,
	query: "",
	likedFilter: false,
	order: "trend"
};

describe('movie-list-actions', () => {

  afterEach(function() {
    stub.restore();
  })

  it('should fetch the movie and dispatch MOVIE_FETCHED action with correct values', () => {
    const expectedResult = {
      movies: MOCK_MOVIES,
      total: 3
    }
    stub = sinon.stub(API, 'fetchMovie');
    stub.withArgs(defaultMovieQuery).returns(Promise.resolve(expectedResult));

    return store.dispatch(MovieListActions.fetchMovieList(defaultMovieQuery)).then(function(actionDispatched) {
      expect(actionDispatched).to.deep.equal({
        type: "MOVIE_FETCHED",
        movies: MOCK_MOVIES,
        total: 3
      })
    });
  });

  it('should handle SESSION_EXPIRED error properly', () => {
    stub = sinon.stub(API, 'fetchMovie');
    var sessionExpireError = new Error('session expired');
    sessionExpireError.code = 'SESSION_EXPIRED';
    stub.withArgs(defaultMovieQuery).returns(Promise.reject(sessionExpireError));

    return store.dispatch(MovieListActions.fetchMovieList(defaultMovieQuery)).then(function(actionDispatched) {
      expect(actionDispatched).to.deep.equal({
        type: "USER_AUTHENTICATION_FAILED"
      })
    })
  });
})

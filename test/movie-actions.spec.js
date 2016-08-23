import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import * as MovieListActions from '../app/actions/movie-list-actions'
var API = require('../app/api');
var sinon = require('sinon');
var stub;

const store = configureMockStore([thunk])({movies: []});

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
    stub.returns(Promise.resolve(expectedResult));
    store.dispatch(MovieListActions.fetchMovieList()).then(function(actionDispatched) {
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
    stub.returns(Promise.reject(sessionExpireError));
    store.dispatch(MovieListActions.fetchMovieList()).then(function(actionDispatched) {
      expect(actionDispatched).to.deep.equal({
        type: "USER_AUTHENTICATION_FAILED"
      })
    })
  });
})

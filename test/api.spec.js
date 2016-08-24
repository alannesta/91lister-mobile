import * as API from '../app/api'

describe('api', () => {
  it('fetchmovie api should use defualt params and return a collection of movies', () => {
    var expectedMovies = MOCK_MOVIES;
    var defaultFetchParams = {
      count: 10,
      order: 'trend',
      since: 0,
      query: "",
      likedFilter: false
    }

    var fecthMovieMock = nock(API.BASE_URL)
    .get('/movies')
    .query(defaultFetchParams)
    .reply(200, MOCK_MOVIES);

    // not providing any query params, will call fetch using default params
    API.fetchMovie().then((movies) => {
      expect(movies).to.deep.equal(expectedMovies);
    });
  });

  it('fetchmovie api should use the provided query params and return a collection of movies', () => {
    var expectedMovies = MOCK_MOVIES
    var options = {
      count: 100,
    	order: 'trend',
    	query: 'good',
      mSince: 123344,
      likedFilter: true
    }
    var fecthMovieMock = nock(API.BASE_URL)
    .get('/movies')
    .query({
      count: 100,
      query: 'good',
      order: 'trend',
      since: 123344/1000,
      likedFilter: true
    })
    .reply(200, MOCK_MOVIES);

    API.fetchMovie(options).then((movies) => {
      expect(movies).to.deep.equal(expectedMovies);
    });
  });

  it('should throw correct error when fetch fails', function(done) {
    var options = {
      count: 100,
    	order: 'trend',
    	query: 'good',
      mSince: 123344,
      likedFilter: false
    }
    var fecthMovieMock = nock(API.BASE_URL)
    .get('/movies')
    .query({
      count: 100,
      query: 'good',
      order: 'trend',
      since: 123344/1000,
      likedFilter: false
    })
    .reply(401);

    // asset that the correct error will eventually be thrown
    API.fetchMovie(options).catch(function(err) {
      expect(err.code).to.equal('SESSION_EXPIRED');
      done();
    });
  })
})

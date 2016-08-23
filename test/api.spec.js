import * as API from '../app/api'

describe('api', () => {
  it('fetchmovie api should return the correct collection of movies', () => {

    var expectedMovies = MOCK_MOVIES

    var options = {
      count: 100,
    	order: 'trend',
    	query: 'good',
      since: 123344
    }

    var devMock = nock(API.BASE_URL)
    .get('/movies')
    .query({
      count: 100,
      query: 'good',
      order: 'trend',
      since: 123344/1000,
    })
    .reply(200, MOCK_MOVIES);

    API.fetchMovie(options).then((movies) => {
      expect(movies).to.deep.equal(expectedMovies);
    });
  });
})

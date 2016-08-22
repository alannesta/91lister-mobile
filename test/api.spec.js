import * as API from '../app/api'

describe.only('api', () => {
  it('fetchmovie api should return the correct collection of movies', () => {

    var expectedMovies = [{
    	id: 1,
    	name: "good movie0"
    },
    {
    	id: 2,
    	name: "good movie1"
    },
    {
    	id: 3,
    	name: "good movie2"
    }];

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
    .reply(200, expectedMovies);

    API.fetchMovie(options).then((movies) => {
      expect(movies).to.deep.equal(expectedMovies);
    });
  });
})
